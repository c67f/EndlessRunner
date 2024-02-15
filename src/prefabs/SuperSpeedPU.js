class SuperSpeedPU extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        this.speed = game.settings.scrollVelocity
        this.parentScene = scene

        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.body.setVelocityX(this.speed)
        this.body.setImmovable()
        this.body.allowGravity = false

    }

    update() {
        if (this.parentScene.gameOver === false){
            this.speed = game.settings.scrollVelocity
            this.body.setVelocityX(this.speed)
        } else {
            this.body.setVelocityX(0)
        }

        if (this.x < -20){
            this.destroy()
        }
    }
}