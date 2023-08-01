import * as THREE from "three";
import stoneTex from "./mats/stone.jpg"
import brickTex from "./mats/brick.jpg"
import Fireplace from "./Fireplace"
import cointexture from "./mats/cointexture_1.png"

let size = 200

export default class Board {

    constructor(scene, json) {
        this.scene = scene;
        this.floor = {}
        this.ceil = {}
        this.walls = []
        this.lights = []
        this.createFloor()
        this.createCeil()
        for (let i = 0; i < json.length; i++) {
            this.createBoardElement(json[i])
        }
    }
    changeLightPower(value) {
        for (let i = 0; i < this.lights.length; i++) {
            this.lights[i].light.intensity = value
        }
    }
    updateFireplaces() {
        for (var i = 0; i < this.lights.length; i++) {
            this.lights[i].update()
        }
    }
    changeFireSize(value) {
        for (var i = 0; i < this.lights.length; i++) {
            this.lights[i].changeSize(value)
        }
    }
    changeFireWidthX(value) {
        for (var i = 0; i < this.lights.length; i++) {
            this.lights[i].changeWidthX(value)
        }
    }
    changeFireWidthZ(value) {
        for (var i = 0; i < this.lights.length; i++) {
            this.lights[i].changeWidthZ(value)
        }
    }


    createFloor() {
        this.floor.geometry = new THREE.PlaneGeometry(size * 20, size * 20);
        let texture = new THREE.TextureLoader().load(stoneTex)
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(20, 20);
        this.floor.material = new THREE.MeshPhongMaterial({
            shininess: 0,
            side: THREE.DoubleSide,
            map: texture,
        });
        this.floor.mesh = new THREE.Mesh(this.floor.geometry, this.floor.material);
        this.floor.mesh.rotation.x = 1.5 * Math.PI
        this.floor.mesh.receiveShadow = true
        this.scene.add(this.floor.mesh)
    }
    createCeil() {
        this.ceil.geometry = new THREE.PlaneGeometry(size * 20, size * 20);
        let texture = new THREE.TextureLoader().load(stoneTex)
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(20, 20);
        this.ceil.material = new THREE.MeshPhongMaterial({
            shininess: 0,
            // side: THREE.DoubleSide,
            map: texture,
        });
        this.ceil.mesh = new THREE.Mesh(this.ceil.geometry, this.ceil.material);
        this.ceil.mesh.rotation.x = 0.5 * Math.PI
        this.ceil.mesh.receiveShadow = true
        this.ceil.mesh.position.y = 200
        this.scene.add(this.ceil.mesh)
    }
    createBoardElement(el) {
        if (el.type == "wall") {
            let wall = {}
            wall.geometry = new THREE.BoxGeometry(size, size, size)
            wall.material = new THREE.MeshPhongMaterial({
                shininess: 0,
                map: new THREE.TextureLoader().load(brickTex),
            });
            wall.mesh = new THREE.Mesh(wall.geometry, wall.material);
            wall.mesh.position.set(el.x * size - (4.5 * size), size / 2, el.z * size - (4.5 * size))
            wall.mesh.castShadow = true
            wall.mesh.receiveShadow = true
            this.walls.push(wall.mesh)
            this.scene.add(wall.mesh)
        } else if (el.type == "light") {
            let fire = new Fireplace()
            fire.position.set(el.x * size - (4.5 * size), 1, el.z * size - (4.5 * size))
            this.lights.push(fire)
            this.scene.add(fire)

            // let light = {}

            // light.container = new THREE.Object3D()

            // light.light = new THREE.PointLight(0xffffff, 0.2);
            // light.light.castShadow = false
            // light.container.add(light.light)

            // light.geometry = new THREE.SphereGeometry();
            // light.material = new THREE.MeshBasicMaterial({
            //     color: 0xffff00,
            // });
            // light.mesh = new THREE.Mesh(light.geometry, light.material);
            // light.container.add(light.mesh)

            // light.container.position.set(el.x * size - (4.5 * size), size / 2, el.z * size - (4.5 * size))
            // this.lights.push(light)
            // this.scene.add(light.container)
        } else if (el.type == "treasure") {
            var geometry = new THREE.CylinderGeometry(18, 18, 5, 24);
            var material = new THREE.MeshPhongMaterial({
                color: "0xffffff",
                shininess: 20,
                side: THREE.DoubleSide,
                map: new THREE.TextureLoader().load(cointexture),
            })

            this.meshcoin = new THREE.Mesh(geometry, material);
            this.meshcoin.position.set(el.x * size - (4.5 * size), 20, el.z * size - (4.5 * size))
            this.meshcoin.rotation.x += 0.5 * Math.PI
            this.scene.add(this.meshcoin);
        }
    }
}
