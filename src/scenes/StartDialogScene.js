import {
  CANCEL,
  CONFIRM,
  DOWN,
  LEFT,
  POINTER_DOWN,
  RIGHT,
  UP,
} from '../input/InputActions.js';
import { AD_OVERLAY, GAME } from '../app/constants.js';
import { BackgroundRenderer } from '../renderer/BackgroundRenderer.js';
import { DialogRenderer } from '../renderer/DialogRenderer.js';
import { ButtonModel } from '../ui/ButtonModel.js';
import { DialogModel } from '../ui/DialogModel.js';

export class StartDialogScene {
  constructor({ config, sceneManager, navigationService }) {
    this.config = config;
    this.sceneManager = sceneManager;
    this.navigationService = navigationService;
    this.backgroundRenderer = new BackgroundRenderer();
    this.dialogRenderer = new DialogRenderer();
    this.dialog = null;
  }

  init() {
    this.createDialog();
  }

  enter() {
    this.dialog.selectedButtonIndex = 0;
    this.dialog.updateSelectedButton();
  }

  update() {}

  render(renderer) {
    this.backgroundRenderer.render(renderer);
    this.dialogRenderer.render(renderer, this.dialog);
  }

  exit() {}

  destroy() {}

  handleInput(action, payload) {
    if (action === LEFT || action === UP) {
      this.dialog.selectPrevious();
      return;
    }

    if (action === RIGHT || action === DOWN) {
      this.dialog.selectNext();
      return;
    }

    if (action === CONFIRM) {
      this.dialog.confirmSelected();
      return;
    }

    if (action === CANCEL) {
      this.dialog.cancel();
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
      title: 'SNAKE',
      message: 'Do you want to play?',
      buttons: [yesButton, noButton],
      onCancel: () => this.navigationService.goToReadme(),
    });
  }
}
