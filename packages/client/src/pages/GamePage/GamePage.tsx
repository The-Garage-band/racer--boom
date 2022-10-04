import {CanvasComponent} from "@/components/CanvasComponent";
import {FC} from "react";
import './GamePage.less';
import health from './health.svg';

export const GamePage: FC = () => {
    return (
        <div id="gamePage">
            <div className="header">
                <div className="healths">
                    <img src={health} alt="<3"/>
                    <img src={health} alt="<3"/>
                    <img src={health} alt="<3"/>
                </div>
                <div className="timer">
                    <span className="value">00:10</span>
                </div>
                <div className="score">
                    <span className="value">200</span>
                </div>
            </div>
            <CanvasComponent width={500} height={500}/>
        </div>
    )
}