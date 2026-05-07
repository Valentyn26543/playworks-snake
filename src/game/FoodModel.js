export class FoodModel {
  constructor(position = { x: 0, y: 0 }) {
    this.position = position;
  }

  setPosition(position) {
    this.position = position;
  }
}
