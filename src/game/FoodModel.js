export class FoodModel {
  constructor(position = null) {
    this.position = position;
  }

  setPosition(position) {
    this.position = position;
  }

  getPosition() {
    return this.position;
  }
}
