class Player extends Phaser.Scene {
    constructor(scene, x, y) {
        super('player-scene');
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.player = null;
    }

    preload() {
        this.scene.load.atlas('player', 'assets/player.png', 'assets/sprites/player.json');
    }

    create() {
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.player = this.scene.physics.add.sprite(this.x, this.y, 'player', 'walk-down-3.png');
        this.createPlayerAnims();
        this.player.anims.play('player-idle-down');
    }

    update(t, dt) {
        if (!this.cursors || !this.player) {
            return;
        }

        //Déplacements du player
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
    //Animations du player
    createPlayerAnims() {
        this.scene.anims.create({
            key: 'player-idle-down',
            frames: [{ key: 'player', frame: 'walk-down-3.png' }]
        })

        this.scene.anims.create({
            key: 'player-idle-up',
            frames: [{ key: 'player', frame: 'walk-up-3.png' }]
        })

        this.scene.anims.create({
            key: 'player-idle-side',
            frames: [{ key: 'player', frame: 'walk-side-3.png' }]
        })

        this.scene.anims.create({
            key: 'player-run-down',
            frames: this.scene.anims.generateFrameNames('player', { start: 1, end: 8, prefix: 'run-down-', suffix: '.png' }),
            repeat: -1,
            frameRate: 15,
        })

        this.scene.anims.create({
            key: 'player-run-up',
            frames: this.scene.anims.generateFrameNames('player', { start: 1, end: 8, prefix: 'run-up-', suffix: '.png' }),
            repeat: -1,
            frameRate: 15,
        })

        this.scene.anims.create({
            key: 'player-run-side',
            frames: this.scene.anims.generateFrameNames('player', { start: 1, end: 8, prefix: 'run-side-', suffix: '.png' }),
            repeat: -1,
            frameRate: 15,
        })

        this.player.anims.play('player-idle-down');
    }
}
