import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

import './HomePage.less'

export const HomePage: FC = () => {
  return (
    <div id="home-page">
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

      <Button component={Link} to="/game" id="start-button" className="button">
        Старт
      </Button>
      <footer>
        <Button
          component={Link}
          to="/forum"
          id="forum-button"
          className="button">
          Форум
        </Button>
        <Button
          component={Link}
          to="/leaderboard"
          id="leaderboard-button"
          className="button">
          Рейтинг
        </Button>
        <Button
          component={Link}
          to="/profile"
          id="profile-button"
          className="button">
          Профиль
        </Button>
        <Button
          component={Link}
          to="/logout"
          id="logout-button"
          className="button">
          Выйти
        </Button>
      </footer>
    </div>
  )
}
