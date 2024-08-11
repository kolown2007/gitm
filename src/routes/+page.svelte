<script lang="ts">
        import type { PageData } from './$types';
        import {eventData} from "$lib/ablyclient";
        
    import type { Scene } from "phaser";
    import type { scene1 } from "../game/scenes/scene1";
  
    import PhaserGame, { type TPhaserRef } from "../game/PhaserGame.svelte";

    // The sprite can only be moved in the MainMenu Scene
    let canMoveSprite = false;

    //  References to the PhaserGame component (game and scene are exposed)
    let phaserRef: TPhaserRef = { game: null, scene: null};
   



    const changeScene = () => {

        const scene = phaserRef.scene as scene1;

        if (scene)
        {

            // Call the changeScene method defined in the `MainMenu`, `Game` and `GameOver` Scenes
            scene.changeScene();

        }

    }
    


    

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Scene) => {
    canMoveSprite = (scene.scene.key !== "MainMenu");

    }

   

     
// $: {
//         // Subscribe to eventData
//         eventData.subscribe(message => {
            
//             if (message) {
//                 console.log("executing...");
//                 console.log(message);
//                 changeScene();
//             }
//         });
//     }






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