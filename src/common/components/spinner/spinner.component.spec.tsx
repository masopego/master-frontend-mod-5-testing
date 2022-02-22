import React from 'react';
import {
  render,
  screen,
  act,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { trackPromise } from 'react-promise-tracker';
import { SpinnerComponent } from 'common/components';

const timeout = (milliseconds = 500) =>
  new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve('done');
      reject(new Error('Whoops!'));
    }, milliseconds);
  });

describe('common/spinnerComponent', () => {
  it('should not be displayed spinner component if there is not any promise', () => {
    render(<SpinnerComponent />);

    const spinner = screen.queryByRole('presentation');

    expect(spinner).not.toBeInTheDocument();
  });

  it('should be displayed spinner component if there is a promise', () => {
    render(<SpinnerComponent />);

    act(() => {
      trackPromise(timeout());
    });

    const spinner = screen.getByRole('presentation');

    expect(spinner).toBeVisible();
  });

  it('render component should check with Snapshot', () => {
    render(<SpinnerComponent />);

    act(() => {
      trackPromise(timeout());
    });

    const spinner = screen.getByRole('presentation');

    expect(spinner).toMatchSnapshot();
  });

  it('should remove spinner component after promise is resolved', async () => {
    render(<SpinnerComponent />);

    act(() => {
      trackPromise(timeout());
    });

    const spinner = screen.getByRole('presentation');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toBeVisible();

    await waitForElementToBeRemoved(() => screen.queryByRole('presentation'));
  });
});
