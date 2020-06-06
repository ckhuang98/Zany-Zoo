class Animal extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        if(DAY < 14){
            this.hp = 5 * (DAY - 1) + 19;
        }else{
            this.hp = 40;
        }
        if(DAY < 14){
            this.damage = 4*(DAY/2 - 1) + 4; // Final Math formula, courtesy of Philip
        }else{
            this.damage = 12; // Boss battle damage
        }
        this.isLiving = true;
    }

    attack(target){
    }
    
    takeDamage(damage){
        this.hp -= damage;
        if(this.hp <= 0) {
            this.hp = 0;
            this.isLiving = false;
            DAY++;
        }
    }
}