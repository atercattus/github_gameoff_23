class SceneGame {
    /** @type GameApp */
    app;

    /** @type PIXI.Container */
    world;

    /** @type Player */
    player;

    constructor(app) {
        this.app = app;

        this.world = new PIXI.Container();
        this.app.app.stage.addChild(this.world);

        this.player = new Player(this.world, this.app);
        const wh = this.app.WH();

        this.world.x = wh.w / 2;
        this.world.y = wh.h / 2;

        //this.player.moveTo(20, 20);
    }

    show() {
        this.app.app.ticker.add(this.update, this);
    }

    update() {
        const wh = this.app.WH();
        this.app.SetDebugText(`${wh.w}x${wh.h}`);

        // if (++this.i >= 10) {
        //     this.app.app.ticker.remove(this.update, this);
        // }
    }

    hide() {
    }
}
