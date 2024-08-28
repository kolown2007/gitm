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

  this.growRect();

        EventBus.emit('current-scene-ready', this);

}






changeScene() {
    this.cameras.main.fadeOut(1000, 0, 0, 0, (camera: any, progress: number) => {
        if (progress === 1) {
            this.scene.start(newScene(eventData));
        }
    });
}


growRect(){

    const rect = this.add.rectangle(
        this.cameras.main.centerX, // X position (center of the screen)
        this.cameras.main.height,  // Y position (bottom of the screen)
        this.cameras.main.width,                       // Width of the rectangle
        this.cameras.main.height,  // Height of the rectangle (full screen height)
        0xb00a28                   // Color of the rectangle
    );

 
    rect.setOrigin(0.5, 1);
    // Set the initial scale to 0 in the Y direction
    rect.setScale(1, 0);

    // Add a tween to animate the scaleY property
    this.tweens.add({
        targets: rect,
        scaleY: 1,                // Final scale in the Y direction
        duration: 30000,           // Duration of the animation in milliseconds
        onComplete: () => {
           this.scene.start("scene3")
        }
    });


}





}