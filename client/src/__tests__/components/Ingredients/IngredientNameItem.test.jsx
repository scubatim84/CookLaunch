import React from 'react';
import UserEvent from '@testing-library/user-event';
import { act, render, waitFor, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { config } from 'react-transition-group';

import IngredientNameItem from '../../../components/Ingredients/IngredientNameItem';

const server = setupServer();

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

const ingredient = {
  createdBy: 'testUser',
  userId: 'userTestId',
  id: 'testId',
  name: 'test ingredient',
  dateLastChanged: new Date(),
};

config.disabled = true;
const getIngredientData = jest.fn();
const handleDelete = jest.fn();

describe('IngredientNameItem renders correctly', () => {
  it('Renders component without crashing', () => {
    render(<IngredientNameItem />);
  });

  it('Renders only ingredient name text when userId does not equal createdBy', async () => {
    const { queryByText } = render(
      <IngredientNameItem
        key={ingredient.name + ingredient.dateLastChanged}
        createdBy={ingredient.createdBy}
        userId={ingredient.userId}
        id={ingredient.id}
        name={ingredient.name}
        getIngredientData={getIngredientData}
        handleDelete={handleDelete}
      />
    );

    expect(queryByText(ingredient.name)).toBeTruthy();
  });

  it('Renders component with buttons when userId equals createdBy', async () => {
    ingredient.createdBy = ingredient.userId;

    const { queryByTestId, queryByText } = render(
      <IngredientNameItem
        key={ingredient.name + ingredient.dateLastChanged}
        createdBy={ingredient.createdBy}
        userId={ingredient.userId}
        id={ingredient.id}
        name={ingredient.name}
        getIngredientData={getIngredientData}
        handleDelete={handleDelete}
      />
    );

    expect(queryByText(ingredient.name)).toBeTruthy();
    expect(queryByTestId('edit-icon')).toBeTruthy();
    expect(queryByTestId('delete-icon')).toBeTruthy();
  });

  it('Renders edit mode of component', async () => {
    ingredient.createdBy = ingredient.userId;

    const { queryByTestId } = render(
      <IngredientNameItem
        key={ingredient.name + ingredient.dateLastChanged}
        createdBy={ingredient.createdBy}
        userId={ingredient.userId}
        id={ingredient.id}
        name={ingredient.name}
        getIngredientData={getIngredientData}
        handleDelete={handleDelete}
      />
    );

    UserEvent.click(queryByTestId('edit-icon'));
    await waitFor(() => expect(queryByTestId('edit-icon')).toBeNull());

    expect(queryByTestId('done-icon')).toBeTruthy();
    expect(queryByTestId('cancel-icon')).toBeTruthy();
    expect(queryByTestId('ingredient-name-edit')).toBeTruthy();

    expect(queryByTestId('edit-icon')).toBeNull();
    expect(queryByTestId('delete-icon')).toBeNull();
  });
});

describe('IngredientNameItem buttons function correctly', () => {
  it('IngredientNameItem dialog pops up and disappears', async () => {
    const confirmDialogInput = {
      title: 'Delete ingredient?',
      text:
        'This action cannot be reversed. Are you sure you want to delete this ingredient?',
      leftButtonLabel: 'Delete',
      rightButtonLabel: 'Cancel',
    };

    const { queryByTestId, queryByText } = render(
      <IngredientNameItem
        key={ingredient.name + ingredient.dateLastChanged}
        createdBy={ingredient.createdBy}
        userId={ingredient.userId}
        id={ingredient.id}
        name={ingredient.name}
        getIngredientData={getIngredientData}
        handleDelete={handleDelete}
      />
    );

    expect(queryByText(confirmDialogInput.title)).toBeNull();
    expect(queryByText(confirmDialogInput.text)).toBeNull();
    expect(queryByText(confirmDialogInput.leftButtonLabel)).toBeNull();
    expect(queryByText(confirmDialogInput.rightButtonLabel)).toBeNull();

    UserEvent.click(queryByTestId('delete-icon'));
    expect(queryByTestId('confirm-dialog')).toBeTruthy();

    expect(queryByText(confirmDialogInput.title)).toBeTruthy();
    expect(queryByText(confirmDialogInput.text)).toBeTruthy();
    expect(queryByText(confirmDialogInput.leftButtonLabel)).toBeTruthy();
    expect(queryByText(confirmDialogInput.rightButtonLabel)).toBeTruthy();

    UserEvent.click(queryByTestId('confirm-dialog-button-right'));
    await waitFor(() => expect(queryByTestId('delete-dialog')).toBeNull());

    UserEvent.click(queryByTestId('delete-icon'));
    UserEvent.click(queryByTestId('confirm-dialog-button-left'));
    await waitFor(() => expect(handleDelete).toHaveBeenCalledTimes(1));
  });

  it('Typing into TextField changes value of ingredient name field', async () => {
    const { queryByTestId } = render(
      <IngredientNameItem
        key={ingredient.name + ingredient.dateLastChanged}
        createdBy={ingredient.createdBy}
        userId={ingredient.userId}
        id={ingredient.id}
        name={ingredient.name}
        getIngredientData={getIngredientData}
        handleDelete={handleDelete}
      />
    );

    UserEvent.click(queryByTestId('edit-icon'));
    await waitFor(() => expect(queryByTestId('edit-icon')).toBeNull());

    const nameInput = screen.getByTestId('ingredient-name-edit');
    expect(nameInput.value).toBe(ingredient.name);
    UserEvent.type(nameInput, ' morechars');
    expect(nameInput.value).toBe(ingredient.name + ' morechars');
  });

  it('Clicking done icon executes handleSubmit function and API call succeeds', async () => {
    server.use(
      rest.put(`/api/ingredients/${ingredient.id}`, (req, res, ctx) => {
        return res(ctx.status(204), ctx.json(null));
      })
    );

    const { queryByTestId } = render(
      <IngredientNameItem
        key={ingredient.name + ingredient.dateLastChanged}
        createdBy={ingredient.createdBy}
        userId={ingredient.userId}
        id={ingredient.id}
        name={ingredient.name}
        getIngredientData={getIngredientData}
        handleDelete={handleDelete}
      />
    );

    UserEvent.click(queryByTestId('edit-icon'));
    await waitFor(() => expect(queryByTestId('edit-icon')).toBeNull());

    UserEvent.click(queryByTestId('done-icon'));
    await waitFor(() => expect(getIngredientData).toHaveBeenCalledTimes(1));
  });

  it('Clicking cancel icon turns edit mode off when in edit mode', async () => {
    const { queryByTestId } = render(
      <IngredientNameItem
        key={ingredient.name + ingredient.dateLastChanged}
        createdBy={ingredient.createdBy}
        userId={ingredient.userId}
        id={ingredient.id}
        name={ingredient.name}
        getIngredientData={getIngredientData}
        handleDelete={handleDelete}
      />
    );

    UserEvent.click(queryByTestId('edit-icon'));
    await waitFor(() => expect(queryByTestId('edit-icon')).toBeNull());

    UserEvent.click(queryByTestId('cancel-icon'));
    await waitFor(() => expect(queryByTestId('cancel-icon')).toBeNull());

    expect(queryByTestId('edit-icon')).toBeTruthy();
  });
});
