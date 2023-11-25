class SceneMain {
    /** @type GameApp */
    app;

    constructor(app){
        this.app = app;
    }

    show() {
        this.app.Goto(SceneGame);
    }

    hide() {
    }
}
