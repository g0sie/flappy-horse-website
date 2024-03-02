import Phaser from "phaser";

import WebFontFile from "../WebFontFile";

import { MENU_FONT } from "../constants";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.image("trippyBg", "assets/trippyBgHand.png");
    this.load.image("horse", "assets/horse.png");
    this.load.image("finger", "assets/finger.png");

    this.load.addFile(new WebFontFile(this.load, MENU_FONT));
  }

  create() {
    this.scene.start("MenuScene");
  }
}

export default PreloadScene;
