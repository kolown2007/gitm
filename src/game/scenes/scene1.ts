import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { newScene } from '../statescene';
import { eventData } from "$lib/ablyclient";


export class scene1 extends Scene
{
    camera!: Phaser.Cameras.Scene2D.Camera;
    background!: Phaser.GameObjects.Image;
    gameText!: Phaser.GameObjects.Text;

    constructor ()
    {
        super('scene1');
    }

    create ()
    {
      
        this.cameras.main.setBackgroundColor(0x000000);
        this.add.shader('fireball', this.cameras.main.width/2,  this.cameras.main.height/2, this.cameras.main.width, this.cameras.main.height);
   

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
