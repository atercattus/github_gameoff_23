class Input {
    mapping = {};

    keyState = {};

    mousePos = new PIXI.Point(0, 0);

    mouseLeft = 0;
    mouseMiddle = 1;
    mouseRight = 2;

    static MouseLeft = "MouseLeft";
    static MouseMiddle = "MouseMiddle"; // or wheel
    static MouseRight = "MouseRight";

    // Common key codes

    static ArrowUp = "ArrowUp";
    static ArrowDown = "ArrowDown";
    static ArrowLeft = "ArrowLeft";
    static ArrowRight = "ArrowRight";

    static KeyW = "KeyW";
    static KeyS = "KeyS";
    static KeyA = "KeyA";
    static KeyD = "KeyD";

    constructor() {
        this.listenKeyboard();
        this.listenMouse();
        // ToDo: navigator.getGamepads
    }

    // keyName: left, activate, jump, ...
    // keyCode: ArrowLeft, KeyE, Space, ...
    MapKey(keyName, keyCode) {
        if (!this.mapping[keyName]) {
            this.mapping[keyName] = [];
        }

        const m = this.mapping[keyName];
        for (let i = 0; i < m.length; i++) {
            if (m[i] === keyCode) {
                return;
            }
        }

        m.push(keyCode);
        this.mapping[keyName] = m;
    }

    IsPressed(keyName) {
        const m = this.mapping[keyName];
        if (!m) {
            return false;
        }

        for (let i = 0; i < m.length; i++) {
            const keyName = m[i];
            if (this.keyState[keyName]) {
                return true;
            }
        }

        return false;
    }

    MousePos() {
        return this.mousePos;
    }

    listenKeyboard() {
        document.addEventListener('keydown', (ev) => {
            this.keyState[ev.code] = true;
            ev.preventDefault();
        });

        document.addEventListener('keyup', (ev) => {
            this.keyState[ev.code] = false;
            ev.preventDefault();
        });
    }

    listenMouse() {
        document.addEventListener('mousemove', (ev) => {
            this.mousePos.x = ev.clientX;
            this.mousePos.y = ev.clientY;

            ev.preventDefault();
        });

        document.addEventListener('mousedown', (ev) => {
            const code = this.mouseButtonToKeyCode(ev.button);
            if (code !== "") {
                this.keyState[code] = true;
            }
            ev.preventDefault();
        });

        document.addEventListener('mouseup', (ev) => {
            const code = this.mouseButtonToKeyCode(ev.button);
            if (code !== "") {
                this.keyState[code] = false;
            }
            ev.preventDefault();
        });
    }

    mouseButtonToKeyCode(button) {
        switch (button) {
            case this.mouseLeft:
                return Input.MouseLeft
            case this.mouseMiddle:
                return Input.MouseMiddle
            case this.mouseRight:
                return Input.MouseRight
            default:
                return ""
        }
    }
}
