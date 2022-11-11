import EventEmitter from "events";
import {AudioService} from "@/services";

import {GameObject} from "./GameObject";
import {Road} from "./Road";
import {GameObjectFactory} from "./GameObjectFactory";
import {drawGameObject, drawRoad} from "./drawGameObject";
import {Random} from "@/utils";

const STEPS_FOR_ONE_SECOND = 100;
const STEP_TIME: number = 1000 / STEPS_FOR_ONE_SECOND;

export enum GameEvents {
  gameOver = 'gameOver',
  updateScore = 'updateScore',
  updateCoins = 'updateCoins',
  updateLives = 'updateLives',
}

export class Game {
  public readonly events = new EventEmitter();
  private _started = false;
  private _canvas!: HTMLCanvasElement;

  private readonly _factory = new GameObjectFactory();
  private _playerCar!: GameObject;
  private readonly _gameObjects: GameObject[] = []; //Прочие объекты
  private readonly _roads: Road[] = [];

  private _gameTimer?: NodeJS.Timer;

  private _step = 0;
  public scores = 0;
  public lives = 0;
  public coins = 0;
  private _speedAdd = 0;

  private _audioService = AudioService.getInstance();

  async start (canvas: HTMLCanvasElement) {
    if (this._started) {
      return;
    }
    this._canvas = canvas;
    this._started = true;
    await this._factory.load();

    this._resizeGameCanvas();

    GameObject.getCanvasWidth = this._getCanvasWidth;
    GameObject.getCanvasHeight = this._getCanvasHeight;
    GameObject.getObjectIncrease = this._getObjIncrease;
    GameObject.getSpeed = this._getSpeed;

    Road.getSpeed = this._getSpeed;

    this._playerCar = this._factory.createPlayerCar(this._getCanvasWidth() / 2,  this._getCanvasHeight() - 140);

    this._addEventListeners();
    this._gameTimer = setInterval(this._updateGame, STEP_TIME)
  }

  get started () {
    return this._started;
  }

  public stop () {
    this._removeEventListeners();
    clearInterval(this._gameTimer);
    this._started = false;
    this.events.emit(GameEvents.gameOver);
  }

  private _updateGame = () => {
    if (!this._started) {
      this.stop();
      return;
    }
    this._step += 1;
    
    if (this._step % (10 * STEPS_FOR_ONE_SECOND) === 0) {
      this._speedAdd += 0.1;
    }
    if (this._step % STEPS_FOR_ONE_SECOND === 0) {
      this.scores += 1;
      this.events.emit(GameEvents.updateScore, this.scores);
    }

    this._addGameObjects();
    this._updateGameObjects();
    this._deleteGameObjects();

    if (this._playerCar.needDelete) {
      this.stop();
      return;
    }

    this._drawGameObjects();
  }

  private _addGameObjects () {
    const x = Random.randomInt(30, this._getCanvasWidth() - 60);
    const y = Random.randomInt(-600, -100);

    if (this._gameObjects.some(gameObject => gameObject.containPoint(x, y, 120))) {
      return;
    }

    const hardLevel = 10
      + (+(this._step > 20))
      + 2 * (+(this._step > 100))
      + 2 * (+(this._step > 500))
      + 2 * (+(this._step > 1000))
      + 3 * (+(this._step > 2000));

    if (Random.probability(0.002 * hardLevel)) {
      this._gameObjects.push(this._factory.createCoin(x, y));
    } else if (Random.probability(0.0001 * hardLevel)) {
      this._gameObjects.push(this._factory.createLive(x, y));
    } else if (Random.probability(0.0009 * hardLevel)) {
      this._gameObjects.push(this._factory.createGrayCar(x, y));
    } else if (Random.probability(0.0004 * hardLevel)) {
      this._gameObjects.push(this._factory.createTrack(x, y));
    } else if (Random.probability(0.0002 * hardLevel)) {
      this._gameObjects.push(this._factory.createPoliceCar(x, y));
    }
  }

