import {Road} from "./Road";

import dorogaImage from 'public/game/doroga.jpg';
import myCarImage from 'public/game/my-car.png';
import truckCarImage from 'public/game/grey-car.png';
import grayCarImage from 'public/game/grey-car.png';
import policeCarImage from 'public/game/police-car.png';
import liveImage from 'public/game/live.png';
import coinImage from 'public/game/coin.png';
import {GameObject} from "./GameObject";

export class GameObjectFactory {
  private readonly _resources = new Map<string, HTMLImageElement>();

  async load () {
    const resources = [
      dorogaImage,
      myCarImage,
      truckCarImage,
      grayCarImage,
      policeCarImage,
      liveImage,
      coinImage,
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

  createRoads (canvasHeight: number, totalRoadsHeight: number): Road[] {
    const roads: Road[] = [];
    const roadHeight = this._getImage(dorogaImage).height;
    while (totalRoadsHeight < canvasHeight + roadHeight) {
      const road = this.createRoad(totalRoadsHeight - roadHeight);
      roads.push(road);
      totalRoadsHeight += roadHeight;
    }

    return roads
  }

  getRoadHeight (): number {
    return this._getImage(dorogaImage).height;
  }

  createRoad (y: number): Road {
    return new Road(this._getImage(dorogaImage), y);
  }

  createPlayerCar (x: number, y: number): GameObject {
    return new GameObject(this._getImage(myCarImage), x, y, true, 0, false, 0); //Наша машинка
  }

  createGrayCar (x: number, y: number): GameObject {
    return new GameObject(this._getImage(grayCarImage), x, y, false, 0, false, 0);
  }

  createTrack (x: number, y: number): GameObject {
    return new GameObject(this._getImage(truckCarImage), x, y, false, 0, false, 0);
  }

  createPoliceCar (x: number, y: number): GameObject {
    return new GameObject(this._getImage(policeCarImage), x, y, false, 0, true, 0)
  }

  createCoin (x: number, y: number): GameObject {
    return new GameObject(this._getImage(coinImage), x, y, false, 10, false, 0);
  }

  createLive (x: number, y: number): GameObject {
    return new GameObject(this._getImage(liveImage), x, y, false, 0, false, 1);
  }
}