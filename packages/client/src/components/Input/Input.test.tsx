import React from 'react';
import Input from './Input'
import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils';

import { EmailOutlined } from '@mui/icons-material'
import { InputProps } from './Input';

const inputProps: InputProps = {
  label: "Test label",
  type: 'text',
  name: "test-name",
  Icon: EmailOutlined
};

describe('Input test series', () => {
  test('Should be Input in the Document', async () => {

    render(<Input {...inputProps} />);

    const inputElement = await screen.findByText(inputProps.label);
    expect(inputElement).toBeInTheDocument();
  });

  test('Should be value is visible', async () => {

    render(<Input {...inputProps} />);
    const inputElement = await screen.findByRole('textbox');

    act(() => {
      fireEvent.change(inputElement, {
        target: {
          value: 'test value'
        }
      })
    });

    expect(inputElement).toBeInTheDocument();
  });

});
