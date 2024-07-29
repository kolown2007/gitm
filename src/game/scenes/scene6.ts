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
  

    this.background = this.add.image(0,0, 'landscape1').setOrigin(0, 0);;
    this.background.setScale(this.camera.width / this.background.width);

        // Set the camera bounds to match the height of the background image
         let imageHeight = this.background.height * this.background.scaleY;
        // console.log(imageHeight);
         this.cameras.main.setBounds(0, 0, this.camera.width, imageHeight);
         this.camera.scrollY = imageHeight - this.camera.height;

 //  From here down is just camera controls and feedback
var cursors = this.input.keyboard?.createCursorKeys();

 var controlConfig = {
     camera: this.cameras.main,
     up: cursors?.up,
     down: cursors?.down,
     acceleration: 0.06,
     drag: 0.0005,
     maxSpeed: 1.0
 };

 this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);



         //this doesnt work with the camera
         //EventBus.emit('current-scene-ready', this);
    }

    update (time: number, delta: number)
    {
        this.controls.update(delta);

       
    }
    
   
    changeScene() {
        this.cameras.main.fadeOut(1000, 0, 0, 0, (camera: any, progress: number) => {
            if (progress === 1) {
                this.scene.start(newScene(eventData));
            }
        });
    }

}