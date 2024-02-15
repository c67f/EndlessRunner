class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        let loadingBar = this.add.graphics()
        this.load.on('progress', (value) => {
            loadingBar.clear()
            loadingBar.fillStyle(0xFFFFFF, 1)
            loadingBar.fillRect(0, height/2, width * value, 5)
        })
        
        this.load.on('complete', () => {
            loadingBar.destroy()
        })

        this.load.image('player', './assets/RunnerPlaceholder.png')
        this.load.image('background', './assets/SkyBackground.png')
        this.load.image('buildingTile', './assets/BuildingTileTall3.png')
        this.load.image('projectile', './assets/Projectile.png')
        this.load.image('superSpeed', './assets/SuperSpeedPU.png')
    }

    create() {
        window:localStorage ? console.log('Local storage supported') : console.log('Local storage not supported')
        this.scene.start('menuScene')
        /*let delayTime = 20000
        let delay = this.time.delayedCall(delayTime, () => {
        })*/
    }
}