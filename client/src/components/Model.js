import { MD2Loader } from './MD2Loader';
import { Mesh, TextureLoader, MeshPhongMaterial, AxesHelper, Vector3, BufferGeometry, PointsMaterial, AdditiveBlending, BufferAttribute, Points } from "three"
import playerTex from "./assets/sydney.png"
import fireTex from "./assets/fire.png"

export default class Model {
    constructor(scene, manager) {
        this.scene = scene;
        this.mesh = null;
        this.manager = manager;
        this.geometry = null
    }

    load(path) {

        // Manager is passed in to loader to determine when loading done in main
        // Load model with FBXLoader
        // console.log("model load", this.manager);
        new MD2Loader(this.manager).load(
            path,
            geometry => {

                this.geometry = geometry;

                this.mesh = new Mesh(geometry, new MeshPhongMaterial({
                    map: new TextureLoader().load(playerTex), // dowolny plik png, jpg
                    morphTargets: true // animowanie materiału modelu
                }))
                this.mesh.castShadow = true

                this.particlesCount = 20
                this.particlesGeometry = new BufferGeometry()
                this.verticesArray = new Float32Array(this.particlesCount * 3)
                this.pointMaterial = new PointsMaterial({
                    color: 0x0033ff,
                    depthWrite: false,
                    transparent: true,
                    size: 5,
                    map: new TextureLoader().load(fireTex),
                    blending: AdditiveBlending
                })
                const v1 = this.mesh.position.clone()
                const v2 = v1.clone().add(new Vector3(200, 0, 0))
                this.v1 = v1.clone()
                this.v2 = v2.clone()
                const subV = v2.clone().sub(v1.clone())
                const stepV = subV.divideScalar(this.particlesCount)
                for (let i = 0; i < this.particlesCount * 3; i += 3) {
                    this.verticesArray[i] = v1.add(stepV).x
                    this.verticesArray[i + 1] = v1.y
                    this.verticesArray[i + 2] = v1.z

                }
                this.particlesGeometry.setAttribute("position", new BufferAttribute(this.verticesArray, 3))
                const mesh = new Points(this.particlesGeometry, this.pointMaterial)
                this.mesh.add(mesh)

                let size = 200
                this.mesh.position.set(8 * size - (4.5 * size), 25, 9 * size - (4.5 * size))
                this.scene.add(this.mesh);

                // console.log("model", this.geometry.animations) // tu powinny być widoczne animacje

            },

        );

    }
    update(rozrzut) {
        let positions = this.particlesGeometry.attributes.position.array

        const v1 = this.v1.clone()
        const v2 = this.v2.clone()

        const subV = v2.clone().sub(v1.clone())
        const stepV = subV.divideScalar(this.particlesCount) // particlesCount - przewidywana ilość cząsteczek na linii a-b
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] = v1.add(stepV).x + (Math.random() * rozrzut) - rozrzut / 2
            positions[i + 1] = v1.y + (Math.random() * rozrzut) - rozrzut / 2
            positions[i + 2] = v1.z + (Math.random() * rozrzut) - rozrzut / 2

        }

        this.particlesGeometry.attributes.position.needsUpdate = true
    }
    unload() {
        this.scene.remove(this.mesh); // ew funkcja do usunięcia modelu ze sceny
    }
}