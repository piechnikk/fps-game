import { PerspectiveCamera, Vector3 } from 'three';

let x = 0

export default class Camera {
    constructor(renderer, player, control) {
        this.renderer = renderer
        this.control = control
        this.topView = true
        const width = this.renderer.domElement.width;
        const height = this.renderer.domElement.height;

        this.center = new Vector3(0, 1, 0)
        this.player = player.mesh

        this.threeCamera = new PerspectiveCamera(75, width / height, 0.1, 10000);
        this.threeCamera.position.set(175, 10, 250);
        this.threeCamera.lookAt(this.player.position)

        this.updateSize();

        window.addEventListener('resize', () => this.updateSize(), false);
    }

    updateSize() {
        this.threeCamera.aspect = this.renderer.domElement.width / this.renderer.domElement.height;
        this.threeCamera.updateProjectionMatrix();
    }
    updateHeight(value) {
        this.control(false)
        this.threeCamera.position.y = value;
        this.threeCamera.lookAt(this.player.position)
    }
    updateXAngle(value) {
        this.control(false)
        let val = value - 50
        const camVect = new Vector3(0, 0, val)
        const camDes = camVect.applyMatrix4(this.player.matrixWorld);
        this.threeCamera.lookAt(camDes)
    }
    updateYAngle(value) {
        this.control(false)
        let val = value - 50
        const camVect = new Vector3(0, val, 0)
        const camDes = camVect.applyMatrix4(this.player.matrixWorld);
        this.threeCamera.lookAt(camDes)
    }
    updateDistanceFromPlayer() {
        this.control(false)
        this.threeCamera.aspect = this.renderer.domElement.width / this.renderer.domElement.height;
        this.threeCamera.updateProjectionMatrix();
    }
    updateFov(value) {
        this.threeCamera.fov = value;
        this.threeCamera.updateProjectionMatrix();
    }
    changeTopView(value) {
        if (value) {
            this.control(false)
            this.topView = false
            this.threeCamera.position.set(0, 1000, 0);
            this.threeCamera.lookAt(this.center)
        } else {
            this.control(true)
            this.topView = true
            this.threeCamera.position.set(175, 10, 250);
            this.threeCamera.lookAt(this.player.position)
        }
    }
    changePlayerView(value) {
        if (value) {
            x = setInterval(() => { this.threeCamera.lookAt(this.player.position) }, 1)
        } else {
            clearInterval(x)
            this.threeCamera.lookAt(this.center)
        }
    }

}