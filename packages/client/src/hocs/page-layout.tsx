import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from 'react'

import { useTheme } from '@mui/material/styles';

export default function PageLayout(props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined
}) {

  const theme = useTheme();

  return (
    <div className="page" style={{backgroundColor: theme.palette.background.default}}>
      <div className="page__logo">
        <img src={theme.logo} alt="" />
      </div>
      <div className="page__decoration page-decoration">
        <img className="page-decoration__left" src={theme.bgCar} alt="" />
        <img className="page-decoration__right" src={theme.bgCar} alt="" />
      </div>
      <div className="page__content">{props.children}</div>
    </div>
  )
}
