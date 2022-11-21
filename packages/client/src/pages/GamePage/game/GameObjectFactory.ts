import {Road} from "./Road";

import dorogaImage from 'public/game/doroga.jpg';
import myCarImage from 'public/game/my-car.png';
import truckCarImage from 'public/game/grey-car.png';
import grayCarImage from 'public/game/grey-car.png';
import policeCarImage from 'public/game/police-car.png';
import liveImage from 'public/game/live.png';
import coinImage from 'public/game/coin.png';

import lightDorogaImage from 'public/light-game/doroga.jpg';
import lightMyCarImage from 'public/light-game/my-car.png';
import lightTruckCarImage from 'public/light-game/truck.png';
import lightGrayCarImage from 'public/light-game/grey-car.png';
import lightPoliceCarImage from 'public/light-game/police-car.png';
import lightLiveImage from 'public/light-game/live.png';
import lightCoinImage from 'public/light-game/coin.png';

import {GameObject} from "./GameObject";

//import { useTheme } from '@mui/material/styles';



export class GameObjectFactory {

  private readonly _resources = new Map<string, HTMLImageElement>();

  private gameTheme: any 

  async load (gameTheme) {

    const resources = [
      gameTheme.roadLink,
      gameTheme.myCarLink,
      gameTheme.truckCarLink,
      gameTheme.greyCarLink,
      gameTheme.policeCarLink,
      gameTheme.coinLink,
      gameTheme.liveLink
    ];

    const resourcesForLoad = resources.filter(resource => !this._resources.get(resource));

    return Promise.all(resourcesForLoad.map(this._loadResource));
  }

  private _loadResource: (resource: string) => Promise<any> = (resource) => {
    return new Promise(resolve => {
      const image = new Image();
      this._resources.set(resource, image);
      image.addEventListener('load', resolve);
      image.src = resource;
    });
  }

  _getImage (resource: string) {
    return this._resources.get(resource) as HTMLImageElement;
  }

  createRoads (canvasHeight: number, totalRoadsHeight: number, imageLink: string): Road[] {
    const roads: Road[] = [];
    const roadHeight = this._getImage(imageLink).height;
    while (totalRoadsHeight < canvasHeight + roadHeight) {
      const road = this.createRoad(totalRoadsHeight - roadHeight, imageLink);
      roads.push(road);
      totalRoadsHeight += roadHeight;
    }

    return roads
  }

  getRoadHeight (imageLink: string): number {
    return this._getImage(imageLink).height;
  }

  createRoad (y: number, imageLink: string): Road {
    return new Road(this._getImage(imageLink), y);
  }

  createPlayerCar (x: number, y: number, imageLink: string): GameObject {
    return new GameObject(this._getImage(imageLink), x, y, true, 0, false, 0); //Наша машинка
  }

  updatePlayerCar(playerCar: GameObject, imageLink: string){
    if (playerCar && playerCar.image){
      playerCar.image.src = imageLink; 
    }
    return playerCar;
  }

  createGrayCar (x: number, y: number, imageLink: string): GameObject {
    return new GameObject(this._getImage(imageLink), x, y, false, 0, false, 0);
  }

  createTrack (x: number, y: number, imageLink: string): GameObject {
    return new GameObject(this._getImage(imageLink), x, y, false, 0, false, 0);
  }

  createPoliceCar (x: number, y: number, imageLink: string): GameObject {
    return new GameObject(this._getImage(imageLink), x, y, false, 0, true, 0)
  }

  createCoin (x: number, y: number, imageLink: string): GameObject {
    return new GameObject(this._getImage(imageLink), x, y, false, 10, false, 0);
  }

  createLive (x: number, y: number, imageLink: string): GameObject {
    return new GameObject(this._getImage(imageLink), x, y, false, 0, false, 1);
  }
}