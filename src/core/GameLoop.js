export class GameLoop {
  constructor({ update, render } = {}) {
    this.update = update ?? (() => {});
    this.render = render ?? (() => {});
    this.animationFrameId = null;
    this.lastTime = 0;
    this.isRunning = false;
  }

  start() {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    this.lastTime = performance.now();
    this.animationFrameId = requestAnimationFrame((time) => this.tick(time));
  }

  stop() {
    this.isRunning = false;

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  tick(time) {
    if (!this.isRunning) {
      return;
    }

    const deltaTime = time - this.lastTime;
    this.lastTime = time;
    this.update(deltaTime);
    this.render();
    this.animationFrameId = requestAnimationFrame((nextTime) =>
      this.tick(nextTime),
    );
  }
}
