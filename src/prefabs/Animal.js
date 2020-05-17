class Animal extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, hp, damage){
        super(scene, x, y, texture, frame);
        this.hp = hp;
        this.damage = damage;
        this.isLiving = true;
    }
    
    update(){
    }

    attack(target){
        target.takeDamage(this.damage);
        console.log('animal attack player for ' + this.damage);
    }
    
    takeDamage(damage){
        this.hp -= damage;
        if(this.hp <= 0) {
            this.hp = 0;
            this.menuItem.unitKilled();
            this.living = false;
            this.visible = false;   
            this.menuItem = null;
        }
    }
}