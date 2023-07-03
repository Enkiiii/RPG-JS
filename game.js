class mainScene {
    
    hit(){
        //collision
        this.coin.x = Phaser.Math.Between(100, 600); 
        this.coin.y = Phaser.Math.Between(100, 300);
        
        //increment the score
        this.score += 10;
        
        //update score
        this.scoreText.setText('score: ' + this.score);
        
        //new tween
        this.tweens.add({
            targets: this.player,
            duration: 200,
            scaleX: 1.2,
            scaleY: 1.2,
            yoyo: true,
        });
    }

    preload() {
        this.load.image('player', 'assets/player.png');
        this.load.image('coin', 'assets/coin.png');
    }
    create() {
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.coin = this.physics.add.sprite(300, 300, 'coin');

        //Score
        this.score = 0;
        let style = { font: '20px Arial', fill: '#fff' };
        this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);

        //move player
        this.arrow = this.input.keyboard.createCursorKeys();

    }
    update() {
        //overlap
        if(this.physics.overlap(this.player, this.coin)) {
            this.hit();
        }
        //if right arrow is pressed then move player to the right
        if(this.arrow.right.isDown){
            this.player.x += 3;
        } else if (this.arrow.left.isDown) { //if left arrow is pressed then move player to the left
            this.player.x -= 3;
        }
    
        //same but with y axis
        if(this.arrow.down.isDown) {
            this.player.y += 3;
        } else if (this.arrow.up.isDown) {
            this.player.y -= 3;
        }

        
        
    }
    
}


new Phaser.Game({
    width: 700, // Width of the game in pixels
    height: 400, // Height of the game in pixels
    backgroundColor: '#3498db', // The background color (blue)
    scene: mainScene, // The name of the scene we created
    physics: { default: 'arcade' }, // The physics engine to use
    parent: 'game', // Create the game inside the <div id="game"> 
})