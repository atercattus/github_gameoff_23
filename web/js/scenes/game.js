class SceneGame {
    /** @type GameApp */
    app;

    constructor(app){
        this.app = app;
    }

    show() {
        this.app.app.ticker.add(this.update, this);
    }

    update() {
        const wh = this.app.WH();
        this.app.SetDebugText(`${wh[0]}x${wh[1]}`);

        // if (++this.i >= 10) {
        //     this.app.app.ticker.remove(this.update, this);
        // }
    }

    hide() {
    }
}
