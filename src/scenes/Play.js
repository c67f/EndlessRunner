class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    
    init() {
        this.startX = 100
        this.startY = 280
        this.jumpPower = 500
        this.gameOver = false
        this.physics.world.gravity.y = 1000
        this.tileWidth = 320
        this.tileHeight = 160
        this.tileLeftScreen = 0
        this.startingPlayerHeight = 320   //starting platform y (at where the player is): 480 - 160 = 320
        //previous platform height:
        this.lastPlatformHeight = -1
        //maximum height distance between current and next platform:
        this.platformDifference = 90
        //if the last platform tile in a platform passes this x position, start spawning a new platform. Smaller means farther distance between platforms, larger means closer together platforms. This increases over time
        this.spawnWhenPassed = 120
        //the minimum value that spawnWhenPassed can decrease to
        this.minPlatformDistance = -(this.tileWidth)
        this.playerHeight = 28
        this.playerWidth = 11
        this.superSpeedSpriteHeight = 20 //height in pixels of the sprite for the super speed power up
        this.superSpeedMult = 1

        this.randomNumMax = 500 //controls the frequency of projectiles
        this.randomNumMax2 = 40 //controls the frequency of super speed powerups

        this.coyoteTimer = 100
        this.speedTime = 5000

        this.speeding = false //true if super speed is active
    }
    
    create() {
        //game clock
        this.gameTime = 0
        this.startTime = game.getTime()

        this.background = this.add.sprite(0, 0, 'background').setOrigin(0, 0)

        //add player
        this.player = this.physics.add.sprite(this.startX, this.startY, 'player').setOrigin(0.5)
        this.player.setCollideWorldBounds(true)
        this.player.grounded = false
        this.player.offGround = true //true if the player is not touching the ground - this is a separate variable for coyote time
        //this.player.body.allowGravity = false
        //this.player.setImmovable()

        //add initial platform/building
        let startingPlatform = new StartingPlatform(this, 0, height - this.tileHeight, 'buildingTile').setOrigin(0, 0)
        this.lastPlatformHeight = this.startingPlayerHeight
        /*this.platform = this.physics.add.sprite(0, height, 'buildingTile').setOrigin(0, 1)
        this.platform.setImmovable()
        this.platform.body.allowGravity = false*/

        //add spawning platforms/buildings
        this.platforms = this.add.group({
            runChildUpdate: true
        })
        this.addPlatform()
        
        this.projectiles = this.add.group({
            runChildUpdate: true
        })

        this.superSpeedPUs = this.add.group({
            runChildUpdate:true
        })

        //add colliders
        this.physics.add.collider(
            this.player,
            startingPlatform,
            this.touchedGround,
            null,
            this
        )

        this.platformsCollider = this.physics.add.collider(
            this.player,
            this.platforms,
            this.touchedGround,
            null,
            this
        )

        this.projectileCollider = this.physics.add.collider(
            this.player,
            this.projectiles,
            this.playerHit,
            null,
            this
        )

        this.superSpeedCollider = this.physics.add.collider(
            this.player,
            this.superSpeedPUs,
            this.superSpeedCollected,
            null,
            this
        )


        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    }

    addPlatform() {
        //console.log(this.lastPlatformHeight)
        let lowerBound = this.lastPlatformHeight - this.platformDifference
        if (lowerBound < this.playerHeight*2){
            lowerBound = this.playerHeight*2
        }
        let upperBound = this.lastPlatformHeight + this.platformDifference
        if (upperBound > (height - this.playerHeight*4)){  //upperBound is farther away from the edge of the screen than lowerBound is to provide more room for the player to jump (so they don't hit their head on the top of the screen)
            upperBound = height - this.playerHeight*4
        }
        let randomHeight = Phaser.Math.Between(lowerBound, upperBound)
        
        let length = Phaser.Math.Between(1, 4)
        for (let i = 0; i < (length-1)*this.superSpeedMult; i++){
            //create a variable amount of platform tiles to in effect create longer or shorter platforms - maybe the loop /should/ be in PlatformTile.js?
            let platform = new PlatformTile(this, width + (i * this.tileWidth), randomHeight, 'buildingTile', 0).setOrigin(0, 0)
            //console.log(platform.x)
            
            this.platforms.add(platform)
        }
        let platformLast = new PlatformTile(this, width + ((length-1) * this.tileWidth), randomHeight, 'buildingTile', 0).setOrigin(0, 0)
        platformLast.lastTile = true
        this.platforms.add(platformLast)

        this.lastPlatformHeight = randomHeight
    }


    addProjectile() {
        let randomY = Phaser.Math.Between(this.playerHeight*3, this.lastPlatformHeight)

        let projectile = new Projectile(this, width, randomY, 'projectile', 0).setOrigin(0.5, 0.5)
        this.projectiles.add(projectile)
    }

    addSuperSpeedPU() {
        let powerUpY = this.lastPlatformHeight + this.superSpeedSpriteHeight/2

        let powerUp = new SuperSpeedPU(this, width, powerUpY, 'projectile', 0).setOrigin(0.5, 0.5)
        this.superSpeedPUs.add(powerUp)
        console.log("addSuperSpeedPU")
    }



    update() {
        //speed up and increase distance between platforms as time goes on (up to a cap):
        this.gameTime = game.getTime() - this.startTime
        if (this.spawnWhenPassed > this.minPlatformDistance){
            game.settings.scrollVelocity = game.settings.scrollVelocity - 0.005
            this.spawnWhenPassed = this.spawnWhenPassed - 0.005 //the distance between the platforms increases at a set rate if it's less than the max distance
        }
        //console.log(this.spawnWhenPassed)
        
        if (this.platformsCollider === false){
            console.log("not touching a platform")
        }
       // console.log(this.player.y)
        if (this.player.y > height - (this.playerHeight/2 + 1) || this.player.x < this.playerWidth/2 + 1){
            this.gameOver = true
        }
        //console.log(this.gameOver)
        if (!this.gameOver) {
            //Jump:
            if (this.player.grounded && Phaser.Input.Keyboard.JustDown(keyJUMP)){
                this.player.setVelocityY(-this.jumpPower)
                this.player.jumped = true
                // //probably temporary till I change it to happen when no longer touching a ground collision box
                //this.player.body.allowGravity = true
            }

            //Drop/Boost downward:
            if (this.player.grounded === false && Phaser.Input.Keyboard.JustDown(keyDOWN)){
                console.log('boost downward')
                this.player.setVelocityY(this.jumpPower)
            }

            if (this.speeding === false){
                //spawning projectiles:
                let randomNum = Phaser.Math.Between(0, this.randomNumMax)
                console.log(randomNum)
                if (randomNum === this.randomNumMax - 1){
                    this.addProjectile()
                }

                //spawning powerups:
                let randomNum2 = Phaser.Math.Between(0, this.randomNumMax2)
                console.log(randomNum2)
                if (randomNum2 === this.randomNumMax2 - 1){
                    this.addSuperSpeedPU()
                    console.log("spawned super speed powerup")
                }
            }
            

            if (this.player.offGround === false){ //how do I test if the player is /not/ touching a platform? body.touching.down could work, except that I'm guessing it works on all collisions, and what if I want to add powerups or something? Need to find out more about how colliders work in phaser3    (this.platformsCollider) === false && 
                //console.log("player left ground")
                //this.player.offGround = true
                if (this.player.jumped === false){ //if the player fell/walked off a platform
                    this.player.grounded = false
                    /*this.coyoteTime = this.time.delayedCall(this.coyoteTimer, () => {
                        //console.log("coyoteTime over")

                    })*/
                } else { //if the player jumped off a platform
                    this.player.grounded = false
                    //console.log("player jumped")
                }
            }
        
            //this.platformLength = Phaser.Math.Between(1, 4)

            
            /*console.log((this.platforms.getLast).x)
            if ((this.platforms.getFirst).x < 0) {
                console.log("last platform on screen touched the left edge of the screen")
                this.addPlatform(platformLength)
            }
            */

        } else {
            this.platforms.setVelocityX(0) //this doesn't seem to work
        }

    }

    touchedGround(playerArg) {
        playerArg.jumped = false
        playerArg.offGround = false
        playerArg.grounded = true
    }

    playerHit() {
        console.log('touched projectile')
        this.gameOver = true
    }

    superSpeedCollected() {
        this.superSpeedMult = 12
        let speedTimer = this.time.delayedCall(this.speedTime, () => {
            game.settings.scrollVelocity *= 10
            this.spawnWhenPassed = this.minPlatformDistance * 1.5
        })
        this.superSpeedMult = 1
    }
}