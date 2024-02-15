let config = {
    type:Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Load, Menu, Play ],
    physics: {
      default: 'arcade',
      arcade: {
        debug: true
      }
    }
}
let game = new Phaser.Game(config)

let { width, height } = game.config

//reserve keyboard bindings
let keyJUMP, keyRESET, keyLEFT, keyRIGHT, keyDOWN