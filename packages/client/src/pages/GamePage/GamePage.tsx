import {CanvasComponent} from "@/components/CanvasComponent";
import {FC} from "react";
import healthEmpty from 'public/game/health-empty.png';
import healthFill from 'public/game/health-fill.png';

import './GamePage.less';

import {startRacing} from './game';

type GamePageProps = {
    health: number,
}

export const GamePage: FC<GamePageProps> = ({
    health,
}) => {
    return (
        <div id="game-page">
            <div className="header">
                <div className="healths" style={{ display: 'none' }}>
                    <img src={health >= 1 ? healthFill : healthEmpty} alt="<3"/>
                    <img src={health >= 2 ? healthFill : healthEmpty} alt="<3"/>
                    <img src={health >= 3 ? healthFill : healthEmpty} alt="<3"/>
                </div>
                <div className="timer" style={{ display: 'none' }} >
                    <span className="value">00:10</span>
                </div>
                <div className="score" style={{ display: 'none' }}>
                    <span className="value">200</span>
                </div>
            </div>
            <div className="content">
                <CanvasComponent id="game-canvas" width={500} height={500}/>
            </div>

        </div>
    )
}

window.onload = function(){
    startRacing();
}

