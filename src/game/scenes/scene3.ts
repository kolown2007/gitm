import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { newScene } from '../statescene';
import { eventData } from "$lib/ablyclient";
import { initializeAbly } from "$lib/ablyclient";

//scene 3 blue screen

export class scene3 extends Scene
{
    camera!: Phaser.Cameras.Scene2D.Camera;
    background!: Phaser.GameObjects.Image;
    gameText!: Phaser.GameObjects.Text;

    private scenes!: string[];
    private hasTransitioned: boolean;


    constructor ()
    {
        super('scene3');
        this.scenes = ['scene1', 'scene2', 'scene4']; // List of possible scenes to transition to
        this.hasTransitioned = false;

     
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x0000FF);
        EventBus.emit('current-scene-ready', this);

        const textStyle = {
            fontSize: '100px',
            fontFamily: 'Consolas, "Courier New", monospace'
        };

        this.gameText = this.add.text(50, 200, ':( ', textStyle);

        initializeAbly(this, () => this.loveEffects());
        
    }


    private currentTextState: number = 0;

    private loveEffects() {
        if (this.currentTextState === 0) {
            this.gameText.setText(':)');
            this.currentTextState = 1;
        } else if (this.currentTextState === 1) {
            this.gameText.setText(':p');
            this.currentTextState = 2;
        } else {
            this.gameText.setText(':('); // Reset to initial state or any other text
            this.currentTextState = 0;
        }
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



}