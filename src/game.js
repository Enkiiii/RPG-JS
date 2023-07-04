
function preload() {
    this.load.image('player', "assets/player.png");
    this.load.image("tiles", "assets/tileset_dungeon.png");
    this.load.tilemapTiledJSON("map", "assets/dungeon-test.json");
} //charger les assets

function create() {

    this.arrow = this.input.keyboard.createCursorKeys();

    const map = this.make.tilemap({key: "map", tileWidth: 32, tileHeight: 32})
    const tileSet = map.addTilesetImage("tileset_dungeon", "tiles");
    const layer = map.createLayer("entry", tileSet, 0,0);
} 

function update() {
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

//afficher les assets

let config = new Phaser.Game({ //configuration phaserJS
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scene: {
        preload: preload,
        create: create,
    },
    physics: { default: 'arcade' },
    parent: 'game',
});

const game = new Phaser.Game(config);