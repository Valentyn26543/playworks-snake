export class SceneManager {
  constructor() {
    this.scenes = new Map();
    this.currentScene = null;
  }

  add(name, scene) {
    this.scenes.set(name, scene);
    scene.init?.();
  }

  change(name, data) {
    this.currentScene?.exit?.();
    this.currentScene = this.scenes.get(name) ?? null;
    this.currentScene?.enter?.(data);
  }

  update(deltaTime) {
    this.currentScene?.update?.(deltaTime);
  }

  render(renderer) {
    this.currentScene?.render?.(renderer);
  }

  handleInput(action) {
    this.currentScene?.handleInput?.(action);
  }

  destroy() {
    this.currentScene?.exit?.();
    this.scenes.forEach((scene) => scene.destroy?.());
    this.scenes.clear();
    this.currentScene = null;
  }
}
