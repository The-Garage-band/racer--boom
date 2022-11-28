import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import healthEmpty from 'public/game/health-empty.png';
import healthFill from 'public/game/health-fill.png';

import './GamePage.less'

import {Game, GameEvents} from "./game";
import {GameContext} from "@/hocs";
import {addLeaderboardItem} from "@/API/Leaderboard";
import {useAppSelector} from "@/hooks";
import {getUserData} from "@/store/slices/GetUserSlice";

import { useTheme } from '@mui/material/styles';

type TGamePageProps = {
    health: number,
}

let game: Game;
let gameTheme = {};

const themeObserver = new MutationObserver(function(){
    if (game && gameTheme){
        game.changeTheme(gameTheme);
    }
});

export const GamePage: FC<TGamePageProps> = (props) => {
    const [health, setHealth] = useState(props.health);
    const [score, setScore] = useState(0);
    const [coins, setCoins] = useState(0);
    const canvas = useRef<HTMLCanvasElement>(null);
    const navigate = useNavigate();
    const gameContext = useContext(GameContext);

    const { data } = useAppSelector(getUserData);
    const onGameOver = () => {
        addLeaderboardItem({
            point: gameContext.data.score,
            name: data.display_name,
            avatar: data.avatar,
        });
        navigate('/end-game');
    }

    const theme = useTheme();  
    gameTheme = theme; 

    useEffect(() => {
        game = new Game();

        if (canvas.current) {
            game.events.on(GameEvents.updateScore, setScore);
            game.events.on(GameEvents.updateLives, setHealth);
            game.events.on(GameEvents.updateCoins, setCoins);
            game.events.once(GameEvents.gameOver, onGameOver);
            game.lives = health;
            game.gameTheme = theme;
            gameContext.data.healthCollected = 0;
            game.start(canvas.current);

            themeObserver.observe(document.documentElement, { attributes: true })
        }

        return () => {
            if (!canvas.current) {
                game.events.removeListener(GameEvents.updateScore, setScore);
                game.events.removeListener(GameEvents.updateLives, setHealth);
                game.events.removeListener(GameEvents.updateCoins, setCoins);
                game.events.removeListener(GameEvents.gameOver, onGameOver);
                if (themeObserver){
                    themeObserver.disconnect();
                }
                game.stop();
                return;
            }
            game.events.removeListener(GameEvents.updateScore, setScore);
            game.events.removeListener(GameEvents.updateLives, setHealth);
            game.events.removeListener(GameEvents.updateCoins, setCoins);
            game.events.removeListener(GameEvents.gameOver, onGameOver);
            game.stop();
        }
    }, []);

    useEffect(() => {
        gameContext.update({ score });
    }, [score]);
    useEffect(() => {
        gameContext.update({ coins });
    }, [coins]);
    useEffect(() => {
        gameContext.update({ healthCollected: gameContext.data.healthCollected + 1});
    }, [health]);

    return (
        <div id="game-page">
            <div className="header">
                <div className="healths" >
                    <img src={health >= 1 ? healthFill : healthEmpty} alt="<3"/>
                    <img src={health >= 2 ? healthFill : healthEmpty} alt="<3"/>
                    <img src={health >= 3 ? healthFill : healthEmpty} alt="<3"/>
                    <span className="value">{health > 3 ? `+${(health - 3)}` : ''}</span>
                </div>
                <div className="timer" >
                    <span className="value">{score}</span>
                </div>
                <div className="score"  style={{ display: 'none' }}>
                    <span className="value">{score}</span>
                </div>
            </div>
            <div className="content">
                <canvas ref={canvas} width={500} height={500} id="game-canvas" />
            </div>

        </div>
    )
}
