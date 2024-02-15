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
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyJUMP)) {
            game.settings = {
                scrollVelocity: -500
            }
            this.scene.start("playScene")
        }
    }
}