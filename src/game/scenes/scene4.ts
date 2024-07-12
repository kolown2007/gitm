import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { newScene } from '../statescene';
import { eventData } from "$lib/ablyclient";


export class scene4 extends Scene
{
    camera!: Phaser.Cameras.Scene2D.Camera;
    art!: Phaser.GameObjects.Image;
    gameText!: Phaser.GameObjects.Text;
    sprites!: Phaser.GameObjects.Group;

    private assets = [ 'scrap1','star','ghost1']; // Example asset keys
  

    constructor ()
    {
        super('scene4');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x000000);
        this.camera.setBackgroundColor(0x000000);

        // Add background image
        const bgImage = this.add.image(0, 0, 'ghost1');
        bgImage.setOrigin(0, 0);
        bgImage.setScale(this.cameras.main.width / bgImage.width, this.cameras.main.height / bgImage.height);
        this.sprites = this.add.group();

        // Every 1000 milliseconds (1 second), add a new sprite
        this.time.addEvent({
            delay: 1000,
            callback: this.spawnSprite,
            callbackScope: this,
            loop: true
        });

        EventBus.emit('current-scene-ready', this);
    }




    spawnSprite() {
        // Create a new sprite at a random position
       let randomAsset = Phaser.Math.RND.pick(this.assets);
        const sprite = this.add.sprite(
            Phaser.Math.RND.between(0, this.cameras.main.width),
            Phaser.Math.RND.between(0, this.cameras.main.height),
            randomAsset
        );

        // Set a random scale for the sprite
        sprite.setScale(Phaser.Math.RND.realInRange(0.1, 0.6));

        // Add the new sprite to the group
        this.sprites.add(sprite);

        // Apply a fade-out effect over 2 seconds and then remove the sprite
        this.tweens.add({
            targets: sprite,
            alpha: { from: 1, to: 0 },
            duration: 40000,
            onComplete: () => {
                sprite.destroy();
            }
        });
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