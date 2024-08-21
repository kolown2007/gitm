import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { newScene } from '../statescene';
import { eventData } from "$lib/ablyclient";
import { initializeAbly } from "$lib/ablyclient";

//HALFWAY ---> black loading screen

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
        this.camera = this.cameras.main;
        
        this.cameras.main.setBackgroundColor(0x000000);

        const graphics = this.add.graphics({ fillStyle: { color: 0xffffff } });
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        const radius = 100; // Radius of the larger circle
        const circleRadius = 10; // Radius of the small circles
        const numCircles = 12; // Number of small circles
    
        // Create and position the circles
        for (let i = 0; i < numCircles; i++) {
            const angle = Phaser.Math.DegToRad((360 / numCircles) * i);
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
    
            const circle = this.add.circle(x, y, circleRadius, 0xffffff);
            this.tweens.add({
                targets: circle,
                alpha: 0,
                yoyo: true,
                repeat: -1,
                duration: 1000,
                delay: i * 100
            });
        }

        //initializeAbly(this, () => this.loveEffects());

        EventBus.emit('current-scene-ready', this);
    }


    private loveEffects() {
        console.log("still loading");
    }



    changeScene() {
        this.cameras.main.fadeOut(1000, 0, 0, 0, (camera: any, progress: number) => {
            if (progress === 1) {
                this.scene.start(newScene(eventData));
            }
        });
    }


}
