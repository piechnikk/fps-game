import { MD2Loader } from './MD2Loader';
import { Mesh, TextureLoader, MeshPhongMaterial, Object3D, Vector3, BufferGeometry, PointsMaterial, AdditiveBlending, BufferAttribute, Points } from "three"
import enemyTex from "./assets/smiley.png"
import fireTex from "./assets/fire.png"

let size = 200
export default class Model {
    constructor(scene, manager, x, z, player) {
        this.scene = scene;
        this.mesh = null;
        this.manager = manager;
        this.geometry = null
        this.animation = "stand"
        this.x = x * size - (4.5 * size)
        this.z = z * size - (4.5 * size)
        this.player = player
        this.attack = false
    }

    load(path) {

        // Manager is passed in to loader to determine when loading done in main
        // Load model with FBXLoader

        new MD2Loader(this.manager).load(
            path,
            geometry => {

                this.geometry = geometry;
                this.box = new Object3D()
                this.mesh = new Mesh(geometry, new MeshPhongMaterial({
                    map: new TextureLoader().load(enemyTex), // dowolny plik png, jpg
                    morphTargets: true // animowanie materiału modelu
                }))
                this.box.position.set(this.x, 25, this.z)
                this.mesh.castShadow = true
                this.mesh.rotation.y -= 0.5 * Math.PI
                this.box.add(this.mesh)


                this.particlesCount = 10
                this.particlesGeometry = new BufferGeometry()
                this.verticesArray = new Float32Array(this.particlesCount * 3)
                this.pointMaterial = new PointsMaterial({
                    color: 0xff3300,
                    depthWrite: false,
                    transparent: true,
                    size: 5,
                    map: new TextureLoader().load(fireTex),
                    blending: AdditiveBlending
                })
                const v1 = this.box.position.clone()
                const v2 = this.player.mesh.position.clone()
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
                this.scene.add(mesh)


                this.scene.add(this.box);
                // console.log("enemy", this.geometry.animations) // tu powinny być widoczne animacje
                this.attackAnim = false
            },

        );

    }
    update() {
        if (!this.attackAnim) {
            this.attackAnim = true
            let i = 0

            let positions = this.particlesGeometry.attributes.position.array

            const v1 = this.box.position.clone()
            const v2 = this.player.mesh.position.clone()
            const subV = v2.clone().sub(v1.clone())
            const stepV = subV.divideScalar(this.particlesCount)
            v1.add(stepV.multiplyScalar(i))
            for (let j = 0; j < positions.length; j += 3) {
                positions[j] = v1.x + (Math.random() * i) - i / 2
                positions[j + 1] = v1.y + (Math.random() * i) - i / 2
                positions[j + 2] = v1.z + (Math.random() * i) - i / 2

            }
            this.particlesGeometry.attributes.position.needsUpdate = true
            i++
            let interval = setInterval(() => {
                let positions = this.particlesGeometry.attributes.position.array

                const v1 = this.box.position.clone()
                const v2 = this.player.mesh.position.clone()
                const subV = v2.clone().sub(v1.clone())
                const stepV = subV.divideScalar(this.particlesCount)
                v1.add(stepV.multiplyScalar(i))
                for (let j = 0; j < positions.length; j += 3) {
                    positions[j] = v1.x + (Math.random() * i * 2) - i
                    positions[j + 1] = v1.y + (Math.random() * i * 2) - i
                    positions[j + 2] = v1.z + (Math.random() * i * 2) - i

                }
                // positions[i] = v1.add(stepV.multiplyScalar(i / 3)).x + (Math.random() * i) - i / 2
                // positions[i + 1] = v1.y + (Math.random() * i) - i / 2
                // positions[i + 2] = v1.z + (Math.random() * i) - i / 2


                this.particlesGeometry.attributes.position.needsUpdate = true
                i++
                if (i == this.particlesCount) {
                    clearInterval(interval)
                    this.attackAnim = false
                }
            }, 50)
        }

    }

    unload() {
        this.scene.remove(this.mesh); // ew funkcja do usunięcia modelu ze sceny
    }
}