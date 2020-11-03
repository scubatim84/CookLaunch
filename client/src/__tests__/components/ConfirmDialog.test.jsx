import React from 'react';
import UserEvent from '@testing-library/user-event';
import { render, waitFor } from '@testing-library/react';

import ConfirmDialog from '../../components/ConfirmDialog';

describe('ConfirmDialog', () => {
  it('Dialog is open and buttons execute prop functions when open prop is true', async () => {
    const handleClose = jest.fn();
    const handleDelete = jest.fn();

    const { queryByTestId } = render(
      <ConfirmDialog open={true} close={handleClose} delete={handleDelete} />
    );

    expect(queryByTestId('confirm-dialog')).toBeTruthy();

    UserEvent.click(queryByTestId('confirm-dialog-button-right'));
    await waitFor(() => expect(handleClose).toHaveBeenCalledTimes(1));

    UserEvent.click(queryByTestId('confirm-dialog-button-left'));
    await waitFor(() => expect(handleDelete).toHaveBeenCalledTimes(1));
  });
});
