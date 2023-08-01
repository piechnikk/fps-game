import { Sprite, Vector3 } from "three"

export default class Particle extends Sprite {
    constructor(material) {
        super()
        this.xSize = 2
        this.zSize = 2
        this.material = material.clone()

        // skala naszego sprite
        this.scale.set(
            Math.random() * 3,
            Math.random() * 3,
            Math.random() * 3
        );

    }

    update() {
        if (this.position.y > 3) {
            this.position.x = Math.random() * this.xSize
            this.position.z = Math.random() * this.zSize
            this.position.y = 0;
            this.material.opacity = 1;
        }

        if (Math.random() > 0.4) {
            this.material.opacity -= 0.03;
            this.position.y += 0.1
        }

    }

    changeSize(value) {
        this.scale.set(
            Math.random() * value,
            Math.random() * value,
            Math.random() * value
        );
    }

    changeWidth(xy, value) {
        if (xy == "x") {
            this.xSize = value
        } else if (xy == "z") {
            this.zSize = value
        }
    }
}
