import {Road} from "./Road";
import {GameObject} from "./GameObject";

type gameThemeType = {
  [key: string]: any; // 👈️ variable keys
};

export class GameObjectFactory {

  private readonly _resources = new Map<string, HTMLImageElement>();

  private _gameTheme: any 

  async load (gameTheme: gameThemeType) {

    let resources: string = [];
    if (gameTheme){
      resources = [
        gameTheme.roadLink,
        gameTheme.myCarLink,
        gameTheme.truckCarLink,
        gameTheme.greyCarLink,
        gameTheme.policeCarLink,
        gameTheme.coinLink,
        gameTheme.liveLink
      ];
    }

    this._gameTheme = gameTheme;

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
      const road = this.createRoad(totalRoadsHeight - roadHeight);
      roads.push(road);
      totalRoadsHeight += roadHeight;
    }

    return roads
  }

  getRoadHeight (): number {
    return this._getImage(this._gameTheme.roadLink).height;
  }

  createRoad (y: number): Road {
    return new Road(this._getImage(this._gameTheme.roadLink), y);
  }

  createPlayerCar (x: number, y: number): GameObject {
    return new GameObject(this._getImage(this._gameTheme.myCarLink), x, y, true, 0, false, 0); //Наша машинка
  }

  updatePlayerCar(playerCar: GameObject){
    if (playerCar && playerCar.image){
      playerCar.image.src = this._gameTheme.myCarLink; 
    }
    return playerCar;
  }

  createGrayCar (x: number, y: number): GameObject {
    return new GameObject(this._getImage(this._gameTheme.greyCarLink), x, y, false, 0, false, 0);
  }

  createTrack (x: number, y: number): GameObject {
    return new GameObject(this._getImage(this._gameTheme.truckCarLink), x, y, false, 0, false, 0);
  }

  createPoliceCar (x: number, y: number): GameObject {
    return new GameObject(this._getImage(this._gameTheme.policeCarLink), x, y, false, 0, true, 0)
  }

  createCoin (x: number, y: number): GameObject {
    return new GameObject(this._getImage(this._gameTheme.coinLink), x, y, false, 10, false, 0);
  }

  createLive (x: number, y: number): GameObject {
    return new GameObject(this._getImage(this._gameTheme.liveLink), x, y, false, 0, false, 1);
  }
}