class Direction {
    static right = new Direction(1, 0);
    static rightUp = new Direction(1, -1);
    static up = new Direction(0, -1);
    static upLeft = new Direction(-1, -1);
    static left = new Direction(-1, 0);
    static leftDown = new Direction(-1, 1);
    static down = new Direction(0, 1);
    static downRight = new Direction(1, 1);
    static list = [this.right, this.rightUp, this.up, this.upLeft, this.left, this.leftDown, this.down, this.downRight];
    x; y;
    constructor(x, y) {
        this.x = x; this.y = y;
    }
    get isDiagonal() {
        return this.x != 0 && this.y != 0;
    }
}