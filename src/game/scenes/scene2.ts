import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { newScene } from '../statescene';
import { eventData } from "$lib/ablyclient";


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
        this.camera.setBackgroundColor(0xFFC0CB);

        this.background = this.add.sprite(0, 0, 'ghost1');
        this.background.setOrigin(0, 0);
        this.background.setScale(this.camera.width / this.background.width, this.camera.height / this.background.height);

        
        const logo = this.add.image(0, 0, 'ghost1');
        logo.setOrigin(0,0);
        logo.setScale(this.camera.width / this.background.width, this.camera.height / this.background.height);

       if (logo.preFX) {
           logo.preFX.addBlur();
       }

    this.tweens.add({
        targets: logo,
        x: this.camera.width - logo.width,
        duration: 2000,
        ease: 'Linear',
        yoyo: true,
        repeat: -1
    });
  

        EventBus.emit('current-scene-ready', this);
    }
// this will have a fade out effect when changing scenes
    changeScene() {
        this.cameras.main.fadeOut(1000, 0, 0, 0, (camera: any, progress: number) => {
            if (progress === 1) {
                this.scene.start(newScene(eventData));
            }
        });
    }

}