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
    circles: Phaser.GameObjects.Arc[] = [];
    originalPositions: { x: number, y: number }[] = [];

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
            this.circles.push(circle);
            this.originalPositions.push({ x, y });

            this.tweens.add({
                targets: circle,
                alpha: 0,
                yoyo: true,
                repeat: -1,
                duration: 1000,
                delay: i * 100
            });
        }

        initializeAbly(this, () => this.loveEffects());

        EventBus.emit('current-scene-ready', this);
    }

    private loveEffects() {
        console.log("still loading");
        this.flyCirclesRandomly();
        this.time.delayedCall(2000, () => this.returnCirclesToOriginalPositions());
    }

    private flyCirclesRandomly() {
        this.circles.forEach(circle => {
            const randomX = Phaser.Math.Between(0, this.cameras.main.width);
            const randomY = Phaser.Math.Between(0, this.cameras.main.height);
            this.tweens.add({
                targets: circle,
                x: randomX,
                y: randomY,
                duration: 1000,
                ease: 'Power2'
            });
        });
    }

    private returnCirclesToOriginalPositions() {
        this.circles.forEach((circle, index) => {
            const { x, y } = this.originalPositions[index];
            this.tweens.add({
                targets: circle,
                x: x,
                y: y,
                duration: 1000,
                ease: 'Power2'
            });
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