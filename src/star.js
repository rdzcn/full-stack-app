class Star {
  constructor(x = 100, y = 100, z = 100, randomColor) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._randomColor = randomColor;

    this._lastZ = z + 1;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get z() {
    return this._z;
  }

  update() {
    this._lastZ = this._z;
    this._z -= 30;
  }

  needsReset() {
    if (this._z <= 0) {
      return true;
    }

    return false;
  }

  reset(x, y, z) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._lastZ = z + 1;
  }

  draw(canvas) {
    let lastCoordX = (this._x / this._lastZ) * canvas.width;
    let lastCoordY = (this._y / this._lastZ) * canvas.height;

    let coordX = (this._x / this._z) * canvas.width;
    let coordY = (this._y / this._z) * canvas.height;

    canvas.context.lineWidth = 2;
    canvas.context.fillStyle = this._randomColor;
    canvas.context.strokeStyle = this._randomColor;
    canvas.context.beginPath();
    canvas.context.moveTo(lastCoordX, lastCoordY);
    canvas.context.lineTo(coordX, coordY);
    canvas.context.stroke();

    canvas.context.fillRect(coordX, coordY, 1, 1);
  }
}

export default Star;
