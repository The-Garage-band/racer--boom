import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

import './NotFoundPage.less'

const NotFoundPage: FC = () => {
  return (
    <div id="page-not-found">
      <img
        src="public/game/my-car.png"
        alt=""
        className="car-animation"
        id="car-animation-left"
      />
      <img
        src="public/game/my-car.png"
        alt=""
        className="car-animation"
        id="car-animation-right"
      />

      <h1>404</h1>

      <h2>Страница не найдена</h2>

      <Button
        component={Link}
        to="/"
        onClick={function (e) {
          e.preventDefault()
          window.history.back()
        }}
        id="back-button"
        className="button">
        Назад
      </Button>
    </div>
  )
}

export default NotFoundPage
