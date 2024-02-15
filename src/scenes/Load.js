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

        this.load.spritesheet('player', './assets/Skater3.png', {
            frameWidth: 15,
            frameHeight: 28,
            startFrame: 0,
            endFrame: 2,
        })
        this.load.image('background', './assets/SkyBackground.png')
        this.load.image('buildingTile', './assets/BuildingTileTall3.png')
        this.load.image('projectile', './assets/Projectile.png')
        this.load.image('superSpeed', './assets/SuperSpeedPU.png')
        this.load.spritesheet('warning', './assets/WarningAnimated.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 1
        })
        
        this.load.audio('speedPowerUp', './assets/powerUp.wav')
        this.load.audio('projectile', './assets/projectile.wav')
        this.load.audio('boost', './assets/boost.wav')
        this.load.audio('start', './assets/start.wav')
    }

    create() {
        window:localStorage ? console.log('Local storage supported') : console.log('Local storage not supported')
        this.scene.start('menuScene')
        /*let delayTime = 20000
        let delay = this.time.delayedCall(delayTime, () => {
        })*/
    }
}