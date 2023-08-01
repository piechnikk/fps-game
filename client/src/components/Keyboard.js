import Config from "./Config";

const KEYS = {
    "left": 65,
    "up": 87,
    "right": 68,
    "down": 83,
    "space": 32
};

export default class Keyboard {
    constructor(domElement, animation, modelMesh, control) {
        this.control = control
        this.domElement = domElement;
        this.animation = animation
        this.modelMesh = modelMesh

        // events
        this.domElement.addEventListener('keydown', event => this.onKeyDown(event), false);
        this.domElement.addEventListener('keyup', event => this.onKeyUp(event), false);


    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case KEYS.up:
                this.animation.playAnim("stand")
                Config.moveForward = false;
                break;
            case KEYS.left:
                Config.rotateLeft = false;
                break;
            case KEYS.right:
                Config.rotateRight = false;
                break;
            case KEYS.down:
                this.animation.playAnim("stand")
                Config.moveBackward = false;
                break;
            case KEYS.space:
                if (this.animation.animName == "attack")
                    this.animation.playAnim("stand")
                Config.attack = false;
                break;


        }
        // console.log('onKeyChange', event.keyCode)
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case KEYS.up:
                this.control(true)
                if (this.animation.animName != "run") {
                    this.animation.playAnim("run")
                    Config.moveForward = true;
                }
                break;
            case KEYS.left:
                this.control(true)
                Config.rotateLeft = true;
                break;
            case KEYS.right:
                this.control(true)
                Config.rotateRight = true;
                break;
            case KEYS.down:
                this.control(true)
                if (this.animation.animName != "run") {
                    this.animation.playAnim("run")
                    Config.moveBackward = true;
                }
                break;
            case KEYS.space:
                this.control(true)
                if (this.animation.animName == "stand") {
                    this.animation.playAnim("attack")
                }
                Config.attack = true;
                break;
        }

    }


}