import Phaser from "phaser";

import { SCREEN_HEIGHT, SCREEN_WIDTH, MENU_FONT } from "../constants";

class BaseScene extends Phaser.Scene {
  constructor(key) {
    super(key);
    this.screenCenter = [SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2];
    this.lineHeight = 80;
    this.fontOptions = {
      fontSize: "60px",
      stroke: "#000",
      strokeThickness: 8,
      fontFamily: `"${MENU_FONT}"`,
    };
  }

  createBackground(bgKey) {
    switch (bgKey) {
      case "trippy":
        this.add
          .image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "trippyBg")
          .setOrigin(0.5, 0.5);
        break;
      case "black":
        this.add
          .rectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, 0x000000)
          .setOrigin(0, 0);
        break;
      case "dark":
        this.add
          .rectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, 0x000000, 0.6)
          .setOrigin(0, 0);
        break;
    }
  }

  createMenu(menu, marginTop) {
    menu.forEach((menuItem) => {
      const menuPosition = [this.screenCenter[0], marginTop];

      const textGameObject = this.add
        .text(...menuPosition, menuItem.text, this.fontOptions)
        .setOrigin(0.5, 1);

      if ("score" in menuItem) {
        textGameObject.setText(menuItem.score);
        textGameObject.setFontSize(120);
        marginTop += 15;
      }

      if ("onClick" in menuItem) {
        this.setupMenuEvents(textGameObject, menuItem.onClick);
      }

      marginTop += this.lineHeight;
    });
  }

  setupMenuEvents(textGameObject, onClick) {
    textGameObject.setInteractive();

    textGameObject.on("pointerover", () => {
      textGameObject.setFill("#f00");
    });

    textGameObject.on("pointerout", () => {
      textGameObject.setFill("#fff");
    });

    textGameObject.on("pointerup", onClick);
  }
}

export default BaseScene;
