import React from 'react';
import UserEvent from '@testing-library/user-event';
import { render, waitFor, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import IngredientItem from '../../../components/Ingredients/IngredientItem';

describe('IngredientItem', () => {
  const testIngredient = {
    id: 'testid',
    name: 'ingredientname',
    quantity: '3',
    quantityType: 'Ounces',
    checked: false,
    groceryExtra: false,
  };

  const handleDelete = jest.fn((id) => id);

  it('Renders component without crashing', () => {
    shallow(<IngredientItem />);
  });

  it('Renders ingredient item when unchecked and not a grocery ingredient', () => {
    const { queryByTestId } = render(
      <IngredientItem
        id={testIngredient.id}
        name={testIngredient.name}
        quantity={testIngredient.quantity}
        quantityType={testIngredient.quantityType}
        checked={testIngredient.checked}
        groceryExtra={testIngredient.groceryExtra}
        handleDelete={handleDelete}
      />
    );

    expect(queryByTestId('unchecked-ingredientname').innerHTML).toBe(
      testIngredient.name
    );
    expect(queryByTestId('unchecked-3').innerHTML).toBe(
      testIngredient.quantity
    );
    expect(queryByTestId('unchecked-Ounces').innerHTML).toBe(
      testIngredient.quantityType
    );

    expect(queryByTestId('edit-icon')).toBeTruthy();
    expect(queryByTestId('delete-icon')).toBeTruthy();
    expect(queryByTestId('delete-dialog')).toBeNull();
  });

  it('IngredientDeleteDialog component functions correctly', async () => {
    const { queryByTestId } = render(
      <IngredientItem
        id={testIngredient.id}
        name={testIngredient.name}
        quantity={testIngredient.quantity}
        quantityType={testIngredient.quantityType}
        checked={testIngredient.checked}
        groceryExtra={testIngredient.groceryExtra}
        handleDelete={handleDelete}
      />
    );

    UserEvent.click(queryByTestId('delete-icon'));
    expect(queryByTestId('delete-dialog')).toBeTruthy();

    UserEvent.click(queryByTestId('delete-dialog-cancel'));
    await waitFor(() => expect(queryByTestId('delete-dialog')).toBeNull());

    UserEvent.click(queryByTestId('delete-icon'));
    UserEvent.click(queryByTestId('delete-dialog-delete'));
    await waitFor(() => expect(handleDelete).toHaveBeenCalledTimes(1));
  });

  it('Renders edit mode version of ingredient item when not a grocery extra', async () => {
    const { queryByTestId } = render(
      <IngredientItem
        id={testIngredient.id}
        name={testIngredient.name}
        quantity={testIngredient.quantity}
        quantityType={testIngredient.quantityType}
        checked={testIngredient.checked}
        groceryExtra={testIngredient.groceryExtra}
        handleDelete={handleDelete}
      />
    );

    UserEvent.click(queryByTestId('edit-icon'));
    await waitFor(() => expect(queryByTestId('edit-icon')).toBeNull());

    expect(queryByTestId('done-icon')).toBeTruthy();
    expect(queryByTestId('cancel-icon')).toBeTruthy();
    expect(queryByTestId('unchecked-ingredientname')).toBeTruthy();
    expect(queryByTestId('grocery-edit-quantity')).toBeTruthy();
    expect(queryByTestId('select-quantity-type')).toBeTruthy();

    expect(queryByTestId('unchecked-3')).toBeNull();
    expect(queryByTestId('unchecked-Ounces')).toBeNull();
    expect(queryByTestId('delete-icon')).toBeNull();
  });

  it('Renders edit mode version of ingredient item, cancel transitions back to non-edit mode', async () => {
    const { queryByTestId } = render(
      <IngredientItem
        id={testIngredient.id}
        name={testIngredient.name}
        quantity={testIngredient.quantity}
        quantityType={testIngredient.quantityType}
        checked={testIngredient.checked}
        groceryExtra={testIngredient.groceryExtra}
        handleDelete={handleDelete}
      />
    );

    UserEvent.click(queryByTestId('edit-icon'));
    await waitFor(() => expect(queryByTestId('edit-icon')).toBeNull());

    UserEvent.click(queryByTestId('cancel-icon'));
    await waitFor(() => expect(queryByTestId('cancel-icon')).toBeNull());

    expect(queryByTestId('unchecked-ingredientname')).toBeTruthy();
    expect(queryByTestId('unchecked-3')).toBeTruthy();
    expect(queryByTestId('unchecked-Ounces')).toBeTruthy();
    expect(queryByTestId('edit-icon')).toBeTruthy();
    expect(queryByTestId('delete-icon')).toBeTruthy();

    expect(queryByTestId('done-icon')).toBeNull();
    expect(queryByTestId('cancel-icon')).toBeNull();
    expect(queryByTestId('grocery-edit-quantity')).toBeNull();
    expect(queryByTestId('select-quantity-type')).toBeNull();
  });

  it('Renders edit mode version of ingredient item and free form text field when grocery extra', async () => {
    const { queryByTestId } = render(
      <IngredientItem
        id={testIngredient.id}
        name={testIngredient.name}
        quantity={testIngredient.quantity}
        quantityType={testIngredient.quantityType}
        checked={testIngredient.checked}
        groceryExtra
        handleDelete={handleDelete}
      />
    );

    UserEvent.click(queryByTestId('edit-icon'));
    await waitFor(() => expect(queryByTestId('edit-icon')).toBeNull());

    expect(queryByTestId('grocery-edit-name')).toBeTruthy();
    expect(queryByTestId('unchecked-ingredientname')).toBeNull();
  });

  it('Renders grocery ingredient when checkbox is checked', async () => {
    const { queryByTestId } = render(
      <IngredientItem
        id={testIngredient.id}
        name={testIngredient.name}
        quantity={testIngredient.quantity}
        quantityType={testIngredient.quantityType}
        checked
        groceryIngredient
        groceryExtra={testIngredient.groceryExtra}
        handleDelete={handleDelete}
      />
    );

    expect(queryByTestId('grocery-checkbox-checked')).toBeTruthy();
    expect(queryByTestId('checked-ingredientname')).toBeTruthy();
    expect(queryByTestId('checked-3')).toBeTruthy();
    expect(queryByTestId('checked-Ounces')).toBeTruthy();
    expect(queryByTestId('edit-icon')).toBeTruthy();
    expect(queryByTestId('delete-icon')).toBeTruthy();

    expect(queryByTestId('grocery-checkbox-unchecked')).toBeNull();
    expect(queryByTestId('unchecked-ingredientname')).toBeNull();
    expect(queryByTestId('unchecked-3')).toBeNull();
    expect(queryByTestId('unchecked-Ounces')).toBeNull();
  });

  it('Renders grocery ingredient when checkbox is unchecked', async () => {
    const { queryByTestId } = render(
      <IngredientItem
        id={testIngredient.id}
        name={testIngredient.name}
        quantity={testIngredient.quantity}
        quantityType={testIngredient.quantityType}
        checked={testIngredient.checked}
        groceryIngredient
        groceryExtra={testIngredient.groceryExtra}
        handleDelete={handleDelete}
      />
    );

    expect(queryByTestId('grocery-checkbox-unchecked')).toBeTruthy();
    expect(queryByTestId('unchecked-ingredientname')).toBeTruthy();
    expect(queryByTestId('unchecked-3')).toBeTruthy();
    expect(queryByTestId('unchecked-Ounces')).toBeTruthy();
    expect(queryByTestId('edit-icon')).toBeTruthy();
    expect(queryByTestId('delete-icon')).toBeTruthy();

    expect(queryByTestId('grocery-checkbox-checked')).toBeNull();
    expect(queryByTestId('checked-ingredientname')).toBeNull();
    expect(queryByTestId('checked-3')).toBeNull();
    expect(queryByTestId('checked-Ounces')).toBeNull();
  });

  it('Typing into TextField changes value of ingredient field', async () => {
    const { queryByTestId } = render(
      <IngredientItem
        id={testIngredient.id}
        name={testIngredient.name}
        quantity={testIngredient.quantity}
        quantityType={testIngredient.quantityType}
        checked={testIngredient.checked}
        groceryExtra={testIngredient.groceryExtra}
        handleDelete={handleDelete}
      />
    );

    UserEvent.click(queryByTestId('edit-icon'));
    await waitFor(() => expect(queryByTestId('edit-icon')).toBeNull());

    const quantityInput = screen.getByTestId('grocery-edit-quantity');
    expect(quantityInput.value).toBe(testIngredient.quantity);
    UserEvent.type(quantityInput, '2');
    expect(quantityInput.value).toBe('32');
  });

  it('Clicking done icon executes handleSubmit function', async () => {
    const handleUpdateIngredient = jest.fn((testIngredient) => null);

    const { queryByTestId } = render(
      <IngredientItem
        id={testIngredient.id}
        name={testIngredient.name}
        quantity={testIngredient.quantity}
        quantityType={testIngredient.quantityType}
        checked={testIngredient.checked}
        groceryIngredient
        groceryExtra={testIngredient.groceryExtra}
        handleDelete={handleDelete}
        handleUpdateIngredient={handleUpdateIngredient}
      />
    );

    UserEvent.click(queryByTestId('edit-icon'));
    await waitFor(() => expect(queryByTestId('edit-icon')).toBeNull());

    UserEvent.click(queryByTestId('done-icon'));
    expect(handleUpdateIngredient).toHaveBeenCalledTimes(1);
  });

  it('Error during editing ingredient is rendered in error message to user', async () => {
    const errorMessage = 'An error message';
    const handleUpdateIngredient = jest.fn((testIngredient) => errorMessage);

    const { queryByTestId } = render(
      <IngredientItem
        id={testIngredient.id}
        name={testIngredient.name}
        quantity={testIngredient.quantity}
        quantityType={testIngredient.quantityType}
        checked={testIngredient.checked}
        groceryIngredient
        groceryExtra={testIngredient.groceryExtra}
        handleDelete={handleDelete}
        handleUpdateIngredient={handleUpdateIngredient}
      />
    );

    UserEvent.click(queryByTestId('edit-icon'));
    await waitFor(() => expect(queryByTestId('edit-icon')).toBeNull());

    UserEvent.click(queryByTestId('done-icon'));
    expect(handleUpdateIngredient).toHaveBeenCalledTimes(1);

    await waitFor(() =>
      expect(queryByTestId('form-submit-message')).toBeTruthy()
    );
    expect(queryByTestId('form-submit-message').innerHTML).toBe(errorMessage);
  });
});
