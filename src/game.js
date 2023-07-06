class GameScene extends Phaser.Scene {
  cursors;
  player;

  constructor() {
    super('game');
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.load.atlas('player', 'assets/player.png', 'assets/sprites/player.json');
  }

  create() {
    this.player = this.physics.add.sprite(128, 128, 'player', 'walk-down-3.png');

    this.anims.create({
      key: 'player-idle-down',
      frames: [{ key: 'player', frame: 'walk-down-3.png' }]
    })

    this.anims.create({
      key: 'player-idle-up',
      frames: [{ key: 'player', frame: 'walk-up-3.png' }]
    })

    this.anims.create({
      key: 'player-idle-side',
      frames: [{ key: 'player', frame: 'walk-side-3.png' }]
    })

    this.anims.create({
      key: 'player-run-down',
      frames: this.anims.generateFrameNames('player', { start: 1, end: 8, prefix: 'run-down-', suffix: '.png' }),
      repeat: -1,
      frameRate: 15,
    })

    this.anims.create({
      key: 'player-run-up',
      frames: this.anims.generateFrameNames('player', { start: 1, end: 8, prefix: 'run-up-', suffix: '.png' }),
      repeat: -1,
      frameRate: 15,
    })

    this.anims.create({
      key: 'player-run-side',
      frames: this.anims.generateFrameNames('player', { start: 1, end: 8, prefix: 'run-side-', suffix: '.png' }),
      repeat: -1,
      frameRate: 15,
    })

    this.player.anims.play('player-idle-down');
  }

  update(t, dt) {
    if (!this.cursors || !this.player) {
      return
    }

    const speed = 100;

    if (this.cursors.left?.isDown) {
      this.player.anims.play('player-run-side', true);
      this.player.setVelocityX(-speed);
      this.player.scaleX = -1;
    }
    else if (this.cursors.right?.isDown) {
      this.player.anims.play('player-run-side', true)
      this.player.setVelocityX(speed)
      this.player.scaleX = 1
    }
    else if (this.cursors.up?.isDown) {
      this.player.anims.play('player-run-up', true)
      this.player.setVelocityY(-speed)
    }
    else if (this.cursors.down?.isDown) {
      this.player.anims.play('player-run-down', true)
      this.player.setVelocityY(speed)
    }
    else {
      this.player.play('player-idle-down')
      this.player.setVelocity(0, 0)
    }
  }
}

let config = new Phaser.Game({ //configuration phaserJS
  width: 700,
  height: 400,
  backgroundColor: '#3498db',
  scene: GameScene,
  physics: { default: 'arcade' },
  parent: 'game',
});

const game = new Phaser.Game(config);