class Message extends Phaser.GameObjects.Container{
 
    constructor(scene, events){
        super(scene);
        this.text = new Phaser.GameObjects.Text(scene, 250, 785, "", { color: '#ffffff', align: 'left', fontSize: 25, wordWrap: { width: 500, basicWordWrap: true }});
        this.add(this.text);
        this.text.setOrigin(0.5);     

        // When an action that needs messages to appear, such as attack, it will emit an event "Message"
        // which calls the showMessage() function
        events.on("Message", this.showMessage, this);
        this.visible = true;
    }

    // Display the text that is passed through the event listner
    showMessage(text) {
        console.log('call message');
        this.text.setText(text);
        this.visible = true;
        if(this.hideEvent)
            this.hideEvent.remove(false);

        // Displays text for 3.5 seconds and then hides it.
        this.hideEvent = this.scene.time.addEvent({ delay: 3500, callback: this.hideMessage, callbackScope: this });
    }

    // Hides displayed text
    hideMessage() {
        this.hideEvent = null;
        this.visible = false;
    }
}