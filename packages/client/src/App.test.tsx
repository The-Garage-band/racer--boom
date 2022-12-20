import React from 'react'
import App from './App'
import { render, screen } from '@testing-library/react'

describe('Start test', () => {
  test('Example test', async () => {
    render(<App />)

    const authElement = await screen.findByText(/логин/i);

    expect(authElement).toBeInTheDocument()
  })
});


