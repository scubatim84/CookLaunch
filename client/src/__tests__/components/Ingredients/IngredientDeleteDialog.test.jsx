import React from 'react';
import UserEvent from '@testing-library/user-event';
import { render, waitFor } from '@testing-library/react';
import { shallow } from 'enzyme';

import IngredientDeleteDialog from '../../../components/Ingredients/IngredientDeleteDialog';

describe('IngredientDeleteDialog', () => {
  it('Renders component without crashing', () => {
    shallow(<IngredientDeleteDialog />);
  });

  it('Dialog is open and buttons execute prop functions when open prop is true', async () => {
    const handleClose = jest.fn();
    const handleDelete = jest.fn();

    const { queryByTestId } = render(
      <IngredientDeleteDialog
        open={true}
        close={handleClose}
        delete={handleDelete}
      />
    );

    expect(queryByTestId('delete-dialog')).toBeTruthy();

    UserEvent.click(queryByTestId('delete-dialog-cancel'));
    await waitFor(() => expect(handleClose).toHaveBeenCalledTimes(1));

    UserEvent.click(queryByTestId('delete-dialog-delete'));
    await waitFor(() => expect(handleDelete).toHaveBeenCalledTimes(1));
  });
});
