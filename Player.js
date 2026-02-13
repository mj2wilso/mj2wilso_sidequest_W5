class Player {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;

    this.color = [102, 20, 0]; // default top-half color

    this.baseSpeed = speed ?? 3;
    this.s = this.baseSpeed; // keep original movement variable
  }

  updateInput(level) {
    const dx =
      (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) -
      (keyIsDown(LEFT_ARROW) || keyIsDown(65));

    const dy =
      (keyIsDown(DOWN_ARROW) || keyIsDown(83)) -
      (keyIsDown(UP_ARROW) || keyIsDown(87));

    const mid = level.h / 2;

    if (this.y > mid) {
      this.s = this.baseSpeed * 0.5;
    } else {
      this.s = this.baseSpeed;
    }

    if (this.y > mid) {
      this.s = this.baseSpeed * 0.3; // slow down
      this.color = [204, 153, 0]; // dark yellow in bottom half
    } else {
      this.s = this.baseSpeed; // normal speed
      this.color = [102, 20, 0]; // original color
    }

    const len = max(1, abs(dx) + abs(dy));
    this.x += (dx / len) * this.s;
    this.y += (dy / len) * this.s;
  }

  draw() {
    player.updateInput(level);
    fill(this.color);
    noStroke();
    rect(this.x - 12, this.y - 12, 24, 24, 5);
  }
}
