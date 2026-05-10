import { AdConfig } from './AdConfig.js';
import { completed, failed, timeout, unavailable } from './AdFallback.js';
import { AdState } from './AdState.js';

export class IMAService {
  constructor({
    adContainer = document.querySelector('#ad-container'),
    config = AdConfig,
    windowObject = window,
  } = {}) {
    this.adContainer = adContainer;
    this.config = config;
    this.windowObject = windowObject;
    this.state = AdState.IDLE;
    this.adsManager = null;
    this.adsLoader = null;
    this.adDisplayContainer = null;
    this.contentVideo = null;
  }

  showVideoAd() {
    if (!this.adContainer) {
      return Promise.resolve(unavailable());
    }

    const ima = this.getIMA();

    if (!ima) {
      this.state = AdState.FAILED;
      this.hideAdContainer();
      return Promise.resolve(unavailable());
    }

    this.destroyAdsManager();
    this.prepareAdContainer();
    this.state = AdState.LOADING;

    return new Promise((resolve) => {
      let settled = false;
      const timeoutId = this.windowObject.setTimeout(() => {
        settle(timeout());
      }, this.config.timeoutMs);

      const settle = (result) => {
        if (settled) {
          return;
        }

        settled = true;
        this.windowObject.clearTimeout(timeoutId);
        this.state = result.success ? AdState.COMPLETED : AdState.FAILED;
        this.destroyAdsManager();
        this.hideAdContainer();
        resolve(result);
      };

      try {
        this.contentVideo = this.createContentVideo();
        this.adDisplayContainer = new ima.AdDisplayContainer(
          this.adContainer,
          this.contentVideo,
        );
        this.adsLoader = new ima.AdsLoader(this.adDisplayContainer);

        this.adsLoader.addEventListener(
          ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
          (event) => this.handleAdsManagerLoaded(event, ima, settle),
          false,
        );
        this.adsLoader.addEventListener(
          ima.AdErrorEvent.Type.AD_ERROR,
          (event) => settle(failed(this.getAdErrorReason(event, 'no_ad'))),
          false,
        );

        this.adDisplayContainer.initialize();
        this.requestAds(ima);
      } catch (error) {
        settle(failed(this.getErrorReason(error)));
      }
    });
  }

  getIMA() {
    return this.windowObject.google?.ima ?? null;
  }

  requestAds(ima) {
    const adsRequest = new ima.AdsRequest();
    adsRequest.adTagUrl = this.getAdTagUrl();
    adsRequest.linearAdSlotWidth = this.config.width;
    adsRequest.linearAdSlotHeight = this.config.height;
    adsRequest.nonLinearAdSlotWidth = this.config.width;
    adsRequest.nonLinearAdSlotHeight = Math.round(this.config.height / 3);
    this.adsLoader.requestAds(adsRequest);
  }

  handleAdsManagerLoaded(event, ima, settle) {
    try {
      const adsRenderingSettings = new ima.AdsRenderingSettings();
      adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
      this.adsManager = event.getAdsManager(
        this.contentVideo,
        adsRenderingSettings,
      );

      this.adsManager.addEventListener(ima.AdEvent.Type.LOADED, () => {
        this.state = AdState.PLAYING;
      });
      this.adsManager.addEventListener(ima.AdEvent.Type.STARTED, () => {
        this.state = AdState.PLAYING;
      });
      this.adsManager.addEventListener(ima.AdEvent.Type.COMPLETE, () => {
        settle(completed());
      });
      this.adsManager.addEventListener(ima.AdEvent.Type.SKIPPED, () => {
        settle(completed());
      });
      this.adsManager.addEventListener(
        ima.AdEvent.Type.ALL_ADS_COMPLETED,
        () => {
          settle(completed());
        },
      );
      this.adsManager.addEventListener(ima.AdErrorEvent.Type.AD_ERROR, (adError) => {
        settle(failed(this.getAdErrorReason(adError)));
      });

      this.adsManager.init(
        this.config.width,
        this.config.height,
        ima.ViewMode.NORMAL,
      );
      this.adsManager.start();
    } catch (error) {
      settle(failed(this.getErrorReason(error)));
    }
  }

  prepareAdContainer() {
    this.adContainer.style.display = 'block';
    this.adContainer.style.width = `${this.config.width}px`;
    this.adContainer.style.height = `${this.config.height}px`;
    this.adContainer.style.pointerEvents = 'auto';
    this.adContainer.style.visibility = 'visible';
  }

  hideAdContainer() {
    if (!this.adContainer) {
      return;
    }

    this.adContainer.style.display = 'none';
    this.adContainer.style.pointerEvents = 'none';
    this.adContainer.replaceChildren();
  }

  createContentVideo() {
    const video = document.createElement('video');
    video.playsInline = true;
    video.muted = true;
    video.preload = 'auto';
    video.style.position = 'absolute';
    video.style.inset = '0';
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'contain';
    video.style.background = 'transparent';
    video.controls = false;
    this.adContainer.append(video);
    return video;
  }

  getAdTagUrl() {
    const correlator = `${Date.now()}${Math.floor(Math.random() * 100000)}`;

    if (this.config.adTagUrl.endsWith('correlator=')) {
      return `${this.config.adTagUrl}${correlator}`;
    }

    return this.config.adTagUrl;
  }

  getAdErrorReason(event, fallback = 'ad_error') {
    const adError = event?.getError?.();
    return adError?.getMessage?.() ?? fallback;
  }

  getErrorReason(error) {
    return error?.message ?? 'ad_error';
  }

  destroyAdsManager() {
    try {
      this.adsManager?.destroy?.();
    } catch {
      // Ignore SDK cleanup errors so the game can continue.
    }

    this.adsManager = null;
    this.adsLoader = null;
    this.adDisplayContainer = null;
    this.contentVideo = null;
  }

  destroy() {
    this.destroyAdsManager();
    this.hideAdContainer();
    this.state = AdState.IDLE;
  }
}
