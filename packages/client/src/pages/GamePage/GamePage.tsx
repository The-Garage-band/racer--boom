import React, {Component}  from 'react';
import {CanvasComponent} from "@/components/CanvasComponent";
import healthEmpty from 'public/game/health-empty.png';
import healthFill from 'public/game/health-fill.png';

import './GamePage.less'

import {startRacing} from './game';

type TGamePageState = {
    health: number,
    score: number,
    addHealth: string,
}

type TGamePageProps = {
    health: number,
}

export class GamePage extends Component<TGamePageProps, TGamePageState> {
    constructor(props: TGamePageProps) {
        super(props);
        this.state = {
            health: this.props.health,
            score: 0,
            addHealth: ""
        };
    }

    componentDidMount() {
        startRacing(this, this.state.health, this.state.score, this.state.addHealth);
    }

    render() {
        return (
            <div id="game-page">
                <div className="header">
                    <div className="healths" >
                        <img src={this.state.health >= 1 ? healthFill : healthEmpty} alt="<3"/>
                        <img src={this.state.health >= 2 ? healthFill : healthEmpty} alt="<3"/>
                        <img src={this.state.health >= 3 ? healthFill : healthEmpty} alt="<3"/>
                        <span className="value">{this.state.addHealth}</span>
                    </div>
                    <div className="timer" >
                        <span className="value">{this.state.score}</span>
                    </div>
                    <div className="score"  style={{ display: 'none' }}>
                        <span className="value"></span>
                    </div>
                </div>
                <div className="content">
                    <CanvasComponent id="game-canvas" width={500} height={500}/>
                </div>

            </div>
        )
    }
}

