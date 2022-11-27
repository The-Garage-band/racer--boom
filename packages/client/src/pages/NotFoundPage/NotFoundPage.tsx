import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useTheme } from '@mui/material/styles';

import './NotFoundPage.less'

const NotFoundPage: FC = () => {

  const theme = useTheme();

  return (
    <div id="page-not-found" style={{backgroundColor: theme.palette.background.default}}>
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

      <h1 style={{textShadow: theme.textShadow }}>404</h1>

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
