
import React, { Component } from 'react';
import {CanvasComponent} from "@/components/CanvasComponent";
import {FC} from "react";
import healthEmpty from 'public/game/health-empty.png';
import healthFill from 'public/game/health-fill.png';

import './GamePage.less'

import {startRacing} from './game';

export class GamePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            health: 3,
            score: 0,
            addHealth: ""
        };
    }

    render() {
        window.onload  = () => {
            startRacing(this, this.state.health, this.state.score, this.state.addHealth);
        }

        return (
            <div id="game-page">
                <div className="header">
                    <div className="healths" >
                        <img src={this.state.health >= 1 ? healthFill : healthEmpty} alt="<3"/>
                        <img src={this.state.health >= 2 ? healthFill : healthEmpty} alt="<3"/>
                        <img src={this.state.health >= 3 ? healthFill : healthEmpty} alt="<3"/>
                        <span className="value">{this.state.addHealth}</span>
                    </div>
                    <div className="timer" style={{ display: 'none' }} >
                        <span className="value">00:10</span>
                    </div>
                    <div className="score" >
                        <span className="value">{this.state.score}</span>
                    </div>
                </div>
                <div className="content">
                    <CanvasComponent id="game-canvas" width={500} height={500}/>
                </div>

            </div>
        )
    }
}

