export class SceneManager {
  constructor() {
    this.scenes = new Map();
    this.activeScene = null;
  }

  register(name, scene) {
    this.scenes.set(name, scene);
    scene.init?.();
  }

  switchTo(name, params = {}) {
    const nextScene = this.scenes.get(name);

    if (!nextScene) {
      throw new Error(`Scene "${name}" is not registered.`);
    }

    this.activeScene?.exit?.();
    this.activeScene = nextScene;
    this.activeScene.enter?.(params);
  }

  update(deltaTime) {
    this.activeScene?.update?.(deltaTime);
  }

  render(renderer) {
    this.activeScene?.render?.(renderer);
  }

  handleInput(action) {
    this.activeScene?.handleInput?.(action);
  }

  destroy() {
    this.activeScene?.exit?.();
    this.scenes.forEach((scene) => scene.destroy?.());
    this.scenes.clear();
    this.activeScene = null;
  }
}
