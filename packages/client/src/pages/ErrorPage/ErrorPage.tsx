import {FC} from 'react';
import {Link} from "react-router-dom";
import { Button } from '@mui/material';

import './ErrorPage.less';

type ErrorPageProps = {
    caption: string,
    description: string,
}

export const ErrorPage: FC<ErrorPageProps> = ({caption = '500', description = 'Что-то пошло не так :('}) => {

    return (<div id="error-page">
        <img src="public/game/my-car.png" alt="" className="car-animation" id="car-animation-left"/>
        <img src="public/game/my-car.png" alt="" className="car-animation" id="car-animation-right"/>

        <h1>{caption}</h1>

        <h2>{description}</h2>

        <Button component={Link} to="/" onClick={function(e){
            e.preventDefault();
            window.history.back();
        }} id="back-button" className="button">Назад</Button>

    </div>)
}