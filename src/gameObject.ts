import { getIntroTexturesUrl } from "./assetsTextures";
import { loadMyTextures } from "./main";
import * as PIXI from "pixi.js";

export default class GameObject {
  private videoElement: HTMLVideoElement | null = null;
  gameObject: PIXI.Sprite | null = null;
  private videoResource: PIXI.VideoResource | null = null;
  constructor(private isLoop: boolean) {}

  async create(url: string, isIntro: boolean = false) {
    const texture = await loadMyTextures([url]);
    this.gameObject = new PIXI.Sprite(texture[0]);
    this.videoResource = this.gameObject.texture.baseTexture
      .resource as PIXI.VideoResource;
    this.videoElement = this.videoResource.source;
    this.videoElement.muted = true;
    this.videoElement.loop = this.isLoop;
    this.videoElement.autoplay = true;
    if (isIntro) {
      this.gameObject.visible = false;
      await this.videoElement.play();
      this.videoElement.pause();
      setTimeout(() => {
        if (this.gameObject) this.gameObject.visible = true;
      }, 100);
    }
  }

  reset() {
    if (!this.videoElement) return;
    this.videoElement.currentTime = 0;
    this.videoElement.play();
    this.videoElement.pause();
  }

  addEndListener(callback: () => void) {
    if (this.videoResource) {
      this.videoResource.source.addEventListener("ended", callback);
    }
  }

  removeEndListener(callback: () => void) {
    if (this.videoResource) {
      this.videoResource.source.removeEventListener("ended", callback);
    }
  }

  onPlaying(callback: (time: number) => void) {
    if (this.videoElement) {
      this.videoElement.addEventListener("timeupdate", () => {
        // if (videoElement.currentTime > videoElement.duration - 3) {
        //   videoElement.currentTime = 0;
        // }
        // console.log(this.videoElement!!.currentTime);
        callback(this.videoElement!!.currentTime);
      });
    }
  }

  play() {
    if (this.videoElement) {
      this.videoElement.currentTime = 0;
      this.videoElement.play();
      // this.videoElement.style.opacity = "1";
    }
  }
}
