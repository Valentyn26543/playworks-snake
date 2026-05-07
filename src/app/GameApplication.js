import { AppConfig } from './AppConfig.js';
import { BOOT } from './constants.js';
import { GameLoop } from '../core/GameLoop.js';
import { SceneManager } from '../core/SceneManager.js';
import { CanvasRenderer } from '../renderer/CanvasRenderer.js';
import { BootScene } from '../scenes/BootScene.js';

export class GameApplication {
  constructor() {
    const canvas = document.querySelector('#game-canvas');

    if (!canvas) {
      throw new Error('Could not find canvas#game-canvas.');
    }

    this.canvas = canvas;
    this.adContainer = document.querySelector('#ad-container');
    this.config = AppConfig;
    this.renderer = new CanvasRenderer(canvas);
    this.sceneManager = new SceneManager();
    this.loop = new GameLoop({
      update: (deltaTime) => this.update(deltaTime),
      render: () => this.render(),
    });

    this.registerScenes();
  }

  registerScenes() {
    this.sceneManager.add(BOOT, new BootScene(this.config));
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
    this.sceneManager.render(this.renderer);
  }
}
