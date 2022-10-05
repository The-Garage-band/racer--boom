import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";

export default function PageLayout(props: { children: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | ReactFragment | ReactPortal | null | undefined; }) {
  return (
    <div className="page">
      <div className="page__logo">
        <img src="../public/logo.png" alt="" />
      </div>
      <div className="page__decoration page-decoration">
        <img className="page-decoration__left" src="../public/bg-car.png" alt="" />
        <img className="page-decoration__right" src="../public/bg-car.png" alt="" />
      </div>
      <div className="page__content">
        { props.children }
      </div>
    </div>
  );
}
