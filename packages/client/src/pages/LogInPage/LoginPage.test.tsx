import LoginPage from './LoginPage';

import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils';

import {BrowserRouter as Router} from 'react-router-dom';

describe('Input test series', () => {

  beforeEach(() => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
  });

  test('Should submit button is disabled', async () => {
    const authButton = await screen.findByText(/авторизация/i, {selector: 'button'});
    expect(authButton).toBeDisabled();
  });

  test('Should be show errors', async () => {
    const authButton = await screen.findByText(/авторизация/i, {selector: 'button'});
    const loginInput = await screen.findByTestId('input-login');
    const passwordInput = await screen.findByTestId('input-password');

    act(() => {
      fireEvent.change(loginInput, {target: { value: '123' }});
      fireEvent.change(passwordInput, {target: { value: '123' }});
      fireEvent.submit(authButton);
    });

    const passwordError = await screen.findByText(/Добавьте заглавную букву или цифру/i);
    expect(passwordError).toBeVisible();
  });

  test('Should be show button', async () => {
    const authButton = await screen.findByText(/авторизация/i, {selector: 'button'});
    const loginInput = await screen.findByTestId('input-login');
    const passwordInput = await screen.findByTestId('input-password');

    act(() => {
      fireEvent.change(loginInput, {target: { value: 'test-user' }});
      fireEvent.change(passwordInput, {target: { value: '!Baradubra2011' }});
      fireEvent.submit(authButton);
    });

    // Надо как-то понять, что запрос ушел

  });

});