import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

   
    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');
        this.load.image('logo', 'logo.png');
        this.load.image('star', 'star.png');

        //ghost paintings
        this.load.image('ghost1', 'ghost.png');

        //scrap paintings
        this.load.image('scrap1', '1.jpg');
        

        this.load.glsl('fireball', 'shaders/shader0.frag');
        this.load.glsl('sea', 'shaders/shader1.frag');
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('scene4');
    }
}
