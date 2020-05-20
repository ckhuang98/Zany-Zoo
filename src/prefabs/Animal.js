class Animal extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, damage){
        super(scene, x, y, texture, frame);
        this.hp = 5 * (DAY - 1) + 10;
        this.damage = damage;
        this.isLiving = true;
    }
    
    update(){
    }

    attack(target){
        target.takeDamage(this.damage);
        console.log('Animal attack player for ' + this.damage);
    }
    
    takeDamage(damage){
        this.hp -= damage;
        if(this.hp <= 0) {
            this.hp = 0;

            this.isLiving = false;
            console.log('Player deffeated enemy!');
            this.visible = false;
        }
    }
}