class GameApp {
    /** @type Application */
    app;

    inputs = new Input();

    /** @type HTMLDivElement */
    debugDiv;

    updateSubscribers = {};

    scenes = {};
    activeScene = "";

    constructor() {
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            antialias: true,
            resolution: (window.devicePixelRatio || 1),
            resizeTo: window,
        });
        document.body.appendChild(this.app.view);
        this.app.renderer.backgroundColor = 0x444444;

        //PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        this.app.renderer.view.style.position = 'absolute';
        this.app.renderer.view.style.display = 'block';

        this.initDebugText();

        this.app.ticker.add(() => {
            this.sendUpdateEvent();
        });
    }

    initDebugText() {
        const div = document.createElement('div');
        document.body.appendChild(div);
        div.style.zIndex = "100";
        div.style.position = "absolute";
        div.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        div.style.color = "white";

        this.debugDiv = div;
    }

    WH() {
        const s = this.app.screen;
        return {w: s.width, h: s.height};
    }

    SetDebugText(text) {
        this.debugDiv.innerHTML = text;
    }

    Goto(sceneName) {
        if (typeof sceneName === "function") {
            sceneName = sceneName.name.replace(/^Scene/g, '').toLowerCase();
        }

        if (sceneName === this.activeScene) {
            return; // or allow for restart?
        }

        let scene = this.scenes[sceneName];
        if (!scene) {
            const className = "Scene" + sceneName.replace(
                /\w\S*/g,
                function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
                }
            );
            scene = new (eval(className))(this);
            this.scenes[sceneName] = scene;
        }

        if (this.activeScene !== "") {
            this.scenes[this.activeScene].hide();
        }
        this.activeScene = sceneName;

        scene.show();
    }

    SubscribeForUpdate(cb) {
        this.updateSubscribers[cb] = cb;
    }

    UnsubscribeForUpdate(cb) {
        delete this.updateSubscribers[cb];
    }

    sendUpdateEvent() {
        const delta = this.app.ticker.elapsedMS / 1000;

        for (let key in this.updateSubscribers) {
            if (!this.updateSubscribers.hasOwnProperty(key)) {
                continue;
            }
            //console.log(key, typeof this.updateSubscribers[key]);
            this.updateSubscribers[key](delta);
        }
    }
}
