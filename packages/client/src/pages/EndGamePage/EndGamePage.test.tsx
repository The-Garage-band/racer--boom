import React from "react";
import { EndGamePage } from "./EndGamePage";

import { render, screen } from '@testing-library/react';

import {BrowserRouter as Router} from 'react-router-dom';


describe('End game page test series', () => {

  test('Should be visible button for return to game', async () => {

    render(
      <Router>
        <EndGamePage />
      </Router>
    );

    const returnToGameButton = await screen.findByText(/заново/i);
    expect(returnToGameButton).toBeVisible();
  });

});