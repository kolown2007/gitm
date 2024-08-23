import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { newScene } from '../statescene';
import { eventData } from "$lib/ablyclient";

//scene 6 korean art collection

export class scene6 extends Scene
{
    camera!: Phaser.Cameras.Scene2D.Camera;
    background!: Phaser.GameObjects.Image;
    gameText!: Phaser.GameObjects.Text;

    constructor ()
    {
        super('scene6');
    }

    create ()
    {
        this.camera = this.cameras.main;
        // this.camera.setBackgroundColor(0xADD8E6);

    this.camera.setSize(this.camera.width, this.camera.height);

    //ghostpainting 
    let ghostpainting = 'ghost'+ Math.floor(Math.random() * 15);


  const logo = this.add.image(0, 0, ghostpainting).setOrigin(0.5, 0.5);
  logo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

  // Scale the image to fill the entire screen
logo.displayWidth = this.cameras.main.width;
logo.displayHeight = this.cameras.main.height;

//this.applyLogoEffectsAndAnimation(logo);

   
      
         EventBus.emit('current-scene-ready', this);
    }

    applyLogoEffectsAndAnimation(logo: any) {
        if (logo.preFX) {
            // Apply effects
            logo.preFX.addBarrel(2);
            logo.preFX.addBokeh(8);
            logo.preFX.addGlow(0x00ff00, 100, 100);
        }

        // Add animation
        this.tweens.add({
            targets: logo,
            angle: 360, // Rotate 360 degrees
            duration: 2000, // Duration of the rotation in milliseconds
            ease: 'linear', // Easing function
            repeat: -1 // Repeat indefinitely
        });
    }
    
   
    changeScene() {
        this.cameras.main.fadeOut(1000, 0, 0, 0, (camera: any, progress: number) => {
            if (progress === 1) {
                this.scene.start(newScene(eventData));
            }
        });
    }

}