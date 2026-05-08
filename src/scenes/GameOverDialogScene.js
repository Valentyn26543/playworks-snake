import { AD_OVERLAY, GAME } from '../app/constants.js';
import { CANCEL, CONFIRM, LEFT, POINTER_DOWN, RIGHT } from '../input/InputActions.js';
import { BackgroundRenderer } from '../renderer/BackgroundRenderer.js';
import { DialogRenderer } from '../renderer/DialogRenderer.js';
import { ButtonModel } from '../ui/ButtonModel.js';
import { DialogModel } from '../ui/DialogModel.js';

export class GameOverDialogScene {
  constructor({ sceneManager, navigationService }) {
    this.sceneManager = sceneManager;
    this.navigationService = navigationService;
    this.backgroundRenderer = new BackgroundRenderer();
    this.dialogRenderer = new DialogRenderer();
    this.dialog = null;
    this.finalScore = 0;
  }

  init() {}

  enter(params = {}) {
    this.finalScore = params.finalScore ?? params.score ?? 0;
    this.createDialog();
  }

  update() {}

  render(renderer) {
    this.backgroundRenderer.render(renderer);
    this.dialogRenderer.render(renderer, this.dialog);
  }

  exit() {}

  destroy() {}

  handleInput(action, payload) {
    if (action === LEFT) {
      this.dialog.selectPrevious();
      return;
    }

    if (action === RIGHT) {
      this.dialog.selectNext();
      return;
    }

    if (action === CONFIRM) {
      this.dialog.confirmSelected();
      return;
    }

    if (action === CANCEL) {
      this.navigationService.goToReadme();
      return;
    }

    if (action === POINTER_DOWN && payload) {
      this.dialog.handlePointer(payload.x, payload.y);
    }
  }

  createDialog() {
    const buttonY = 456;
    const yesButton = new ButtonModel({
      x: 486,
      y: buttonY,
      width: 140,
      height: 64,
      label: 'YES',
      onClick: () =>
        this.sceneManager.switchTo(AD_OVERLAY, {
          nextScene: GAME,
        }),
    });
    const noButton = new ButtonModel({
      x: 654,
      y: buttonY,
      width: 140,
      height: 64,
      label: 'NO',
      onClick: () => this.navigationService.goToReadme(),
    });

    this.dialog = new DialogModel({
      title: 'GAME OVER',
      message: `Score: ${this.finalScore}\nPlay again?`,
      buttons: [yesButton, noButton],
      onCancel: () => this.navigationService.goToReadme(),
    });
  }
}
