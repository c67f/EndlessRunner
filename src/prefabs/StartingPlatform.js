class StartingPlatform extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        this.speed = game.settings.scrollVelocity
        this.parentScene = scene

        //for (let i = 0; i < tileCount; i++){
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.clock = this.parentScene.time.delayedCall(1000, () => {
            this.body.setVelocityX(this.speed)
        })
        this.body.setImmovable()
        this.body.allowGravity = false
        this.body.setFrictionX(0)
        //}
    }

    update() {

        if (this.x < -this.width){
            this.destroy()
        }
    }
}