class Animal extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, hp, damage){
        super(scene, x, y, texture, frame);
        this.hp = hp;
        this.damage = damage;
    }

    attack(target){
        target.takeDamage(this.damage);
    }
    
    takeDamage(damage){
        this.hp -= damage;
    }
}