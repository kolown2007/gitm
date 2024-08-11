import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

   
    preload ()
    {

        
        this.load.setPath('https://kolown.net/assets/gitm/');
        
        //ghost paintings
        this.load.image('ghost', 'ghost.png');
        this.load.image('ghost1', 'ghost1.png');
        
     
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('scene2');
    }
}
