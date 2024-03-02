import Phaser from "phaser";

// scenes
import PreloadScene from "./scenes/PreloadScene";
import MenuScene from "./scenes/MenuScene";
import GameScene from "./scenes/GameScene";
import GameOverScene from "./scenes/GameOverScene";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./constants";

// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
export const gameConfig = {
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
  },
  scene: [PreloadScene, MenuScene, GameScene, GameOverScene],
  pixelArt: true,
  scale: {
    parent: "game-container",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
};
