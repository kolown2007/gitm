<script lang="ts">
        import type { PageData } from './$types';
        
    import type { Scene } from "phaser";
    import PhaserGame, { type TPhaserRef } from "../game/PhaserGame.svelte";

    // The sprite can only be moved in the MainMenu Scene
    let canMoveSprite = false;

    //  References to the PhaserGame component (game and scene are exposed)
    let phaserRef: TPhaserRef = { game: null, scene: null};
   
    let lastTap = 0;
    // Event emitted from the PhaserGame component
    const currentScene = (scene: Scene) => {
    canMoveSprite = (scene.scene.key !== "MainMenu");

    }


    document.addEventListener('touchend', handleDoubleTap);

    function handleDoubleTap(event: any) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
            reloadWindow();
        }
        lastTap = currentTime;
    }

    document.addEventListener('dblclick', reloadWindow);

    function reloadWindow() {
        window.location.reload();
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