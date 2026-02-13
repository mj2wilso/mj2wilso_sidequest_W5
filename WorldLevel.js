class WorldLevel {
  constructor(json) {
    this.schemaVersion = json.schemaVersion ?? 1;

    this.w = json.world?.w ?? 2400;
    this.h = json.world?.h ?? 1600;
    this.bg = json.world?.bg ?? [255, 190, 173];
    this.gridStep = json.world?.gridStep ?? 160;

    this.obstacles = [];

    let attempts = 0;
    let maxObstacles = 50;
    let maxAttempts = 5000; // prevents infinite loop

    while (this.obstacles.length < maxObstacles && attempts < maxAttempts) {
      attempts++;

      let newRect = {
        x: random(0, this.w - 120),
        y: random(0, this.h - 120),
        w: random(40, 120),
        h: random(40, 120),
        r: 10,
      };

      let overlapping = false;

      for (let o of this.obstacles) {
        if (
          newRect.x < o.x + o.w &&
          newRect.x + newRect.w > o.x &&
          newRect.y < o.y + o.h &&
          newRect.y + newRect.h > o.y
        ) {
          overlapping = true;
          break;
        }
      }

      if (!overlapping) {
        this.obstacles.push(newRect);
      }
    }

    this.camLerp = json.camera?.lerp ?? 0.12;
  }

  drawBackground() {
    background(191, 239, 255);
  }

  drawWorld() {
    noStroke();

    let mid = this.h / 2;

    // Top half (original background)
    fill(this.bg[0], this.bg[1], this.bg[2]);
    rect(0, 0, this.w, mid);

    // Bottom half (light yellow)
    fill(255, 255, 204); // light yellow
    rect(0, mid, this.w, mid);

    // Grid
    stroke(245);
    for (let x = 0; x <= this.w; x += this.gridStep) line(x, 0, x, this.h);
    for (let y = 0; y <= this.h; y += this.gridStep) line(0, y, this.w, y);

    noStroke();

    // Draw obstacles (we’ll modify next)
    for (const o of this.obstacles) {
      if (o.y > mid) {
        fill(255, 204, 0); // yellow for bottom half obstacles
      } else {
        fill(178, 34, 34); // red for top half
      }

      rect(o.x, o.y, o.w, o.h, o.r ?? 0);
    }
  }

  drawHUD(player, camX, camY) {
    noStroke();
    fill(20);
    text("Example 4 — JSON world + smooth camera (lerp).", 12, 20);
    text(
      "camLerp(JSON): " +
        this.camLerp +
        "  Player: " +
        (player.x | 0) +
        "," +
        (player.y | 0) +
        "  Cam: " +
        (camX | 0) +
        "," +
        (camY | 0),
      12,
      40,
    );
  }
}
