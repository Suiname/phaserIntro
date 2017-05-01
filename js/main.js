const GameState = {
    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('chicken', 'assets/images/chicken.png');
        this.load.image('arrow', 'assets/images/arrow.png');
    },
    create() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.background = this.game.add.sprite(0, 0, 'background');
        this.chicken = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chicken');
        this.chicken.anchor.setTo(0.5, 0.5);
        this.chicken.scale.setTo(2);
        this.chicken.inputEnabled = true;
        this.chicken.input.pixelPefectClick = true;
        this.chicken.events.onInputDown.add(this.animateAnimal, this);

        this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
        this.leftArrow.anchor.setTo(0.5);
        this.leftArrow.scale.x = -1;
        this.leftArrow.customParams = { direction: -1 };
        this.leftArrow.inputEnabled = true;
        this.leftArrow.input.pixelPefectClick = true;
        this.leftArrow.events.onInputDown.add(this.switchAnimal, this);

        this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
        this.rightArrow.anchor.setTo(0.5);
        this.rightArrow.customParams = { direction: 1 };
        
    },
    update() {
        this.chicken.angle += 0.5;
    },
    switchAnimal(sprite, event) {
        console.log('left arrow');
    },
    animateAnimal(sprite, event) {
        console.log('animate animal');
    }
};

const game = new Phaser.Game(640, 360, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');