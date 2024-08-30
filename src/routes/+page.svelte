<script lang="ts">
    import type { PageData } from './$types';
    import { eventData } from "$lib/ablyclient";
    import type { Scene } from "phaser";
    import type { scene1 } from "../game/scenes/scene1";
    import PhaserGame, { type TPhaserRef } from "../game/PhaserGame.svelte";

    // The sprite can only be moved in the MainMenu Scene
    let canMoveSprite = false;

    // References to the PhaserGame component (game and scene are exposed)
    let phaserRef: TPhaserRef = { game: null, scene: null };
    let lastTap = 0;

    // Add touchend event listener for double-tap detection
    document.addEventListener('touchend', handleDoubleTap);
    document.addEventListener('dblclick', reloadWindow);

    function handleDoubleTap(event: TouchEvent) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
            reloadWindow();
        }
        lastTap = currentTime;
    }

    function reloadWindow() {
        window.location.reload();
    }

    const changeScene = () => {
        const scene = phaserRef.scene as scene1;

        if (scene && typeof scene.changeScene === 'function') {
            // Call the changeScene method defined in the scene
            scene.changeScene();
        }
    }

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Scene) => {
        canMoveSprite = (scene.scene.key !== "MainMenu");
    }

    // Reactive statement to subscribe to eventData
    $: {
        eventData.subscribe(message => {
            if (message) {
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