const GameState = {
    preload() {
        this.load.image('background', 'assets/images/background.png');
        // this.load.image('chicken', 'assets/images/chicken.png');
        this.load.spritesheet('chicken', 'assets/images/chickenSprite.png', 148, 110, 24);
        this.load.image('arrow', 'assets/images/arrow.png');
        this.load.spritesheet('horse', 'assets/images/horseSprite.png', 400, 248, 15);
        this.load.audio('chickenSound', ['assets/sounds/chicken.ogg', 'assets/sounds/chicken.mp3']);
        this.load.audio('horseSound', ['assets/sounds/horse.ogg', 'assets/sounds/horse.mp3']);
    },
    create() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.background = this.game.add.sprite(0, 0, 'background');

        const animalData = [
            { key: 'chicken', text: 'CHICKEN', audio: 'chickenSound' },
            { key: 'horse', text: 'HORSE', audio: 'horseSound' },
        ];

        this.animals = this.game.add.group();

        animalData.forEach((element) => {
            let animal = this.animals.create(-1000, this.game.world.centerY, element.key, 0);
            animal.customParams = { text: element.text, sound: this.game.add.audio(element.audio) };
            animal.anchor.setTo(0.5);
            animal.animations.add('animate', [0,1,2,3], 3, false);
            animal.inputEnabled = true;
            animal.input.pixelPefectClick = true;
            animal.events.onInputDown.add(this.animateAnimal, this);
        });

        this.currentAnimal = this.animals.next();
        this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);
        this.showText(this.currentAnimal);

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
        this.rightArrow.inputEnabled = true;
        this.rightArrow.input.pixelPefectClick = true;
        this.rightArrow.events.onInputDown.add(this.switchAnimal, this);
    },
    update() {
    },
    switchAnimal(sprite, event) {
        if(this.isMoving) {
            return false;
        }
        this.isMoving = true;
        this.animalText.visible = false;
        let newAnimal, endX;
        if (sprite.customParams.direction > 0) {
            newAnimal = this.animals.next();
            newAnimal.x = -newAnimal.width/2;
            endX = 640 + this.currentAnimal.width/2;
        } else {
            newAnimal = this.animals.previous();
            newAnimal.x = 640 + newAnimal.width/2;
            endX = -this.currentAnimal.width/2;
        }
        const newAnimalMovement = this.game.add.tween(newAnimal);
        newAnimalMovement.to({x: this.game.world.centerX}, 1000);
        newAnimalMovement.start();

        const currentAnimalMovement = this.game.add.tween(this.currentAnimal);
        currentAnimalMovement.to({x: endX}, 1000);
        newAnimalMovement.onComplete.add(() => {
            this.isMoving = false;
            this.showText(newAnimal);
        }, this);
        currentAnimalMovement.start();
        this.currentAnimal = newAnimal;
    },
    animateAnimal(sprite, event) {
        sprite.play('animate');
        sprite.customParams.sound.play();
    },
    showText(animal) {
        if(!this.animalText){
            const style = {
                font: 'bold 30pt Arial',
                fill: '#D0171B',
                align: 'center',
            }
            this.animalText = this.game.add.text(this.game.width/2, this.game.height * 0.85, '', style);
            this.animalText.anchor.setTo(0.5);
        }
        this.animalText.setText(animal.customParams.text);
        this.animalText.visible = true;
    }
};

const game = new Phaser.Game(640, 360, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');