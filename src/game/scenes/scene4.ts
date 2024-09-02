import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { newScene } from '../statescene';
import { eventData, initializeAbly } from "$lib/ablyclient";


//scene 4 random colors

export class scene4 extends Scene
{
    camera!: Phaser.Cameras.Scene2D.Camera;
    art!: Phaser.GameObjects.Image;
    gameText!: Phaser.GameObjects.Text;
    sprites!: Phaser.GameObjects.Group;

   
    constructor ()
    {
        super('scene4');
    }

    create ()
    {

        
        this.camera = this.cameras.main;
        //this.camera.setBackgroundColor(Phaser.Display.Color.RandomRGB().color);


        this.bgeffects();
  
    

     
        initializeAbly(this, () => this.loveEffects());
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


    private loveEffects() {
        // this.camera.setBackgroundColor(Phaser.Display.Color.RandomRGB().color)
        this.bgeffects();
    }


    private bgeffects() {

        const bg = this.add.image(0,0, '__WHITE').setOrigin(0, 0);

        bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        const gradient = bg.preFX.addGradient();

    

        gradient.color1 = Phaser.Display.Color.RandomRGB().color
        gradient.color2 = Phaser.Display.Color.RandomRGB().color
        gradient.size = Phaser.Math.Between(15, 30);
    
      

    }
    


}



