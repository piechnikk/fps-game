import { Object3D, SpriteMaterial, TextureLoader, AdditiveBlending, PointLight } from "three"
import fireTex from "./assets/fire.png"
import Particle from "./Particle"

export default class Fireplace extends Object3D {

    constructor() {
        super()
        //tablica na cząsteczki
        this.particles = []
        // przewidywana ilość cząsteczek
        this.count = 100
        // materiał cząsteczki, rzecz najważniejsza
        // jego właściwość blending decyduje o tym, że cząsteczki mieszają się
        // ze sobą

        this.particleMaterial = new SpriteMaterial({
            color: 0xff3300,
            map: new TextureLoader().load(fireTex),
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
            blending: AdditiveBlending
        });
        // dodajemy światło, aby ognisko emitowało oświetlenie na scenie
        this.light = new PointLight(0xff6633, 2)
        this.light.position.y = 5
        this.light.castShadow = false
        this.add(this.light)
        this.init()
    }

    init() {

        // w pętli tworzymy odpowiednią ilość cząsteczek klasy Particle
        // dodajemy do this (kontener3D) i tablicy
        for (let i = 0; i < this.count; i++) {
            var particle = new Particle(this.particleMaterial)
            this.add(particle)
            this.particles.push(particle);
        }
    }

    update() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update()
        }
    }

    changeSize(value) {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].changeSize(value)
        }
    }

    changeWidthX(value) {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].changeWidth("x", value)
        }
    }

    changeWidthZ(value) {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].changeWidth("z", value)
        }
    }
}