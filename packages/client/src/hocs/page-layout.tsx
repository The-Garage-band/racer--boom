import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from 'react'

import bgCar from 'public/bg-car.png'
import logo from 'public/logo.png'

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
  return (
    <div className="page">
      <div className="page__logo">
        <img src={logo} alt="" />
      </div>
      <div className="page__decoration page-decoration">
        <img className="page-decoration__left" src={bgCar} alt="" />
        <img className="page-decoration__right" src={bgCar} alt="" />
      </div>
      <div className="page__content">{props.children}</div>
    </div>
  )
}
