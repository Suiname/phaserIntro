const GameState = {
    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('chicken', 'assets/images/chicken.png');
        this.load.image('arrow', 'assets/images/arrow.png');
        this.load.image('horse', 'assets/images/horse.png');

    },
    create() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.background = this.game.add.sprite(0, 0, 'background');

        const animalData = [
            { key: 'chicken', text: 'CHICKEN' },
            { key: 'horse', text: 'HORSE' },
        ];

        this.animals = this.game.add.group();

        animalData.forEach((element) => {
            let animal = this.animals.create(-1000, this.game.world.centerY, element.key);
            animal.customParams = { text: element.text };
            animal.anchor.setTo(0.5);
            animal.inputEnabled = true;
            animal.input.pixelPefectClick = true;
            animal.events.onInputDown.add(this.animateAnimal, this);
        });

        this.currentAnimal = this.animals.next();
        this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);

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