import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { newScene } from '../statescene';
import { eventData } from "$lib/ablyclient";

//scene 3 blue screen

export class scene3 extends Scene
{
    camera!: Phaser.Cameras.Scene2D.Camera;
    background!: Phaser.GameObjects.Image;
    gameText!: Phaser.GameObjects.Text;
    private countdown!: number;
    private scenes!: string[];
    private countdownText!: Phaser.GameObjects.Text;
    private hasTransitioned: boolean;


    constructor ()
    {
        super('scene3');
        this.countdown = 10; // Countdown time in seconds
        this.scenes = ['scene1', 'scene2', 'scene4']; // List of possible scenes to transition to
        this.hasTransitioned = false;

     
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x0000FF);

        this.countdownText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, ` ${this.countdown}`, {
            fontSize: '80px',
            color: '#FFFFFF'
        });
      
        this.time.addEvent({
            delay: 1000, // 1 second
            callback: this.updateCountdown,
            callbackScope: this,
            loop: true
        });

        EventBus.emit('current-scene-ready', this);
    }




// this will have a fade out effect when changing scenes
changeScene(eventData: any) {
    if (eventData) {
        this.scene.start(newScene(eventData));
    } else {
        const randomScene = this.getRandomScene();
        this.scene.start(randomScene);
    }
}



    getRandomScene(): string {
        const randomIndex = Math.floor(Math.random() * this.scenes.length);
        return this.scenes[randomIndex];
    }

    update(time: number, delta: number) {
        // Your update logic here
    }

    updateCountdown() {
        if (this.hasTransitioned) return; // Prevent multiple transitions
    
        this.countdown--;
        this.countdownText.setText(` ${this.countdown}`);
        if (this.countdown <= 0) {
            this.changeScene(null);
        }

    }

}