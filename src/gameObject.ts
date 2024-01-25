import { getIntroTexturesUrl } from "./assetsTextures";
import { loadMyTextures } from "./main";
import * as PIXI from "pixi.js";

export default class GameObject {
  private videoElement: HTMLVideoElement | null = null;
  gameObject: PIXI.Sprite | null = null;
  private videoResource: PIXI.VideoResource | null = null;
  constructor(private isLoop: boolean) {}

  async create(url: string) {
    const texture = await loadMyTextures([url]);
    this.gameObject = new PIXI.Sprite(texture[0]);
    this.videoResource = this.gameObject.texture.baseTexture
      .resource as PIXI.VideoResource;
    this.videoElement = this.videoResource.source;
    this.videoElement.muted = true;
    this.videoElement.loop = this.isLoop;
    this.videoElement.autoplay = true;
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

  play() {
    if (this.videoElement) {
      this.videoElement.play();
    }
  }
}
