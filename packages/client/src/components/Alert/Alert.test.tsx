import React from 'react'
import Alert from './Alert'
import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils';

const textMessage = "Test text";

jest.useFakeTimers();

describe('Alert test series', () => {
  test('Should be Alert in the Document', async () => {

    render(<Alert message={ textMessage } />);
    const alertElement = await screen.findByText(textMessage);
    expect(alertElement).toBeInTheDocument();
  });

  test('Should be dont visible', async () => {

    render(<Alert message={ textMessage } duration={ 3000 } />);

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    const alertElement = await screen.findByText(textMessage);

    expect(alertElement).not.toBeVisible();
  });

  test("Should be closed after click", async () => {
    render(<Alert message={ textMessage } />);

    const closeButton = await screen.findByLabelText(/close/i);
    const alertElement = await screen.findByText(textMessage);

    act(() => {
      fireEvent.click(closeButton);
    });

    expect(alertElement).not.toBeVisible();
  });
});
