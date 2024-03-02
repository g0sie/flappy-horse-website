import BaseScene from "./BaseScene";

class MenuScene extends BaseScene {
  constructor() {
    super("MenuScene");

    this.menu = [
      {
        text: "Graj normalnie",
        onClick: () => {
          this.scene.start("GameScene", { trippy: false });
        },
      },
      {
        text: "Trippy mode",
        onClick: () => {
          this.scene.start("GameScene", { trippy: true });
        },
      },
    ];
  }

  create() {
    this.createBackground("black");
    this.createMenu(this.menu, 350);
  }
}

export default MenuScene;
