import {FC, useContext} from "react";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {GameContext} from "@/hocs";

import { useTheme } from '@mui/material/styles';

import './EndGamePage.less';

export const EndGamePage: FC = () => {

    const theme = useTheme();
    const gameContext = useContext(GameContext);

    return (<div id="end-game-page" style={{backgroundColor: theme.palette.background.default}}>
        <img src={theme.myCarLink} alt="" className="car-animation" id="car-animation-left"/>
        <img src={theme.myCarLink} alt="" className="car-animation" id="car-animation-right"/>

        <main>
            <Button component={Link} to="/game" id="start-button" className="button"  style={{
                borderColor: theme.shape.borderColor, 
                borderWidth: theme.shape.borderWidht, 
                boxShadow: theme.shape.boxShadow,
                color: theme.palette.text.secondary,
                textShadow: theme.palette.text.textShadow }}>
                Заново
            </Button>
            <div className="stats" style={{
                  borderColor: theme.palette.text.secondary, 
                  borderWidth: theme.shape.borderWidht, 
                  boxShadow: theme.shape.boxShadow}}>
                <ul>
                    <li>Счёт: <b className="value">{gameContext.data.score}</b></li>
                    <li>Собрано монет: <b className="value">{gameContext.data.coins}</b></li>
                    <li>Собрано жизней: <b className="value">{gameContext.data.healthCollected}</b></li>
                    <li>Место в рейтинге: <b className="value">15</b></li>
                </ul>
            </div>
        </main>
        <footer>
            <Button component={Link} to="/forum" id="forum-button" className="button" style={{
                  borderColor: theme.shape.borderColor, 
                  borderWidth: theme.shape.borderWidht, 
                  boxShadow: theme.shape.boxShadow,
                  textShadow: theme.palette.text.textShadow }}>
                Форум
            </Button>
            <Button component={Link} to="/leaderboard" id="leaderboard-button" className="button" style={{
                  borderColor: theme.shape.borderColor, 
                  borderWidth: theme.shape.borderWidht, 
                  boxShadow: theme.shape.boxShadow,
                  textShadow: theme.palette.text.textShadow }}>
                Рейтинг
            </Button>
            <Button component={Link} to="/profile" id="profile-button" className="button" style={{
                  borderColor: theme.shape.borderColor, 
                  borderWidth: theme.shape.borderWidht, 
                  boxShadow: theme.shape.boxShadow,
                  textShadow: theme.palette.text.textShadow }}>
                Профиль
            </Button>
        </footer>
    </div>)
}