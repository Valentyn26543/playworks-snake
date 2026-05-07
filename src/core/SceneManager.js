export class SceneManager {
  constructor() {
    this.scenes = new Map();
    this.currentScene = null;
  }

  add(name, scene) {
    this.scenes.set(name, scene);
  }

  change(name, data) {
    this.currentScene?.exit?.();
    this.currentScene = this.scenes.get(name) ?? null;
    this.currentScene?.enter?.(data);
  }

  update(deltaTime) {
    this.currentScene?.update?.(deltaTime);
  }

  render(context) {
    this.currentScene?.render?.(context);
  }
}
