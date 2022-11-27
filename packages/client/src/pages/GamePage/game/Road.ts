//Дорога
export class Road {
  x: number;
  y: number;
  startY: number;
  image: HTMLImageElement;

  public static getSpeed = () => 0;

  constructor(image: HTMLImageElement, y: number) {
    this.x = 0;
    this.y = y;
    this.startY = y;
    this.image = image;
  }

  UpdateImage(roadImageLink): void {
    if (roadImageLink){
      this.image.src = roadImageLink;
    }
  }

  Update(speed: float): void {
    this.y += speed;
  }
}