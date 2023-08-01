import * as THREE from "three";
export default class GUI {
    constructor(camera, board, renderer, player, changeCamVect) {
        this.cols = document.getElementsByClassName("cols")
        this.camera = camera
        this.board = board
        this.renderer = renderer
        this.changeCamVect = changeCamVect
        this.player = player
        this.ranges = []
        this.laserSize = 30
        this.laserSpread = 0
        this.create()
    }
    create() {
        let camera = this.camera
        let board = this.board
        let renderer = this.renderer
        let changeCamVect = this.changeCamVect
        let player = this.player

        //wysokość kamery nad ziemią
        let heightRangeDiv = document.createElement("div")

        let heightRange = document.createElement("input")
        heightRange.type = "range"
        heightRange.min = "1"
        heightRange.max = "300"
        heightRange.value = "50"
        heightRange.addEventListener("input", function () {
            changeCamVect("y", heightRange.value)
        })
        heightRangeDiv.appendChild(heightRange)

        let heightSpan = document.createElement("span")
        heightSpan.innerText = "wysokość kamery nad ziemią"
        heightRangeDiv.appendChild(heightSpan)

        this.cols[0].appendChild(heightRangeDiv)


        //kąt nachylenia kamery x
        let angleXRangeDiv = document.createElement("div")

        let angleXRange = document.createElement("input")
        angleXRange.type = "range"
        angleXRange.addEventListener("input", function () {
            camera.updateXAngle(angleXRange.value);
        })
        angleXRangeDiv.appendChild(angleXRange)
        this.ranges.push(angleXRange)

        let angleXSpan = document.createElement("span")
        angleXSpan.innerText = "kąt nachylenia kamery x"
        angleXRangeDiv.appendChild(angleXSpan)

        this.cols[0].appendChild(angleXRangeDiv)


        //odległość kamery od postaci
        let distanceRangeDiv = document.createElement("div")

        let distanceRange = document.createElement("input")
        distanceRange.type = "range"
        distanceRange.min = "-150"
        distanceRange.max = "150"
        distanceRange.value = "100"
        distanceRange.addEventListener("input", function () {
            changeCamVect("x", -distanceRange.value);
        })
        distanceRangeDiv.appendChild(distanceRange)

        let distanceSpan = document.createElement("span")
        distanceSpan.innerText = "odległość kamery od postaci"
        distanceRangeDiv.appendChild(distanceSpan)

        this.cols[0].appendChild(distanceRangeDiv)


        //kąt widzenia kamery - y
        let angleYRangeDiv = document.createElement("div")

        let angleYRange = document.createElement("input")
        angleYRange.type = "range"
        angleYRange.addEventListener("input", function () {
            camera.updateYAngle(angleYRange.value);
        })
        angleYRangeDiv.appendChild(angleYRange)
        this.ranges.push(angleYRange)

        let angleYSpan = document.createElement("span")
        angleYSpan.innerText = "kąt widzenia kamery - y"
        angleYRangeDiv.appendChild(angleYSpan)

        this.cols[0].appendChild(angleYRangeDiv)


        //fov kamery
        let fovRangeDiv = document.createElement("div")

        let fovRange = document.createElement("input")
        fovRange.type = "range"
        fovRange.min = "5"
        fovRange.max = "120"
        fovRange.value = "75"
        fovRange.addEventListener("input", function () {
            camera.updateFov(fovRange.value);
        })
        fovRangeDiv.appendChild(fovRange)

        let fovSpan = document.createElement("span")
        fovSpan.innerText = "fov kamery"
        fovRangeDiv.appendChild(fovSpan)

        this.cols[1].appendChild(fovRangeDiv)


        //moc świateł
        let lightPowerRangeDiv = document.createElement("div")

        let lightPowerRange = document.createElement("input")
        lightPowerRange.type = "range"
        lightPowerRange.min = "0"
        lightPowerRange.max = "10"
        lightPowerRange.step = "0.02"
        lightPowerRange.value = "2"
        lightPowerRange.addEventListener("input", function () {
            board.changeLightPower(lightPowerRange.value);
        })
        lightPowerRangeDiv.appendChild(lightPowerRange)

        let lightPowerSpan = document.createElement("span")
        lightPowerSpan.innerText = "moc świateł"
        lightPowerRangeDiv.appendChild(lightPowerSpan)

        this.cols[1].appendChild(lightPowerRangeDiv)


        //cienie
        let shadowCheckboxDiv = document.createElement("div")

        let shadowCheckbox = document.createElement("input")
        shadowCheckbox.type = "checkbox"
        shadowCheckbox.addEventListener("change", function () {
            for (let i = 0; i < board.lights.length; i++) {
                board.lights[i].light.castShadow = shadowCheckbox.checked
            }
            renderer.shadowMap.enabled = shadowCheckbox.checked
        })
        shadowCheckboxDiv.appendChild(shadowCheckbox)

        let shadowCheckboxSpan = document.createElement("span")
        shadowCheckboxSpan.innerText = "cienie"
        shadowCheckboxDiv.appendChild(shadowCheckboxSpan)

        this.cols[1].appendChild(shadowCheckboxDiv)


        //widok z góry
        let topViewCheckboxDiv = document.createElement("div")

        let topViewCheckbox = document.createElement("input")
        topViewCheckbox.type = "checkbox"
        topViewCheckbox.addEventListener("change", function () {
            camera.changeTopView(topViewCheckbox.checked);
        })
        topViewCheckboxDiv.appendChild(topViewCheckbox)

        let topViewCheckboxSpan = document.createElement("span")
        topViewCheckboxSpan.innerText = "widok z góry"
        topViewCheckboxDiv.appendChild(topViewCheckboxSpan)

        this.cols[1].appendChild(topViewCheckboxDiv)


        //kamera za playerem
        let behindPlayerCheckboxDiv = document.createElement("div")

        let behindPlayerCheckbox = document.createElement("input")
        behindPlayerCheckbox.type = "checkbox"
        behindPlayerCheckbox.addEventListener("change", function () {
            camera.changePlayerView(behindPlayerCheckbox.checked);
        })
        behindPlayerCheckboxDiv.appendChild(behindPlayerCheckbox)

        let behindPlayerCheckboxSpan = document.createElement("span")
        behindPlayerCheckboxSpan.innerText = "kamera za playerem"
        behindPlayerCheckboxDiv.appendChild(behindPlayerCheckboxSpan)

        this.cols[1].appendChild(behindPlayerCheckboxDiv)


        //wielkość ognia
        let fireSizeRangeDiv = document.createElement("div")

        let fireSizeRange = document.createElement("input")
        fireSizeRange.type = "range"
        fireSizeRange.value = 3
        fireSizeRange.addEventListener("input", function () {
            console.log(fireSizeRange.value);
            board.changeFireSize(fireSizeRange.value);
        })
        fireSizeRangeDiv.appendChild(fireSizeRange)

        let fireSizeSpan = document.createElement("span")
        fireSizeSpan.innerText = "wielkość ognia"
        fireSizeRangeDiv.appendChild(fireSizeSpan)

        this.cols[2].appendChild(fireSizeRangeDiv)


        //szerokość ogniska x
        let fireWidthXRangeDiv = document.createElement("div")

        let fireWidthXRange = document.createElement("input")
        fireWidthXRange.type = "range"
        fireWidthXRange.value = 2
        fireWidthXRange.addEventListener("input", function () {
            board.changeFireWidthX(fireWidthXRange.value);
        })
        fireWidthXRangeDiv.appendChild(fireWidthXRange)

        let fireWidthXSpan = document.createElement("span")
        fireWidthXSpan.innerText = "szerokość ogniska x"
        fireWidthXRangeDiv.appendChild(fireWidthXSpan)

        this.cols[2].appendChild(fireWidthXRangeDiv)


        //szerokość ogniska z
        let fireWidthZRangeDiv = document.createElement("div")

        let fireWidthZRange = document.createElement("input")
        fireWidthZRange.type = "range"
        fireWidthZRange.value = 2
        fireWidthZRange.addEventListener("input", function () {
            board.changeFireWidthZ(fireWidthZRange.value);
        })
        fireWidthZRangeDiv.appendChild(fireWidthZRange)

        let fireWidthZSpan = document.createElement("span")
        fireWidthZSpan.innerText = "szerokość ogniska z"
        fireWidthZRangeDiv.appendChild(fireWidthZSpan)

        this.cols[2].appendChild(fireWidthZRangeDiv)


        //rozrzut lasera
        let laserSpreadRangeDiv = document.createElement("div")

        let laserSpreadRange = document.createElement("input")
        laserSpreadRange.type = "range"
        laserSpreadRange.value = 0
        laserSpreadRange.addEventListener("input", () => {
            this.laserSpread = laserSpreadRange.value
        })
        laserSpreadRangeDiv.appendChild(laserSpreadRange)

        let laserSpreadSpan = document.createElement("span")
        laserSpreadSpan.innerText = "rozrzut lasera"
        laserSpreadRangeDiv.appendChild(laserSpreadSpan)

        this.cols[2].appendChild(laserSpreadRangeDiv)


        //rozmiar lasera
        let laserSizeRangeDiv = document.createElement("div")

        let laserSizeRange = document.createElement("input")
        laserSizeRange.type = "range"
        laserSizeRange.value = 30
        laserSizeRange.addEventListener("input", () => {
            this.laserSize = laserSizeRange.value
        })
        laserSizeRangeDiv.appendChild(laserSizeRange)

        let laserSizeSpan = document.createElement("span")
        laserSizeSpan.innerText = "rozmiar lasera"
        laserSizeRangeDiv.appendChild(laserSizeSpan)

        this.cols[2].appendChild(laserSizeRangeDiv)
    }

    defaultRanges() {
        for (let i = 0; i < this.ranges.length; i++) {
            let range = this.ranges[i]
            range.value = 0
        }
    }
}