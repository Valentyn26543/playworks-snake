import { AppConfig } from './AppConfig.js';
import { BOOT } from './constants.js';
import { EventBus } from '../core/EventBus.js';
import { GameLoop } from '../core/GameLoop.js';
import { SceneManager } from '../core/SceneManager.js';
import { CanvasRenderer } from '../renderer/CanvasRenderer.js';
import { BootScene } from '../scenes/BootScene.js';

export class GameApplication {
  constructor({ canvas, adContainer } = {}) {
    if (!canvas) {
      throw new Error('GameApplication requires a canvas element.');
    }

    this.canvas = canvas;
    this.adContainer = adContainer;
    this.config = AppConfig;
    this.events = new EventBus();
    this.renderer = new CanvasRenderer(canvas, this.config);
    this.sceneManager = new SceneManager();
    this.loop = new GameLoop({
      update: (deltaTime) => this.update(deltaTime),
      render: () => this.render(),
    });

    this.registerScenes();
  }

  registerScenes() {
    this.sceneManager.add(BOOT, new BootScene());
  }

  start() {
    this.sceneManager.change(BOOT);
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }

  update(deltaTime) {
    this.sceneManager.update(deltaTime);
  }

  render() {
    this.renderer.clear();
    this.sceneManager.render(this.renderer.context);
  }
}
