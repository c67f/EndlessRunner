class PlatformTile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        this.speed = game.settings.scrollVelocity
        this.lastTile = false
        this.parentScene = scene

        //for (let i = 0; i < tileCount; i++){
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.body.setVelocityX(this.speed)
        this.body.setImmovable()
        this.body.allowGravity = false
        this.body.setFrictionX(0)
        this.body.checkCollision.down = false
        this.body.checkCollision.left = false
        this.body.checkCollision.right = false
        //}
    }

    update() {
        if (this.parentScene.gameOver === false){
            this.speed = game.settings.scrollVelocity
            this.body.setVelocityX(this.speed)
        } else {
            this.body.setVelocityX(0)
        }
        //console.log(this.speed)
        //console.log(this.lastTile)
        if (this.x < this.parentScene.spawnWhenPassed){
            if (this.lastTile === true){
                //console.log(this.x)
                //console.log(this.parentScene.spawnWhenPassed)
                this.parentScene.addPlatform()
                this.lastTile = false
            }
        }

        if (this.x < -this.width){
            this.destroy()
        }
    }

    /*gameOver() {
        this.body.setVelocity(0)
    }*/
}