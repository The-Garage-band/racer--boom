import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useTheme } from '@mui/material/styles';

import './HomePage.less'

export const HomePage: FC = () => {

  const theme = useTheme();

  return (
    <div id="home-page" style={{backgroundColor: theme.palette.background.default}}>
      <img
        src={theme.myCarLink}
        alt=""
        className="car-animation"
        id="car-animation-left"
      />
      <img
        src={theme.myCarLink}
        alt=""
        className="car-animation"
        id="car-animation-right"
      />

      <Button component={Link} to="/game" id="start-button" className="button" 
        style={{
          borderColor: theme.borderColor, 
          borderWidth: theme.borderWidht, 
          boxShadow: theme.boxShadow,
          color: theme.palette.text.secondary,
          textShadow: theme.textShadow 
        }}>
        Старт
      </Button>
      <footer>
        <Button
          component={Link}
          to="/forum"
          id="forum-button"
          className="button" 
          style={{
            borderColor: theme.borderColor, 
            borderWidth: theme.borderWidht, 
            boxShadow: theme.boxShadow,
            textShadow: theme.textShadow
          }}>
          Форум
        </Button>
        <Button
          component={Link}
          to="/leaderboard"
          id="leaderboard-button"
          className="button"
          style={{
            borderColor: theme.borderColor, 
            borderWidth: theme.borderWidht, 
            boxShadow: theme.boxShadow,
            textShadow: theme.textShadow 
          }}>
          Рейтинг
        </Button>
        <Button
          component={Link}
          to="/profile"
          id="profile-button"
          className="button" 
          style={{
            borderColor: theme.borderColor, 
            borderWidth: theme.borderWidht, 
            boxShadow: theme.boxShadow,
            textShadow: theme.textShadow 
          }}>
          Профиль
        </Button>
        <Button
          component={Link}
          to="/logout"
          id="logout-button"
          className="button" style={{
            borderColor: theme.borderColor, 
            borderWidth: theme.borderWidht, 
            boxShadow: theme.boxShadow,
            textShadow: theme.textShadow 
          }}>
          Выйти
        </Button>
      </footer>
    </div>
  )
}
