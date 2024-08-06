import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { newScene } from '../statescene';
import { eventData } from "$lib/ablyclient";

//scene 6 traditional korean art

export class scene6 extends Scene
{
    camera!: Phaser.Cameras.Scene2D.Camera;
    background!: Phaser.GameObjects.Image;
    gameText!: Phaser.GameObjects.Text;
    controls!: Phaser.Cameras.Controls.SmoothedKeyControl;

    constructor ()
    {
        super('scene6');
    }

    create ()
    {
        this.camera = this.cameras.main;
        // this.camera.setBackgroundColor(0xADD8E6);

    this.camera.setSize(this.camera.width, this.camera.height);



  const logo = this.add.image(0, 0, 'ghost').setOrigin(0.5, 0.5);
  logo.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

  // Scale the image to fill the entire screen
logo.displayWidth = this.cameras.main.width;
logo.displayHeight = this.cameras.main.height;

    if (logo.preFX) {
      
        //  logo.preFX.addBlur(2);
        //  logo.preFX.addBarrel(1);
        //  logo.preFX.addBokeh(5)
        //  logo.preFX.addBlur(2);
        //  logo.preFX.addBarrel(8);
        logo.preFX.addDisplacement('ghost',.05,3)
        logo.preFX.addBlur(2);
        logo.preFX.addBokeh(10)
  
    }

    this.tweens.add({
        targets: logo,
        angle: 200, // Rotate 360 degrees
        duration: 2000, // Duration of the rotation in milliseconds
        ease: 'Linear', // Easing function
        repeat: -1 // Repeat indefinitely
    });


      

      
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