  private _updateGameObjects () {
    this._roads.forEach(road => {
      road.Update();
      if (road.y > this._getCanvasHeight()) {
        road.y -= this._roads.length * road.image.height;
      }
    });
    this._gameObjects.forEach(gameObject => gameObject.Update());

    for (let i = 0; i < this._gameObjects.length; i++) {
      const gameObject = this._gameObjects[i];
      if (this._playerCar.Crash(gameObject)) {
        if (gameObject.scores > 0) {
          this.scores += gameObject.scores;
          this.coins += 1;
          this.events.emit(GameEvents.updateScore, this.scores);
          this.events.emit(GameEvents.updateCoins, this.coins);
          gameObject.needDelete = true;
          this._audioService.playCoinEffect();
        } else if (gameObject.lives > 0) {
          this.lives += gameObject.lives;
          this.events.emit(GameEvents.updateLives, this.lives);
          gameObject.needDelete = true;
          this._audioService.playRepairEffect();
        } else if (gameObject.isPolice || this.lives <= 0) {
          this.lives = 0;
          this._playerCar.needDelete = true;
          this._audioService.playGameOverEffect();
        } else {
          this.lives -= 1;
          this.events.emit(GameEvents.updateLives, this.lives);
          gameObject.needDelete = true;
          this._audioService.playCrushEffect();
        }
      }
      if (gameObject.y > this._getCanvasHeight()) {
        gameObject.needDelete = true;
      }
    }

    this._playerCar.Update();
  }

  _deleteGameObjects () {
    for (let i = this._gameObjects.length - 1; i >= 0; i--) {
      if (this._gameObjects[i].needDelete) {
        this._gameObjects.splice(i, 1);
      }
    }
  }
  
  private _drawGameObjects () {
    this._roads.forEach(road => drawRoad(this._getCanvasContext(), road, this._getCanvasWidth()));
    drawGameObject(this._getCanvasContext(), this._playerCar);
    this._gameObjects.forEach(gameObject => drawGameObject(this._getCanvasContext(), gameObject));
  }

  private _getCanvasContext = () => this._canvas.getContext("2d") as CanvasRenderingContext2D;
  private _getCanvasWidth = () => this._canvas.width;
  private _getCanvasHeight = () => this._canvas.height;
  private _getSpeed = () => this._getCanvasHeight() * 0.005 + this._speedAdd;
  private _getObjIncrease = () => 0.0001 * this._getCanvasWidth() + 0.003;

  private _addEventListeners () {
    window.addEventListener("resize", this._resizeGameCanvas);
    window.addEventListener("keydown", this._onKeydown);
    this._canvas.addEventListener('contextmenu', this._onContextMenu);
  }

  private _removeEventListeners () {
    window.removeEventListener("resize", this._resizeGameCanvas);
    window.removeEventListener("keydown", this._onKeydown);
    this._canvas.removeEventListener('contextmenu', this._onContextMenu);
  }

  private _resizeGameCanvas = () => {
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;

    const roadHeight = this._factory.getRoadHeight();
    if (this._getCanvasHeight() > roadHeight * (this._roads.length - 1) ) {
      let totalRoadsHeight = this._roads.reduce((sum, road) => sum + road.image.height, 0);
      let totalNewRoadsHeight = 0;
      const maxRoadY = Math.max(0, ...this._roads.map(road => road.y)) - roadHeight;
      while (totalRoadsHeight < this._getCanvasHeight() + roadHeight) {
        const road = this._factory.createRoad(maxRoadY + totalNewRoadsHeight);
        this._roads.push(road);
        totalRoadsHeight += roadHeight;
        totalNewRoadsHeight += roadHeight;
      }
    }
  }

  private _onKeydown = (event: KeyboardEvent) => {
    const speedDifferent = 2;

    switch(event.keyCode) {
      case 37:
      case 65:
        return this._playerCar.Move("x", -this._getSpeed() - speedDifferent); //Влево
      case 39:
      case 68:
        return this._playerCar.Move("x", this._getSpeed() + speedDifferent); //Вправо
      case 38:
      case 87:
        return this._playerCar.Move("y", -this._getSpeed() - speedDifferent); //Вперёд
      case 40:
      case 83:
        return this._playerCar.Move("y", this._getSpeed() + speedDifferent); //Назад
    }
  }

  private _onContextMenu = (event: MouseEvent) => {
    event.preventDefault();

    return false;
  }
}