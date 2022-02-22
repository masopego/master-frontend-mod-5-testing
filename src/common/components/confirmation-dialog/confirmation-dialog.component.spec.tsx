import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialogComponent } from '.';

describe('common/ConfirmationDialogComponent', () => {
  it('should be render as expected passing properties', () => {
    const props = {
      isOpen: true,
      onAccept: () => {},
      onClose: () => {},
      title: 'Title',
      labels: {
        closeButton: 'Cerrar',
        acceptButton: 'Aceptar',
      },
    };

    render(<ConfirmationDialogComponent {...props} />);

    const title = screen.getByText(props.title);
    const acceptButton = screen.getByRole('button', {
      name: props.labels.acceptButton,
    });
    const closeButton = screen.getByRole('button', {
      name: props.labels.closeButton,
    });

    expect(title).not.toBeNull();
    expect(acceptButton).not.toBeNull();
    expect(closeButton).not.toBeNull();

    expect(title).toBeInTheDocument();
    expect(acceptButton).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    expect(title.tagName).toEqual('H2');
    expect(acceptButton.tagName).toEqual('BUTTON');
    expect(closeButton.tagName).toEqual('BUTTON');

    expect(title).toHaveTextContent(props.title);
    expect(acceptButton).toHaveTextContent(props.labels.acceptButton);
    expect(closeButton).toHaveTextContent(props.labels.closeButton);
  });

  it('render component should check with Snapshot', () => {
    const props = {
      isOpen: true,
      onAccept: () => {},
      onClose: () => {},
      title: 'Title',
      labels: {
        closeButton: 'Cerrar',
        acceptButton: 'Aceptar',
      },
    };

    render(<ConfirmationDialogComponent {...props} />);
    const dialog = screen.getByRole('dialog');

    expect(dialog).toMatchSnapshot();
  });

  it('should display dialog when isOpen', () => {
    const props = {
      isOpen: true,
      onAccept: () => {},
      onClose: () => {},
      title: 'Title',
      labels: {
        closeButton: 'Cerrar',
        acceptButton: 'Aceptar',
      },
    };

    render(<ConfirmationDialogComponent {...props} />);
    const dialog = screen.queryByRole('dialog');

    expect(dialog).toBeInTheDocument();
    expect(dialog).toBeVisible();
  });

  it("shouldn't display dialog when !isOpen", () => {
    const props = {
      isOpen: false,
      onAccept: () => {},
      onClose: () => {},
      title: 'Title',
      labels: {
        closeButton: 'Cerrar',
        acceptButton: 'Aceptar',
      },
    };

    render(<ConfirmationDialogComponent {...props} />);
    const dialog = screen.queryByRole('dialog');

    expect(dialog).not.toBeInTheDocument();
    expect(dialog).toBeNull();
  });

  it('should call on handleAccept function when accept button is clicked', () => {
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'Title',
      labels: {
        closeButton: 'Cerrar',
        acceptButton: 'Aceptar',
      },
    };

    render(<ConfirmationDialogComponent {...props} />);

    const acceptButton = screen.getByRole('button', {
      name: props.labels.acceptButton,
    });

    userEvent.click(acceptButton);
    expect(props.onAccept).toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalled();
  });

  it('should call on onClose function when close button is clicked', () => {
    const props = {
      isOpen: true,
      onAccept: () => {},
      onClose: jest.fn(),
      title: 'Title',
      labels: {
        closeButton: 'Cerrar',
        acceptButton: 'Aceptar',
      },
    };

    render(<ConfirmationDialogComponent {...props} />);

    const closeButton = screen.getByRole('button', {
      name: props.labels.closeButton,
    });

    userEvent.click(closeButton);
    expect(props.onClose).toHaveBeenCalled();
  });
});
