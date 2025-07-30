import BaseScene from "./BaseScene";
import { updateUserScoreIfHigher } from "@/lib/updateUserScoreIfHigher";

class GameOverScene extends BaseScene {
  constructor() {
    super("GameOverScene");

    this.menu = [
      { text: "score", score: 0 },
      {
        text: "Jeszcze raz",
        onClick: () => {
          this.scene.stop("GameScene");
          this.scene.start("GameScene");
        },
      },
      {
        text: "Zmien tryb",
        onClick: () => {
          this.scene.stop("GameScene");
          this.scene.start("MenuScene");
        },
      },
    ];
  }

  init(data) {
    this.score = data.score;
  }

  async create() {
    this.createBackground("dark");

    // save score in firebase
    try {
      await updateUserScoreIfHigher(this.score);
    } catch (error) {
      console.error("Nie udało się zapisać wyniku:", error);
    }

    this.createMenu(this.menu);
  }

  createMenu() {
    const scoreObject = this.menu.find((menuItem) => menuItem.text === "score");
    scoreObject.score = this.score;
    super.createMenu(this.menu, 325);
  }
}

export default GameOverScene;
