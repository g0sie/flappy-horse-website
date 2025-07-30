import BaseScene from "./BaseScene";

import Horse from "../objects/Horse";

import {
  SCREEN_HEIGHT,
  VELOCITY,
  FINGERS_TO_RENDER,
  FINGER_VERTICAL_GAP,
  FINGER_HORIZONTAL_DISTANCE,
  SCREEN_WIDTH,
  FIRST_FINGER_POSITION_X,
  FINGER_MIN_DISTANCE_FROM_TOP_OF_SCREEN,
} from "../constants";

class GameScene extends BaseScene {
  constructor() {
    super("GameScene");

    this.horse = null;
    this.fingers = null;
    this.isGameStarted = false;
    this.isGameOver = false;

    this.score = 0;
    this.scoreText = "";

    this.colors = [
      "0xE40303",
      "0xFF8C00",
      "0xFFED00",
      "0x008026",
      "0x004CFF",
      "0x732982",
    ];
  }

  init(data) {
    this.trippyMode = data.trippy;
  }

  create() {
    this.isGameStarted = false;
    this.isGameOver = false;
    this.createBackground(this.trippyMode ? "trippy" : "black");
    this.createHorse();
    this.createFingers();
    this.createColliders();
    this.createScore();
    this.handleInputs();

    this.physics.pause();
  }

  update() {
    if (!this.isGameOver && this.isGameStarted) {
      this.horse.handleAngle();
    }
    this.gameOverIfHorseOutOfScreen();
    this.recycleFingers();
  }

  createHorse() {
    this.horse = new Horse({
      scene: this,
    });
  }

  createFingers() {
    this.fingers = this.physics.add.group();
    for (let i = 0; i < FINGERS_TO_RENDER; i++) {
      const upperFinger = this.fingers
        .create(0, 0, "finger")
        .setImmovable(true)
        .setOrigin(0.5, 0.5)
        .setAngle(180)
        .setTint(this.colors[i]);

      const lowerFinger = this.fingers
        .create(0, 0, "finger")
        .setImmovable(true)
        .setOrigin(0.5, 0)
        .setTint(this.colors[i]);

      this.placeFinger(upperFinger, lowerFinger);
    }
    this.fingers.setVelocityX(VELOCITY);
  }

  createColliders() {
    this.physics.add.collider(this.horse, this.fingers, () => this.gameOver());
  }

  createScore() {
    this.score = 0;
    this.scoreText = this.add
      .text(SCREEN_WIDTH / 2, 20, this.score, this.fontOptions)
      .setOrigin(0.5, 0);
  }

  handleInputs() {
    this.input.on("pointerdown", () => this.jump());
    this.input.keyboard.on("keydown-SPACE", () => this.jump());
  }

  placeFinger(upperFinger, lowerFinger) {
    const rightFingerX = this.getMostRightFingerX();
    const isFirstFinger = rightFingerX === 0;

    const halfFingerHeight = upperFinger.height / 2;

    const fingerVerticalPosition = Phaser.Math.Between(
      FINGER_MIN_DISTANCE_FROM_TOP_OF_SCREEN - halfFingerHeight,
      SCREEN_HEIGHT -
        FINGER_MIN_DISTANCE_FROM_TOP_OF_SCREEN -
        FINGER_VERTICAL_GAP -
        halfFingerHeight
    );

    upperFinger.x = isFirstFinger
      ? FIRST_FINGER_POSITION_X
      : rightFingerX + FINGER_HORIZONTAL_DISTANCE;
    upperFinger.y = fingerVerticalPosition;

    lowerFinger.x = upperFinger.x;
    lowerFinger.y = upperFinger.y + FINGER_VERTICAL_GAP + halfFingerHeight;
  }

  getMostRightFingerX() {
    let mostRightX = 0;

    this.fingers.getChildren().forEach((finger) => {
      mostRightX = Math.max(mostRightX, finger.x);
    });

    return mostRightX;
  }

  recycleFingers() {
    const fingersToRecycle = [];

    this.fingers.getChildren().forEach((finger) => {
      if (finger.getBounds().right <= 0) {
        fingersToRecycle.push(finger);

        if (fingersToRecycle.length === 2) {
          this.placeFinger(...fingersToRecycle);
          this.increaseScore();
        }
      }
    });
  }

  gameOver() {
    this.isGameOver = true;
    this.physics.pause();
    this.horse.setTint(0xff0000);
    this.scoreText.destroy();
    this.scene.launch("GameOverScene", { score: this.score });
  }

  gameOverIfHorseOutOfScreen() {
    const horseBounds = this.horse.getBounds();
    if (horseBounds.top <= 0 || horseBounds.bottom >= SCREEN_HEIGHT) {
      this.gameOver();
    }
  }

  jump() {
    if (this.isGameOver) return;

    if (!this.isGameStarted) {
      this.physics.resume();
      this.isGameStarted = true;
    }

    this.horse.jump();
  }

  increaseScore() {
    this.score++;
    this.scoreText.setText(this.score);
  }
}

export default GameScene;
