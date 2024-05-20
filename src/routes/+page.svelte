<script lang="ts">
        import type { PageData } from './$types';
        import {eventData} from "$lib/pusherclient";
        
    import type { Scene } from "phaser";
    import type { MainMenu } from "../game/scenes/MainMenu";
    import type { scene1 } from "../game/scenes/scene1";
  
    import PhaserGame, { type TPhaserRef } from "../game/PhaserGame.svelte";

    // The sprite can only be moved in the MainMenu Scene
    let canMoveSprite = false;

    //  References to the PhaserGame component (game and scene are exposed)
    let phaserRef: TPhaserRef = { game: null, scene: null};
    const spritePosition = { x: 0, y: 0 };

    const changeScene = () => {

        const scene = phaserRef.scene as scene1;

        if (scene)
        {

            // Call the changeScene method defined in the `MainMenu`, `Game` and `GameOver` Scenes
            scene.changeScene();

        }

    }
    
    const moveSprite = () => {

        const scene = phaserRef.scene as MainMenu;

        if (scene)
        {

            // Get the update logo position
            (scene as MainMenu).moveLogo(({ x, y }) => {

                spritePosition.x = x;
                spritePosition.y = y;

            });

        }

    }

    const addSprite = () => {

        const scene = phaserRef.scene as Scene;

        if (scene)
        {

            // Add more stars
            const x = Phaser.Math.Between(64, scene.scale.width - 64);
            const y = Phaser.Math.Between(64, scene.scale.height - 64);

            //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
            const star = scene.add.sprite(x, y, 'star');

            //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
            //  You could, of course, do this from within the Phaser Scene code, but this is just an example
            //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
            scene.add.tween({
                targets: star,
                duration: 500 + Math.random() * 1000,
                alpha: 0,
                yoyo: true,
                repeat: -1
            });
            
        }

    }

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Scene) => {
    canMoveSprite = (scene.scene.key !== "MainMenu");

    }

   

     
$: {
        // Subscribe to eventData
        eventData.subscribe(message => {
            
            if (message) {
                console.log("executing...");
                console.log(message);
                changeScene();
            }
        });
    }





    </script>

<div id="app">
    <PhaserGame bind:phaserRef={phaserRef} currentActiveScene={currentScene} />
   
</div>



<style>
    #app {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
   
      
</style>