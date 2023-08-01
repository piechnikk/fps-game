import { Scene, LoadingManager, Clock, Vector3 } from 'three';
import Renderer from './Renderer';
import Camera from './Camera';
import Board from './Board';
import GUI from './GUI';
import Model from "./Model";
import Keyboard from "./Keyboard";
import Animation from "./Animation";
import Config from './Config';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import playerMD2 from "./assets/sydney.md2"
import Enemy from "./Enemy";
import enemyMD2 from "./assets/smiley.md2"
import Collider from "./Collider";

console.warn = () => { }; //usuwanie warnów z konsoli

export default class Main {
    constructor(container, json) {
        // właściwości klasy
        this.enemies = []
        this.enemiesManager = []
        this.enemiesAnims = []
        this.controls = true
        this.container = container;
        this.scene = new Scene();
        this.camVect = { x: -100, y: 50, z: 0 }

        this.isLoaded = null
        this.animation = null

        //stats - statystyki wydajności
        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb
        document.body.appendChild(this.stats.dom);
        // zegar - vide lekcja 4
        this.clock = new Clock()
        // manager loadingu, pozwala monitorować progress oraz fakt zakończenia ładowania
        this.manager = new LoadingManager();

        // model
        this.model = new Model(this.scene, this.manager);
        this.model.load(playerMD2);

        //tworzenie przeciwników
        for (let i = 0; i < json.length; i++) {
            if (json[i].type == "enemy") {
                this.enemiesManager.push(new LoadingManager())
                this.enemies.push(new Enemy(this.scene, this.enemiesManager[this.enemiesManager.length - 1], json[i].x, json[i].z, this.model))
            }
        }
        // console.log(this.enemiesManager.length);
        for (let i = 0; i < this.enemiesManager.length; i++) {
            this.enemiesManager[i].onLoad = () => {
                this.enemiesAnims.push(new Animation(this.enemies[i].mesh))
                this.enemiesAnims[i].playAnim("stand")
                if (i == this.enemiesManager.length - 1) {
                    this.loaded();
                }
            }
            setTimeout(() => {
                this.enemies[i].load(enemyMD2)
                console.log(i + 1);
            }, 1000 * (i + 1))
        }

        this.manager.onLoad = () => {
            this.renderer = new Renderer(container);
            this.camera = new Camera(this.renderer, this.model, (value) => { this.changeControls(value) });
            this.board = new Board(this.scene, json);
            this.gui = new GUI(this.camera, this.board, this.renderer, this.model, (what, value) => { this.changeCamVect(what, value) });
            this.collider = new Collider()


            this.isLoaded = true;
            //
            console.log("MODEL LOADED!!!")
            this.animation = new Animation(this.model.mesh)
            this.animation.playAnim("stand")

            //kawiatura
            this.keyboard = new Keyboard(window, this.animation, this.model.mesh, (value) => { this.changeControls(value) });

            //zapisanie wyniku do bazy danych
            document.getElementById("saveScore").addEventListener("click", () => {
                console.log("tutaaaaj: ", JSON.stringify(Config.points));
                fetch("/save", { method: "post", body: JSON.stringify(Config.points) })
            })

            this.render();
        };

    }
    render() {
        this.renderer.render(this.scene, this.camera.threeCamera);
        this.board.meshcoin.rotation.z += 0.05
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].box != null) {
                this.enemies[i].box.lookAt(this.model.mesh.position)
                // this.enemies[i].mesh.rotation.y += 1.5 * Math.PI
                this.collider.isEnemy(this.model.mesh, this.enemies[i], this.enemiesAnims[i])
            }
        }

        this.board.updateFireplaces()
        // this.player.update() // obrót player
        if (this.controls && this.camera.topView) {
            const camVect = new Vector3(this.camVect.x, this.camVect.y, this.camVect.z)

            const camPos = camVect.applyMatrix4(this.model.mesh.matrixWorld);
            this.camera.threeCamera.position.x = camPos.x
            this.camera.threeCamera.position.y = camPos.y
            this.camera.threeCamera.position.z = camPos.z
            this.camera.threeCamera.lookAt(this.model.mesh.position)
        }

        // początek pomiaru wydajności
        this.stats.begin()
        // delta do animacji
        var delta = this.clock.getDelta();
        // wykonanie funkcji update w module Animations - zobacz do pliku Animations
        if (this.animation) this.animation.update(delta)
        for (let i = 0; i < this.enemiesAnims.length; i++) {
            this.enemiesAnims[i].update(delta)
        }
        this.renderer.render(this.scene, this.camera.threeCamera);
        // obsługa ruch modelu dopiero kiedy jest załadowany, można tą część umieścić w module Keyboard
        // tworząc w nim np funkcję update() i wywoływać ją poniżej
        if (this.model.mesh) {
            //
            if (Config.rotateLeft) {
                this.model.mesh.rotation.y += 0.05
            }
            if (Config.rotateRight) {
                this.model.mesh.rotation.y -= 0.05
            }
            if (Config.moveForward && this.collider.isWall(this.model.mesh, this.board.walls)) {
                this.model.mesh.translateX(2)
            }
            if (Config.moveBackward) {
                this.model.mesh.translateX(-2)
            }
            if (Config.attack) {
                this.model.pointMaterial.size = this.gui.laserSize
                this.model.update(this.gui.laserSpread)
            } else {
                this.model.pointMaterial.size = 0
            }
            // if (Config.attack) {
            //     for (let i = 0; i < this.enemies.length; i++) {
            //         this.enemies[i].pointMaterial.size = this.gui.laserSize
            //         this.enemies[i].update(this.gui.laserSpread)

            //     }
            // } else {
            //     this.model.pointMaterial.size = 0
            // }
        }
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].pointMaterial) {
                if (this.enemies[i].attack) {
                    this.enemies[i].pointMaterial.size = this.gui.laserSize
                    this.enemies[i].update()
                } else {
                    this.enemies[i].pointMaterial.size = 0
                }
            }
        }
        // koniec statystyk
        this.stats.end()

        requestAnimationFrame(this.render.bind(this));
    }
    loaded() {
        document.getElementById("loading").style.display = "none"
    }
    changeControls(value) {
        this.controls = value
    }
    changeCamVect(what, value) {
        if (what == "x") {
            this.camVect.x = value
        } else if (what == "y") {
            this.camVect.y = value
        } else if (what == "z") {
            this.camVect.z = value
        }
    }
}