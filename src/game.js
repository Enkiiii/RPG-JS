class GameScene extends Phaser.Scene {
  constructor() {
    super('game');
    this.player = null;
  }

  preload() {
    this.player = new Player(this, 128, 128);
    this.player.preload();
  }
  
  create() {
    this.player.create();
  }

  update(t, dt) {
    this.player.update(t, dt);
  }
}
let config = { //configuration phaserJS
  width: 700,
  height: 400,
  backgroundColor: '#3498db',
  scene: GameScene,
  physics: { default: 'arcade' },
  parent: 'game',
};

const game = new Phaser.Game(config);