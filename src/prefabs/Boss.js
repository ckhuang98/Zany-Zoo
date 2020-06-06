class Boss extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        this.isLiving = true;
        this.OFFSCREEN_X = -100;
        this.ONSCREEN_X = 175;
        this.tweenDuration = 500;
        this.bear = new Bear(this.scene, this.OFFSCREEN_X, 150, 'bear', 1, 'str');
        this.scene.add.existing(this.bear);
        this.pig = new Pig(this.scene, this.OFFSCREEN_X, 150, 'pig', 1, 'wit');
        this.scene.add.existing(this.pig);
        this.monkey = new Monkey(this.scene, this.OFFSCREEN_X, 150, 'monkey', 1, 'dex');
        this.scene.add.existing(this.monkey);
        this.currentAnimal = null;

        this.scene.anims.create({
            key: 'bossIdle',
            frames: this.scene.anims.generateFrameNumbers('bossIdle', { start: 0, end: 49, first: 0}),
            frameRate: 26,
            repeat: -1
        });
        this.anims.play('bossIdle');
    }

    nextAnimal(){
        if(this.bear.hp > 0){
            this.scene.tweens.add({
                targets: this.bear,
                x: this.ONSCREEN_X,
                duration: this.tweenDuration,
                ease: 'Linear'
            });
            this.currentAnimal = this.bear;
        } else if(this.bear.hp <= 0 && this.pig.hp > 0){
            this.scene.tweens.add({
                targets: this.bear,
                x: this.OFFSCREEN_X,
                duration: this.tweenDuration,
                ease: 'Linear'
            });
            this.scene.tweens.add({
                targets: this.pig,
                x: this.ONSCREEN_X,
                duration: this.tweenDuration,
                ease: 'Linear'
            });
            this.currentAnimal = this.pig;
        } else if(this.pig.hp <= 0 && this.monkey.hp > 0){
            this.scene.tweens.add({
                targets: this.pig,
                x: this.OFFSCREEN_X,
                duration: this.tweenDuration,
                ease: 'Linear'
            });
            this.scene.tweens.add({
                targets: this.monkey,
                x: this.ONSCREEN_X,
                duration: this.tweenDuration,
                ease: 'Linear'
            });
            this.currentAnimal = this.monkey;
        } else{
            this.scene.tweens.add({
                targets: this.monkey,
                x: this.OFFSCREEN_X,
                duration: this.tweenDuration,
                ease: 'Linear'
            });
            this.currentAnimal = null;
            this.isLiving = false;
        }
    }
}