import { Scene } from 'phaser';



export class Preloader extends Scene

{

    private scenes!: string[];


    constructor ()
    {
        super('Preloader');
        this.scenes = ['scene1', 'scene2', 'scene4','scene5','scene6']; // List of possible scenes to transition to
    }

   
    preload ()
    {

        
        this.load.setPath('https://kolown.net/assets/gitm/');
        
        //ghost paintings
        for (let i = 0; i <= 14; i++) {
            this.load.image(`ghost${i}`, `ghost${i}.png`);
        }
        
     
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
         this.scene.start('scene2');

        // const introScene = this.scenes[Math.floor(Math.random() * this.scenes.length)];
        // this.scene.start(introScene)


    }
}


