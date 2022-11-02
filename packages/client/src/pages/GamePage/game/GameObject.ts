
//Авто и прочее
export class GameObject {
  x: number;
  y: number;
  needDelete: boolean;
  isPlayer: boolean;
  scores: number;
  lives: number;
  isPolice: boolean;
  image: HTMLImageElement;

  public static getCanvasWidth = () => 0;
  public static getCanvasHeight = () => 0;
  public static getSpeed = () => 0;
  public static getObjectIncrease = () => 0;

  constructor(image: HTMLImageElement, x: number, y: number, isPlayer: boolean, scores: number, isPolice: boolean, lives: number) {
    this.x = x;
    this.y = y;
    this.needDelete = false;
    this.isPlayer = isPlayer;
    this.scores = scores;
    this.lives = lives;
    this.isPolice = isPolice;

    this.image = image;
  }

  Update(): void {
    if (!this.isPlayer) {
      this.y += GameObject.getSpeed();
    }

    if (this.y > GameObject.getCanvasHeight() + 250) {
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

      if (this.x + this.image.width * GameObject.getObjectIncrease() > GameObject.getCanvasWidth()) {
        this.x -= d;
      }

      if (this.x < 0) {
        this.x = 0;
      }
    } else {
      //Вертикаль
      this.y += d;

      if (this.y + this.image.height * GameObject.getObjectIncrease() > GameObject.getCanvasHeight()) {
        this.y -= d;
      }

      if (this.y < 0) {
        this.y = 0;
      }
    }

  }

  public containPoint (x: number, y: number, offset: number): boolean {
    return x >= this.x - offset
      && x <= this.x + this.image.width + offset
      && y >= this.y - offset
      && y <= this.y + this.image.height + offset;
  }
}

function checkCarCollision(firstCar: GameObject, secondCar: GameObject): boolean {
  //Вертикаль
  return firstCar.y < secondCar.y + secondCar.image.height * GameObject.getObjectIncrease()
    && firstCar.y + firstCar.image.height * GameObject.getObjectIncrease() > secondCar.y
    //Горизонталь
    && firstCar.x + firstCar.image.width * GameObject.getObjectIncrease() > secondCar.x
    && firstCar.x < secondCar.x + secondCar.image.width * GameObject.getObjectIncrease()

}