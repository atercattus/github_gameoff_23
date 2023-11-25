class GameObject {
    /** @type PIXI.Point */
    pos;

    angle = 0;

    constructor() {
        this.pos = new PIXI.Point(0, 0);
    }

    moveTo(x, y) {
        this.pos.x = x;
        this.pos.y = y;

        this.onUpdatePosOrAngle();
    }

    moveBy(dx, dy) {
        this.moveTo(
            this.pos.x + dx,
            this.pos.y + dy,
        );
    }

    rotateTo(a) {
        this.angle = a;

        this.onUpdatePosOrAngle();
    }

    rotateBy(da) {
        let angle = this.angle + da;

        while (angle >= 360) {
            angle -= 360;
        }
        while (angle <= -360) {
            angle += 360;
        }

        this.rotateTo(angle);
    }

    onUpdatePosOrAngle() {
    }
}
