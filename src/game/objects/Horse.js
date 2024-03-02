import { GRAVITY, HORSE_INITIAL_POSITION, JUMP_VELOCITY } from "../constants";

class Horse extends Phaser.GameObjects.Sprite {
  constructor(params) {
    super(
      params.scene,
      HORSE_INITIAL_POSITION.x,
      HORSE_INITIAL_POSITION.y,
      "horse",
      params.frame
    );

    // sprite
    this.setScale(3);
    this.setOrigin(0, 0.5);

    // physics
    this.scene.physics.world.enable(this);
    this.body.setGravityY(GRAVITY);
    this.body.setSize(this.width - 4, this.height - 6);
    this.body.setCollideWorldBounds(true);

    this.scene.add.existing(this);
  }

  handleAngle() {
    if (this.angle < 10) {
      this.angle += 2;
      this.body.setOffset(4, this.angle * 0.3);
    }
  }

  restartPosition() {
    this.x = HORSE_INITIAL_POSITION.x;
    this.y = HORSE_INITIAL_POSITION.y;
    this.body.setVelocity(0);
  }

  jump() {
    this.body.velocity.y = JUMP_VELOCITY;
    this.scene.tweens.add({
      targets: this,
      angle: -20,
      duration: 300,
      ease: "Power0",
      yoyo: true,
    });
  }
}

export default Horse;
