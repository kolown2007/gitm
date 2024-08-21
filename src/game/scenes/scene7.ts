import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { newScene } from '../statescene';
import { eventData } from "$lib/ablyclient";

//scene 7 screen crack

export class scene7 extends Scene {
    camera!: Phaser.Cameras.Scene2D.Camera;
    background!: Phaser.GameObjects.Image;
    points: Phaser.Geom.Point[] = [];
    graphics!: Phaser.GameObjects.Graphics;
    origin!: Phaser.Geom.Point;

    constructor() {
        super('scene7');
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x000000);

        // Create a graphics object for drawing
        this.graphics = this.add.graphics({ lineStyle: { width: 0.5, color: 0x404040 } });

        // Initialize with a random starting point
        this.origin = new Phaser.Geom.Point(
            Phaser.Math.Between(0, this.cameras.main.width),
            Phaser.Math.Between(0, this.cameras.main.height)
        );
        this.points.push(this.origin);

  
 
        // Draw the first line
        this.drawLine();

        // Add event listener for mouse click
        this.input.on('pointerdown', () => {
            this.drawLine();
        });

 




        EventBus.emit('current-scene-ready', this);
    }





    drawLine() {
        // Choose a random starting point from the points array
        const startPoint = Phaser.Utils.Array.GetRandom(this.points);

        // Generate a random angle for the new line
        const angle = Phaser.Math.FloatBetween(0, 2 * Math.PI);

        // Calculate intersection with screen boundaries
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;

        let intersectionPoint: Phaser.Geom.Point;

        if (Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle))) {
            // Intersect with left or right boundary
            if (Math.cos(angle) > 0) {
                intersectionPoint = new Phaser.Geom.Point(screenWidth, startPoint.y + (screenWidth - startPoint.x) * Math.tan(angle));
            } else {
                intersectionPoint = new Phaser.Geom.Point(0, startPoint.y + (0 - startPoint.x) * Math.tan(angle));
            }
        } else {
            // Intersect with top or bottom boundary
            if (Math.sin(angle) > 0) {
                intersectionPoint = new Phaser.Geom.Point(startPoint.x + (screenHeight - startPoint.y) / Math.tan(angle), screenHeight);
            } else {
                intersectionPoint = new Phaser.Geom.Point(startPoint.x + (0 - startPoint.y) / Math.tan(angle), 0);
            }
        }

        // Draw the line
        this.graphics.lineBetween(startPoint.x, startPoint.y, intersectionPoint.x, intersectionPoint.y);

        // Add the new endpoint to the points array
        this.points.push(intersectionPoint);

        // Occasionally branch out
        if (Phaser.Math.Between(0, 100) < 30) { // 30% chance to branch
            this.drawLine();
        }

        // Connect the dots to form closed shapes
        if (this.points.length > 2) {
            const firstPoint = this.points[0];
            this.graphics.lineBetween(intersectionPoint.x, intersectionPoint.y, firstPoint.x, firstPoint.y);
        }
    }

    // This will have a fade out effect when changing scenes
    changeScene() {
        this.cameras.main.fadeOut(1000, 0, 0, 0, (camera: any, progress: number) => {
            if (progress === 1) {
                this.scene.start(newScene(eventData));
            }
        });
    }

    private lastDrawTime: number = 0;

    update(time: number, delta: number) {
        // Draw a new line every second
        if (time - this.lastDrawTime > 1000) {
            this.drawLine();
            this.lastDrawTime = time;
        }
    }
}