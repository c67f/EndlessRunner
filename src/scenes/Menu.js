class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload(){
        
    }

    create(){
        console.log('in menuScene')
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.anims.create({
            key: 'idleAnim',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2, first: 0 }),
            frameRate: 12,
            repeat: -1
        })
        
        this.anims.create({
            key: 'warningAnim',
            frames: this.anims.generateFrameNumbers('warning', { start: 0, end: 1, first: 0 }),
            frameRate: 3,
            repeat: -1
        })

        let menuConfig1 = {
            fontFamily: 'Impact',
            fontSize: '48px',
            color: '#AA2411',
            align: 'center',
        }
        
        let menuConfig2 = {
            fontFamily: 'Impact',
            fontSize: '24px',
            color: '#FFAA00',
            align: 'center',
        }

        let menuConfig3 = {
            fontFamily: 'Impact',
            fontSize: '18px',
            color: '#E0AA11',
            align: 'center',
        }

        this.add.text(width/2, height/3, 'ROCKET SKATER', menuConfig1).setOrigin(0.5)
        this.add.text(width/2, height/2, 'By Cal Friedman', menuConfig2).setOrigin(0.5)
        this.add.text(width/2, (15*height)/20, 'Controls:', menuConfig3).setOrigin(0.5)
        this.add.text(width/2, (16*height)/20, 'Press space to jump', menuConfig3).setOrigin(0.5)
        this.add.text(width/2, (17*height)/20, 'Press down to boost downwards', menuConfig3).setOrigin(0.5)
        this.add.text(width/2, (18*height)/20, 'Press R to restart', menuConfig3).setOrigin(0.5)
        this.add.text(width/2, (19*height)/20, 'Press space to start! (Tip: the game speeds up the longer you play)', menuConfig3).setOrigin(0.5)
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyJUMP)) {
            game.settings = {
                scrollVelocity: -500
            }
            this.sound.play('start')
            this.scene.start("playScene")
        }
    }
}