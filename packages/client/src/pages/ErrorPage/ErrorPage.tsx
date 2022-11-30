import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useTheme } from '@mui/material/styles';

import './ErrorPage.less'

type ErrorPageProps = {
  caption: string
  description: string
}

const ErrorPage: FC<ErrorPageProps> = ({
  caption = '500',
  description = 'Что-то пошло не так :(',
}) => {
  const theme = useTheme();

  return (
    <div id="error-page" style={{backgroundColor: theme.palette.background.default}}>
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

      <h1 style={{textShadow: theme.textShadow }}>{caption}</h1>

      <h2>{description}</h2>

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

export default ErrorPage
