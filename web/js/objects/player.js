class Player extends GameObject {
    /** @type GameApp */
    gameApp;

    /** @type Container */
    container;

    /** @type Graphics */
    body;

    /** @type Graphics */
    gun;

    w = 30; // width
    lw = 4; // stroke line width

    /**
     * @param parent DisplayObject
     * @param gameApp GameApp
     */
    constructor(parent, gameApp) {
        super();

        this.gameApp = gameApp;

        this.container = new PIXI.Container();
        parent.addChild(this.container);

        this.buildGun();
        this.buildBody();

        this.setupInputs();

        gameApp.SubscribeForUpdate((delta) => {
            this.update(delta);
        });
    }

    buildBody() {
        const pi = Math.PI;

        const g = new PIXI.Graphics();
        this.body = g;
        this.container.addChild(this.body);
        g.beginFill(0)
            .drawCircle(0, 0, this.w)
            .lineStyle(this.lw, 0xff0000)
            .arc(0, 0, this.w - this.lw / 2, -pi * (1 / 4), -pi * (3 / 4), true)
            .endFill()
            .lineStyle(0, 0)
            .beginFill(0xffffff)
            .drawCircle(0, 0, this.w - this.lw)
            .endFill();
    }

    buildGun() {
        const g = new PIXI.Graphics();
        this.gun = g;
        this.container.addChild(this.gun);
        const w = this.w / 2.8;
        const h = this.w * 1.3;
        g.beginFill(0)
            .drawRect(this.w - w, -h, w, h)
            .beginFill(0xffffff)
            .drawRect(this.w - w + this.lw, -h + this.lw, w - 2 * this.lw, h - 2 * this.lw)
            .endFill();
    }

    onUpdatePosOrAngle() {
        this.container.x = this.pos.x;
        this.container.y = this.pos.y;
        this.container.angle = this.angle;
    }

    setupInputs() {
        const inputs = this.gameApp.inputs;
        inputs.MapKey("rotate_left", Input.ArrowLeft);
        inputs.MapKey("rotate_right", Input.ArrowRight);
        inputs.MapKey("left", Input.KeyA);
        inputs.MapKey("right", Input.KeyD);
        inputs.MapKey("top", Input.KeyW);
        inputs.MapKey("down", Input.KeyS);

        inputs.MapKey("click", Input.MouseLeft);
    }

    update(delta) {
        let walkSpeed = 200;
        //const rotateSpeed = 400;

        const i = this.gameApp.inputs;

        const angle = utils.Angle(this.body.getGlobalPosition(), i.MousePos());
        this.rotateTo(angle);

        let moveBy = {x: 0, y: 0};

        if (i.IsPressed("left")) {
            moveBy.x = -delta;
        }
        if (i.IsPressed("right")) {
            moveBy.x = delta;
        }
        if (i.IsPressed("top")) {
            moveBy.y = -delta;
        }
        if (i.IsPressed("down")) {
            moveBy.y = delta;
        }

        if (moveBy.x !== 0 || moveBy.y !== 0) {
            const da = utils.Angle({x: 0, y: 0}, moveBy);
            let diff = angle - da;
            if (diff <= -180) {
                diff += 360;
            }

            if (Math.abs(diff) >= 120) {
                let k = Math.abs(diff) / 90.0;
                k /= 1.2;
                walkSpeed /= k;
            }

            // new input from player
            this.moveBy(moveBy.x * walkSpeed, moveBy.y * walkSpeed);
        }

        // if (i.IsPressed("rotate_left")) {
        //     this.rotateBy(-delta * rotateSpeed);
        // }
        // if (i.IsPressed("rotate_right")) {
        //     this.rotateBy(delta * rotateSpeed);
        // }

        // if (i.IsPressed("click")) {
        //     console.log(angle);
        // }
    }
}
