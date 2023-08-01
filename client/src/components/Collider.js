import { Raycaster, Ray } from 'three';
import Config from './Config';
export default class Collider extends Raycaster {
    constructor() {
        super()
    }
    isWall(playerMesh, wallsMeshes) {
        let pVect = playerMesh.getWorldDirection()
        //applyaxesmatrix
        pVect.x = playerMesh.getWorldDirection().z
        pVect.z = playerMesh.getWorldDirection().x * -1
        this.ray = new Ray(playerMesh.position, pVect)
        let intersect = this.intersectObjects(wallsMeshes)[0]
        if (intersect && intersect.distance < 20) {
            return false
        } else return true
    }
    isEnemy(playerMesh, enemy, enemyAnim) {
        let eVect = enemy.box.getWorldDirection()
        this.ray = new Ray(enemy.box.position, eVect)
        let intersect = this.intersectObjects([playerMesh])[0]
        if (intersect) {
            if (enemy.animation == "stand" && intersect.distance <= 200) {
                enemyAnim.playAnim("run")
                enemy.animation = "run"
                enemy.attack = true
            } else if (intersect.distance > 200 && enemy.animation == "run") {
                enemyAnim.playAnim("stand")
                enemy.animation = "stand"
                enemy.attack = false
            }
        } else if (enemy.animation == "run") {
            enemyAnim.playAnim("stand")
            enemy.animation = "stand"
            enemy.attack = false
        }
        this.points(playerMesh, enemy)
    }
    points(playerMesh, enemy) {
        // console.log("z");
        let pVect = playerMesh.getWorldDirection()
        pVect.x = playerMesh.getWorldDirection().z
        pVect.z = playerMesh.getWorldDirection().x * -1
        this.ray = new Ray(playerMesh.position, pVect)
        let intersect1 = this.intersectObjects([enemy.mesh])[0]
        if (intersect1 && intersect1.distance < 200 && Config.attack) {
            Config.points++
            console.log(Config.points);
        }
    }
}