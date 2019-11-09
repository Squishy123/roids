export default class InputHandler {
    constructor(elem) {
        this.elem = elem;
        this.input = {
            keys: []
        }

        this.keyUp = this.keyUp.bind(this);
        this.keyDown = this.keyDown.bind(this);

        this.startHandler = this.startHandler.bind(this);
        this.stopHandler = this.stopHandler.bind(this);
    }

    keyDown(event) {
        this.input.keys[event.which] = true;
    }

    keyUp(event) {
        this.input.keys[event.which] = false;
    }

    startHandler() {
        this.elem.addEventListener("keydown", this.keyDown);
        this.elem.addEventListener("keyup", this.keyUp);
    }

    stopHandler() {
        this.elem.removeEventListener("keydown", this.keyDown);
        this.elem.removeEventListener("keyup", this.keyUp);        
    }

    keys() {
        return this.input.keys;
    }
 }