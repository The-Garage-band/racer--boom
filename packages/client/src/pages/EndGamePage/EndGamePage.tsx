import {FC, useContext} from "react";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import myCar from "public/game/my-car.png";
import {GameContext} from "@/hocs";

import './EndGamePage.less';

export const EndGamePage: FC = () => {
    const gameContext = useContext(GameContext);

    return (<div id="end-game-page">
        <img src={myCar} alt="" className="car-animation" id="car-animation-left"/>
        <img src={myCar} alt="" className="car-animation" id="car-animation-right"/>

        <main>
            <Button component={Link} to="/game" id="start-button" className="button">
                Заново
            </Button>
            <div className="stats">
                <ul>
                    <li>Счёт: <b className="value">{gameContext.data.score}</b></li>
                    <li>Собрано монет: <b className="value">{gameContext.data.coins}</b></li>
                    <li>Собрано жизней: <b className="value">{gameContext.data.healthCollected}</b></li>
                    <li>Место в рейтинге: <b className="value">15</b></li>
                </ul>
            </div>
        </main>
        <footer>
            <Button component={Link} to="/forum" id="forum-button" className="button">
                Форум
            </Button>
            <Button component={Link} to="/leaderboard" id="leaderboard-button" className="button">
                Рейтинг
            </Button>
            <Button component={Link} to="/profile" id="profile-button" className="button">
                Профиль
            </Button>
        </footer>
    </div>)
}