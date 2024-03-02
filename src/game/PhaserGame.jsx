import { useEffect } from "react";

import { gameConfig } from "./gameConfig";

let game;

function PhaserGame() {
  useEffect(() => {
    game = new Phaser.Game(gameConfig);
  }, []);

  return <div id="game-container" />;
}

export default PhaserGame;
