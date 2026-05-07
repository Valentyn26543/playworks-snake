import { AdState } from './AdState.js';

export class IMAService {
  constructor() {
    this.state = AdState.IDLE;
  }

  initialize() {}

  requestAd() {
    this.state = AdState.LOADING;
  }

  destroy() {
    this.state = AdState.IDLE;
  }
}
