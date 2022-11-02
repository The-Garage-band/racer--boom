import {GameObject} from "./GameObject";
import {Road} from "@/pages/GamePage/game/Road";

export function drawGameObject(canvasContext: CanvasRenderingContext2D, gameObject: GameObject): void {
  canvasContext.drawImage(
    gameObject.image,
    0,
    0,
    gameObject.image.width,
    gameObject.image.height,
    gameObject.x,
    gameObject.y,
    gameObject.image.width * GameObject.getObjectIncrease(),
    gameObject.image.height * GameObject.getObjectIncrease()
  );
}

export function drawRoad (canvasContext: CanvasRenderingContext2D, road: Road, canvasWidth: number): void {
  canvasContext.drawImage(
    road.image, //Изображение
    0, //X
    0, //Y
    road.image.width, //Ширина
    road.image.height, //Высота
    road.x, //X на канвасе
    road.y, //Y на канвасе
    canvasWidth, //Ширина
    road.image.height //Высота
  );
}