import {
  CANCEL,
  CONFIRM,
  LEFT,
  POINTER_DOWN,
  RIGHT,
} from '../input/InputActions.js';
import { GAME } from '../app/constants.js';
import { BackgroundRenderer } from '../renderer/BackgroundRenderer.js';
import { DialogRenderer } from '../renderer/DialogRenderer.js';
import { ButtonModel } from '../ui/ButtonModel.js';
import { DialogModel } from '../ui/DialogModel.js';

export class StartDialogScene {
  constructor({ config, sceneManager }) {
    this.config = config;
    this.sceneManager = sceneManager;
    this.backgroundRenderer = new BackgroundRenderer();
    this.dialogRenderer = new DialogRenderer();
    this.dialog = null;
    this.statusMessage = '';
  }

  init() {
    this.createDialog();
  }

  enter() {
    this.statusMessage = '';
    this.dialog.selectedButtonIndex = 0;
    this.dialog.updateSelectedButton();
  }

  update() {}

  render(renderer) {
    this.backgroundRenderer.render(renderer);
    this.dialogRenderer.render(renderer, this.dialog);
    this.renderStatusMessage(renderer);
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
      onClick: () => this.sceneManager.switchTo(GAME),
    });
    const noButton = new ButtonModel({
      x: 654,
      y: buttonY,
      width: 140,
      height: 64,
      label: 'NO',
      onClick: () => {
        this.statusMessage = 'NO selected';
      },
    });

    this.dialog = new DialogModel({
      title: 'SNAKE',
      message: 'Do you want to play?',
      buttons: [yesButton, noButton],
      onCancel: () => {
        this.statusMessage = 'Cancel selected';
      },
    });
  }

  renderStatusMessage(renderer) {
    if (!this.statusMessage) {
      return;
    }

    const context = renderer.getContext();
    context.save();
    context.fillStyle = '#ffdf8b';
    context.font = '24px Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.fillText(this.statusMessage, renderer.getWidth() / 2, 552);
    context.restore();
  }
}
