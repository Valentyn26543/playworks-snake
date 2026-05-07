import './styles/global.css';
import { GameApplication } from './app/GameApplication.js';

const app = new GameApplication({
  canvas: document.querySelector('#game-canvas'),
  adContainer: document.querySelector('#ad-container'),
});

app.start();
