export class SnakeModel {
  constructor(segments = []) {
    this.segments = segments;
    this.direction = { x: 1, y: 0 };
  }

  reset(segments = []) {
    this.segments = segments;
  }
}
