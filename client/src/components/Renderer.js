import { WebGLRenderer } from 'three';

export default class Renderer extends WebGLRenderer {
    constructor(container) {
        super({ antialias: true })

        this.container = container

        this.container.appendChild(this.domElement);

        // resize
        this.updateSize();
        document.addEventListener('DOMContentLoaded', () => this.updateSize(), false);
        window.addEventListener('resize', () => this.updateSize(), false);
    }

    updateSize() {
        this.setSize(window.innerWidth, window.innerHeight);
    }
}

// import { WebGLRenderer, PCFSoftShadowMap } from 'three';

// export default class Renderer {
//     constructor(scene, container) {

//         this.scene = scene;
//         this.container = container;
//         this.threeRenderer = new WebGLRenderer({ antialias: true });
//         this.threeRenderer.setClearColor(0x6699ff);
//         this.threeRenderer.shadowMap.type = PCFSoftShadowMap;

//         this.container.appendChild(this.threeRenderer.domElement);
//         this.updateSize();

//         document.addEventListener('DOMContentLoaded', () => this.updateSize(), false);
//         window.addEventListener('resize', () => this.updateSize(), false);
//     }

//     updateSize() {
//         this.threeRenderer.setSize(window.innerWidth, window.innerHeight);
//     }

//     render(scene, camera) {
//         this.threeRenderer.render(scene, camera);
//     }
// }