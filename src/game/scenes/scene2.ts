import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { newScene } from '../statescene';
 import { eventData } from "$lib/ablyclient";
import { initializeAbly } from "$lib/ablyclient";

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

      
        initializeAbly(this, () => this.loveEffects());

        EventBus.emit('current-scene-ready', this);

}


private loveEffects() {
    console.log("Circle added to the scene.");
    const x = Phaser.Math.Between(0, this.cameras.main.width);
    const y = Phaser.Math.Between(0, this.cameras.main.height);
    this.add.circle(x, y, 50, 0xff0000); // Add a red circle
}




changeScene() {
    this.cameras.main.fadeOut(1000, 0, 0, 0, (camera: any, progress: number) => {
        if (progress === 1) {
            this.scene.start(newScene(eventData));
        }
    });
}






}