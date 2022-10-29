
//typescript

//import random from 'utils.random';

import {GamePage} from "@/pages/GamePage/GamePage";

import coinImage from 'public/game/coin.png';
import dorogaImage from 'public/game/doroga.jpg';
import grayCarImage from 'public/game/grey-car.png';
import truckCarImage from 'public/game/grey-car.png';
import myCarImage from 'public/game/my-car.png';
import policeCarImage from 'public/game/police-car.png';
import liveImage from 'public/game/live.png';

import crushSound from 'public/game/crush.mp3';
import repareSound from 'public/game/repare.mp3';
import gameOverSound from 'public/game/gameover.mp3';
import collectCoinSound from 'public/game/collectcoin.mp3';

import { AudioService } from '@/services';

let started = false;
export function startRacing(scope: GamePage, startGameLives: number, startGameScores: number, startAddHealth: string){
  if (started) return;
  started = true;

  const UPDATE_TIME: number = 1000 / 100;

  let gameTimer: any = null, gameScoresCounter: any = null, speedUpdater: any = null;

  let gameScores = startGameScores, gameLives = startGameLives; //Очки и жизни
  let gameAddHealth = startAddHealth;

  const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
  if (!canvas) {
    return;
  }
  let gameObjects: GameObject[] = []; //Прочие объекты

	//Дорога
	class Road {
    x: number;
    y: number;
    image: HTMLImageElement;

		constructor(image: string, y: number) {
			this.x = 0;
			this.y = y;
			this.image = new Image();			
			this.image.src = image;
		}

		Update(road: Road): void {
			this.y += speed;
			if (this.y > window.innerHeight) {
				this.y = road.y - canvas.width + speed;
			}
		}
	}

	//Авто и прочее
	class GameObject {
    x: number;
    y: number;
    needDelete: boolean;
    isPlayer: boolean;
    scores: number;
    lives: number;
    isPolice: boolean;
    image: HTMLImageElement;

		constructor(image: string, x: number, y: number, isPlayer: boolean, scores: number, isPolice: boolean, lives: number) {
			this.x = x;
			this.y = y;
			this.needDelete = false;
			this.isPlayer = isPlayer;
			this.scores = scores;
			this.lives = lives;
			this.isPolice = isPolice;

			this.image = new Image();
			this.image.src = image;
		}

		Update(): void {
			if (!this.isPlayer) {
				this.y += speed;
			}

			if (this.y > canvas.height + 250) {
				this.needDelete = true;
			}
		}

		//Обработка столкновений
		Crash(car: GameObject): boolean {
			return checkCarCollision(this, car);
		}

		//Перемещение
		Move(v: string, d: number): void  {
			if (v == "x") {
				//Горизонталь
				d *= 5;

				this.x += d;

				if (this.x + this.image.width * objIncrease > canvas.width) {
					this.x -= d;
				}
		
				if (this.x < 0) {
					this.x = 0;
				}
			} else {
				//Вертикаль
				this.y += d;

				if (this.y + this.image.height * objIncrease > canvas.height) {
					this.y -= d;
				}

				if (this.y < 0) {
					this.y = 0;
				}
			}
			
		}
	}

	function checkCarCollision(firstCar: GameObject, secondCar: GameObject): boolean{
		if (firstCar.y < secondCar.y + secondCar.image.height * objIncrease && firstCar.y + firstCar.image.height * objIncrease > secondCar.y) {
			//Вертикаль
			if (firstCar.x + firstCar.image.width * objIncrease > secondCar.x && firstCar.x < secondCar.x + secondCar.image.width * objIncrease) {
				//Горизонталь
				return true;
			}
		}
		return false;
	}


	function startGame(): void {
		if (!playerCar.needDelete) {
			gameTimer = setInterval(updateGame, UPDATE_TIME);
			gameScoresCounter = setInterval(updateGameScores, 1000);
			speedUpdater = setInterval(updateSpeed, 100*timeToChangeSpeed); //Каждые 100 секунд
		} else {
			reStartGame();
		}
	}

	function reStartGame(): void {
		stopGame();
		playerCar.needDelete = false;
		gameObjects = [];
		playerCar = new GameObject(myCarImage, canvas.width / 2, canvas.height / 1.25, true, 0, false, 0);
		startGame();
	}

	function stopGame(): void {
		clearInterval(gameTimer);
		clearInterval(gameScoresCounter);
		clearInterval(speedUpdater);
		gameScores = startGameScores;
		gameLives = startGameLives;
		speed = startSpeed;
		gameAddHealth = startAddHealth;
		gameTimer = null;
		gameScoresCounter = null;
		speedUpdater = null;
	}

	function updateGame(): void {
		roads[0].Update(roads[1]);
		roads[1].Update(roads[0]);

		//машинки и монетки
		const objRandom = gererateRandom(0, maxRandom);
		const objRandomByNum = objRandom/maxRandom;
		if (objRandomByNum > coinProb) {

			const objX = gererateRandom(30, canvas.width - 50);
			const objY = - gererateRandom(250, 500);
			let isPush = true;

			//Проверяем, чтобы не вставали друг на друга
			gameObjects.forEach(function(item) {
				if (item.y < objY + item.image.height * objIncrease && item.y + item.image.height * objIncrease > objY) {
					//Вертикаль
					if (item.x + item.image.width * objIncrease > objX && item.x < objX + item.image.width * objIncrease) {
						//Горизонталь
						isPush = false;
					}
				}
			});

			if (isPush){

				//Монетка
				if ((objRandomByNum > coinProb) && (objRandomByNum < carProb)){
					gameObjects.push(new GameObject(coinImage, objX, objY, false, 10, false, 0));
				}

				//Серая машинка
				if ((objRandomByNum > carProb) && (objRandomByNum < truckProb) ){
					gameObjects.push(new GameObject(grayCarImage, objX, objY, false, 0, false, 0));
				}

				//Грузовик
				if ((objRandomByNum > truckProb) && (objRandomByNum < policeProb) ){
					gameObjects.push(new GameObject(truckCarImage, objX, objY, false, 0, false, 0));
				}

				//Полиция
				if ((objRandomByNum > policeProb) && (objRandomByNum < liveProb)) {
					gameObjects.push(new GameObject(policeCarImage, objX, objY, false, 0, true, 0));
				}

				//Жизнь
				if ((objRandomByNum > liveProb)){
					gameObjects.push(new GameObject(liveImage, objX, objY, false, 0, false, 1));
				}
			}
		}
		
		if (playerCar.needDelete) {
			alert("Game over!");
			reStartGame();
		}

		let needDelete = false; 

		for (let i = 0; i < gameObjects.length; i++) {
			gameObjects[i].Update();

			if (gameObjects[i].needDelete) {
				needDelete = true;
			}
		}

		if (needDelete) {
			gameObjects.shift();
		}

		let isCrash = false;

		for (let i = 0; i < gameObjects.length; i++) {
			isCrash = playerCar.Crash(gameObjects[i]);

			if (isCrash) {
				//Монетки
				if (gameObjects[i].scores){
					gameScores = gameScores + gameObjects[i].scores;
					gameObjects.splice(i, 1);
					collectCoinAudioPlay();
				} else {

					//Жизни
					if (gameObjects[i].lives){
						gameLives = gameLives + gameObjects[i].lives;
						gameObjects.splice(i, 1);
						repareAudioPlay();
						break;
					}

					//Машинки
					if (gameObjects[i].isPolice || (gameLives <= 0)){
						gameLives = 0;
						playerCar.needDelete = true;
						gameOverAudioPlay();
						setLives();
						alert("Game over!");			
						reStartGame();
						break;
					} else {
						gameLives--;						
						gameObjects.splice(i, 1);
						crushAudioPlay();
					}
					
				}
			}
		}

		playerCar.Update();
		drawGame();
	}

	function updateGameScores(): void{
		gameScores++;
	}

	function updateSpeed(): void{
		speed = speed + changeSpeedBy;
	}

	//Рисуем
	function drawGame(): void {
		canvasContext.clearRect(0, 0, canvas.width, canvas.height);

		for (let i = 0; i < roads.length; i++) {
			canvasContext.drawImage(
				roads[i].image, //Изображение
				0, //X
				0, //Y
				roads[i].image.width, //Ширина
				roads[i].image.height, //Высота
				roads[i].x, //X на канвасе
				roads[i].y, //Y на канвасе
				canvas.width, //Ширина
				canvas.width //Высота
			);
		}

		drawCar(playerCar);

		for (let i = 0; i < gameObjects.length; i++) {
			drawCar(gameObjects[i]);
		}

		setLives();
	}

	function drawCar(car: GameObject): void {
		canvasContext.drawImage(
			car.image, 
			0, 
			0, 
			car.image.width, 
			car.image.height, 
			car.x, 
			car.y, 
			car.image.width * objIncrease, 
			car.image.height * objIncrease 
		);
	}

	function keyDownClick(e: any): void {

		const speedDifferent = 2;

		switch(e.keyCode) {
			case 37: 
				//Влево
				playerCar.Move("x", -speed - speedDifferent);
				break;

			case 39: 
				//Вправо
				playerCar.Move("x", speed + speedDifferent);
				break;

			case 38: 
				//Вперёд
				playerCar.Move("y", -speed - speedDifferent);
				break;

			case 40: 
				//Назад
				playerCar.Move("y", speed + speedDifferent);
				break;

			case 27: 
				//Esc
				if (gameTimer == null) {
					startGame();
				} else {
					stopGame();
				}
				break;
		}
	}

	function resizeGameCanvas(): void {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	function gererateRandom(min: number, max: number): number {
		const rand = min - 0.5 + Math.random() * (max - min + 1);
		return Math.round(rand);
		//return random(min, max);
	}

	function setLives(): void {
		gameAddHealth = startAddHealth;
		if (gameLives > startGameLives){
			gameAddHealth = "+" + (gameLives - startGameLives).toString();
		}
		scope.setState({health: gameLives, score: gameScores, addHealth: gameAddHealth});
	}

	function crushAudioPlay(): void {
		if (AudioService.getInstance().isEnabled()){
			crushAudio.play();
		}
	}

	function gameOverAudioPlay(): void {
		if (AudioService.getInstance().isEnabled()){
			gameOverAudio.play();
		}
	}

	function repareAudioPlay(): void {
		if (AudioService.getInstance().isEnabled()){
			repareAudio.play();
		}
	}

	function collectCoinAudioPlay(): void {
		if (AudioService.getInstance().isEnabled()){
			collectCoinAudio.play();
		}
	}
	
	if (!canvas){
		return;
	}

	const canvasContext: any = canvas.getContext("2d");

	resizeGameCanvas();
	window.addEventListener("resize", resizeGameCanvas);

	const canWidth: number = canvas.width;
	const canHeight: number = canvas.height;
	
	const objIncrease = 0.0001*canWidth + 0.003;
	const startSpeed = 0.005*canHeight;
	const timeToChangeSpeed = 100; 
	const changeSpeedBy = 0.1; //Увеличивать скорость на changeSpeedBy каждые timeToChangeSpeed секунд
	let speed = startSpeed;

	//Вероятности появления для всех
	const maxRandom = 10000;
	const coinProb = 0.91; //Монетка
	const carProb = 0.966; //Машинка
	const truckProb = 0.988; //Грузовик
	const policeProb = 0.994; //Полиция
	const liveProb = 0.998; //Жизнь

	canvas.addEventListener("contextmenu", function (e) { 
		e.preventDefault(); 
		return false;
	}); 

	window.addEventListener("keydown", function (e) { 
		keyDownClick(e);
	});

	//Фон
	const roadSrc = dorogaImage;

	let roadY: number = canWidth;
	if (canHeight > canWidth){
		roadY = canHeight;
	}
	const roads = [
		new Road(roadSrc, 0),
		new Road(roadSrc, roadY)
	];

	const myCarSrc = myCarImage;
	const newImage = new Image();
	newImage.src = myCarSrc;
	let playerCar: GameObject = new GameObject(myCarSrc, canWidth / 2, canHeight - newImage.height * objIncrease - 1, true, 0, false, 0); //Наша машинка

	//Звуки
	var crushAudio = new Audio(crushSound); //Столкновение
	var gameOverAudio = new Audio(gameOverSound); //Завершение игры
	var collectCoinAudio = new Audio(collectCoinSound); //Сбор монеток
	var repareAudio = new Audio(repareSound); //Ремонт (+ жизнь)

	newImage.onload = function() {
		playerCar = new GameObject(myCarSrc, canWidth / 2, canHeight - newImage.height * objIncrease - 1, true, 0, false, 0); //Наша машинка
		startGame();
	}
}
