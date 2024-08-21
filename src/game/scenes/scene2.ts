import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { newScene } from '../statescene';
import { eventData } from "$lib/ablyclient";

//scene 2 red alert

export class scene2 extends Scene
{
    camera!: Phaser.Cameras.Scene2D.Camera;
    background!: Phaser.GameObjects.Image;
    gameText!: Phaser.GameObjects.Text;

    constructor ()
    {
        super('scene2');
    }

    create ()
    {

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0xDA0229);

  

        EventBus.emit('current-scene-ready', this);

}






changeScene() {
    this.cameras.main.fadeOut(1000, 0, 0, 0, (camera: any, progress: number) => {
        if (progress === 1) {
            this.scene.start(newScene(eventData));
        }
    });
}






}