import { get } from 'svelte/store';

export const stateScenes = {
    state1: ['scene1'],
    state2: ['scene2'],
    state3: ['scene3'],
    state4: ['scene1', 'scene2'],
    state5: ['scene1', 'scene3'],
    state6: ['scene2', 'scene3'],
    state7: ['scene1', 'scene2', 'scene3'],
  };


export function newScene(newState: any) {
    // Get the current value of eventData
    const eventData = get(newState);

    // Check if eventData is a valid key in stateScenes
    if (!(eventData as keyof typeof stateScenes in stateScenes)) {
        console.error('Invalid state:', eventData);
        return;
    }

    // Get the array of scenes for the current state
    const scenes = stateScenes[eventData as keyof typeof stateScenes];

    // Check if scenes is an array
    if (!Array.isArray(scenes)) {
        console.error('scenes is not an array');
        return;
    }

    // Select a random scene from the array
    const randomScene = scenes[Math.floor(Math.random() * scenes.length)];

    return randomScene;
}