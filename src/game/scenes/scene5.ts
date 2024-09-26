import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { newScene } from '../statescene';
import { eventData, initializeAbly } from "$lib/ablyclient";

//scene 5 contemporary art colelction

export class scene5 extends Scene
{
    camera!: Phaser.Cameras.Scene2D.Camera;
    background!: Phaser.GameObjects.Image;
    gameText!: Phaser.GameObjects.Text;
    controls!: Phaser.Cameras.Controls.SmoothedKeyControl;
     ghostpainting!: string;

    constructor ()
    {
        super('scene5');
    }

    create ()
    {
        this.camera = this.cameras.main;
        // this.camera.setBackgroundColor(0xADD8E6);

    this.camera.setSize(this.camera.width, this.camera.height);

    //ghostpainting 
     this.ghostpainting = 'ghost'+ Math.floor(Math.random() * 15);


  const logo = this.add.image(0, 0, this.ghostpainting).setOrigin(0.5, 0.5);
  logo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

  // Scale the image to fill the entire screen
logo.displayWidth = this.cameras.main.width;
logo.displayHeight = this.cameras.main.height;

// this.applyLogoEffectsAndAnimation(logo);

   initializeAbly(this, () => this.loveEffects());
      
         EventBus.emit('current-scene-ready', this);
    }

  

    private currentTextState: number = 0;
  


    
   private loveEffects() {

    this.ghostpainting = 'ghost'+ Math.floor(Math.random() * 15);
    const logo = this.add.image(0, 0, this.ghostpainting).setOrigin(0.5, 0.5);
    logo.setPosition(Math.random()*this.cameras.main.width, Math.random()*this.cameras.main.height);

   }



    changeScene() {
        this.cameras.main.fadeOut(1000, 0, 0, 0, (camera: any, progress: number) => {
            if (progress === 1) {
                this.scene.start(newScene(eventData));
            }
        });
    }

}