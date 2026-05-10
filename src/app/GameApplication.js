import { AppConfig } from './AppConfig.js';
import {
  AD_OVERLAY,
  BOOT,
  GAME,
  GAME_OVER_DIALOG,
  START_DIALOG,
} from './constants.js';
import { GameLoop } from '../core/GameLoop.js';
import { SceneManager } from '../core/SceneManager.js';
import { IMAService } from '../ads/IMAService.js';
import { KeyboardController } from '../input/KeyboardController.js';
import { MouseController } from '../input/MouseController.js';
import { ExternalNavigationService } from '../navigation/ExternalNavigationService.js';
import { CanvasRenderer } from '../renderer/CanvasRenderer.js';
import { AdOverlayScene } from '../scenes/AdOverlayScene.js';
import { BootScene } from '../scenes/BootScene.js';
import { GameOverDialogScene } from '../scenes/GameOverDialogScene.js';
import { GameScene } from '../scenes/GameScene.js';
import { StartDialogScene } from '../scenes/StartDialogScene.js';

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
    this.navigationService = new ExternalNavigationService();
    this.imaService = new IMAService({
      adContainer: this.adContainer,
    });
    this.keyboardController = new KeyboardController({
      sceneManager: this.sceneManager,
    });
    this.mouseController = new MouseController({
      canvas,
      sceneManager: this.sceneManager,
    });
    this.loop = new GameLoop({
      update: (deltaTime) => this.update(deltaTime),
      render: () => this.render(),
    });

    this.registerScenes();
  }

  registerScenes() {
    const sceneContext = {
      config: this.config,
      renderer: this.renderer,
      sceneManager: this.sceneManager,
      navigationService: this.navigationService,
      imaService: this.imaService,
    };

    this.sceneManager.register(
      BOOT,
      new BootScene({
        ...sceneContext,
      }),
    );
    this.sceneManager.register(
      START_DIALOG,
      new StartDialogScene({
        ...sceneContext,
      }),
    );
    this.sceneManager.register(AD_OVERLAY, new AdOverlayScene(sceneContext));
    this.sceneManager.register(GAME, new GameScene(sceneContext));
    this.sceneManager.register(
      GAME_OVER_DIALOG,
      new GameOverDialogScene(sceneContext),
    );
  }

  start() {
    this.sceneManager.switchTo(BOOT);
    this.keyboardController.start();
    this.mouseController.start();
    this.loop.start();
  }

  stop() {
    this.loop.stop();
    this.keyboardController.destroy();
    this.mouseController.destroy();
  }

  destroy() {
    this.stop();
    this.sceneManager.destroy();
    this.imaService.destroy();
  }

  update(deltaTime) {
    this.sceneManager.update(deltaTime);
  }

  render() {
    this.renderer.clear();
    this.sceneManager.render(this.renderer);
  }
}
