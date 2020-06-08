class Loading extends Phaser.Scene {
    constructor() {
        super("loadingScene");
    }

    preload(){
        // Loading animation   
        this.anims.create({
            key: 'loadingAnimation',
            frames: this.anims.generateFrameNumbers('loadingAnimation', { start: 0, end: 49, first: 0}),
            frameRate: 26,
            repeat: -1
        });
            
        let loadAnim = this.add.sprite(0, 0, 'loadingScreen').setOrigin(0, 0);

        this.anims.play('loadingAniimation');

        // Skills images and buttons
        this.load.image('skillsMenu', './assets/images/skillsMenu.png');
        this.load.image('plus', './assets/images/plus.png');
        this.load.image('minus', './assets/images/minus.png');
        this.load.image('confirm', './assets/images/confirm.png');

        // Menu images and buttons
        this.load.image('continueButton', './assets/images/continueButton.png');
        this.load.image('continueSelect', './assets/images/continueSelect.png');
        this.load.image('menu', './assets/images/TitleMenu.png');
        this.load.image('pressStart', './assets/images/pressStart.png');
        this.load.image('startSelect', './assets/images/startSelect.png');
        this.load.image('backStory', './assets/images/Backstory.png');
        this.load.image('pressInstruction', './assets/images/instructionsButton.png');
        this.load.image('instructionsSelect', './assets/images/instructionsSelect.png');
        this.load.image('instructions', './assets/images/Instructions.png');

        //images for Game Over
        this.load.image('defeatEnding', './assets/images/defeatEnding.png');
        this.load.image('victoryEnding', './assets/images/victoryEnding.png');
        this.load.image('creditPage', './assets/images/creditPage.png');
        this.load.image('creditButton', './assets/images/creditsButton.png');
        this.load.image('creditSelected', './assets/images/creditsSelected.png');
        this.load.image('menuButton', './assets/images/menuButton.png');
        this.load.image('menuSelected', './assets/images/menuSelected.png');

        // Battle Images and Animations
        this.load.image('bear', './assets/images/bear.png');
        this.load.spritesheet('bearIdle', './assets/images/bearSpriteSheet.png', {frameWidth: 184, frameHeight: 262, startFrame: 0, endFrame: 48});
        this.load.image('pig', './assets/images/piggy.png');
        this.load.spritesheet('pigIdle', './assets/images/pigSpriteSheet.png', {frameWidth: 199, frameHeight: 138, startFrame: 0, endFrame: 36});
        this.load.image('monkey', './assets/images/monkey.png');
        this.load.spritesheet('monkeyIdle', './assets/images/monkeySpriteSheet.png', {frameWidth: 226, frameHeight: 202, startFrame: 0, endFrame: 50});
        this.load.image('player', './assets/images/sprite.png');
        this.load.spritesheet('playerIdle', './assets/images/playerSpriteSheet.png', {frameWidth: 138, frameHeight: 264, startFrame: 0, endFrame: 48});
        this.load.image('boss', './assets/images/bossSprite.png');

        // Animation Sprite Sheet
        this.load.spritesheet('bossIdle', './assets/images/bossAnim.png', {frameWidth: 291, frameHeight: 380, startFrame: 0, endFrame: 49});
        this.load.image('background1', './assets/images/bossStage.png');

        // Sfx
        this.load.audio('click', './assets/sounds/click.mp3');
        this.load.audio('bearRoar', './assets/sounds/bearRoar.mp3');
        this.load.audio('Slap', './assets/sounds/slap.mp3');
        this.load.audio('Scream', './assets/sounds/scream.mp3');
        this.load.audio('Cartwheel', './assets/sounds/cartwheel.mp3');
        this.load.audio('pigSound', './assets/sounds/pigSound.mp3');
        this.load.audio('monkeySound', './assets/sounds/monkeySound.mp3');
        this.load.audio('Acrobatics', './assets/sounds/acrobatics.mp3');
        this.load.audio('Haymaker', './assets/sounds/haymaker.mp3');
        this.load.audio('Intimidate', './assets/sounds/intimidate.mp3');
        this.load.audio('Jump Kick', './assets/sounds/jumpKick.mp3');
        this.load.audio('Manuever', './assets/sounds/manuever.mp3');
        this.load.audio('Persuade', './assets/sounds/persuade.mp3');
        this.load.audio('Rage', './assets/sounds/rage.mp3');
        this.load.audio('Scream', './assets/sounds/smash.mp3');
        this.load.audio('Spin Attack', './assets/sounds/spinAttack.mp3');
        this.load.audio('Swipe', './assets/sounds/swipe.mp3');
        this.load.audio('Toss', './assets/sounds/toss.mp3');
        this.load.audio('Trap', './assets/sounds/trap.mp3');
        this.load.audio('Trick', './assets/sounds/trick.mp3');
        this.load.audio('Yawn', './assets/sounds/yawn.mp3');
        this.load.audio('Smash', './assets/sounds/smash.mp3');
        this.load.audio('Slurp', './assets/sounds/slurp.mp3');

        // Game Music
        this.load.audio('bgm', './assets/music/BGM.mp3');
        this.load.audio('battleMusic', './assets/music/BattleMusic.mp3');
        this.load.audio('credit', './assets/music/credit.mp3');
        
    }
    create(){
        this.scene.start('menuScene');
    }
}