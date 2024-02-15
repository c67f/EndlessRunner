class SuperSpeedPU extends Phaser.gameObjects.Sprite {
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
        this.speed = game.settings.scrollVelocity
    }
}