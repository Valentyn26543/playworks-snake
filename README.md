# PlayWorks Snake

Vanilla JavaScript Snake game test task built with the HTML Canvas API.

## Tech Stack

- Vanilla JavaScript
- HTML Canvas API
- Vite as the build tool only

No Pixi.js, Phaser, React, Vue, Angular, or external game/rendering framework is used.

## Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Builds the project for production.

```bash
npm run preview
```

Previews the production build locally.

## Canvas

The game uses a fixed HD canvas:

- Width: `1280`
- Height: `720`

The game is intentionally not responsive for this test task.

## Current Flow

1. `BootScene` shows `Loading...`
2. `StartDialogScene` shows the canvas-rendered `SNAKE` dialog
3. `YES` switches to `AdOverlayScene`
4. `AdOverlayScene` shows `Loading ad...`
5. The app switches to `GameScene`
6. `NO` or `Backspace` redirects to the configured GitHub README URL

## Controls

- `ArrowLeft`: select previous dialog button
- `ArrowRight`: select next dialog button
- `Enter`: confirm selected dialog button
- `Backspace`: cancel / redirect
- Mouse click: activate clicked canvas button

## Project Structure

```text
src/
  app/
  core/
  scenes/
  game/
  renderer/
  ui/
  input/
  ads/
  navigation/
  styles/
  utils/
```

All visible UI is drawn manually on canvas.
