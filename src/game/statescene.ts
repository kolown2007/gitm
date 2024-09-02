import { get } from 'svelte/store';

export const stateScenes = {
    state1: ['scene1'], //loading screen
    state2: ['scene2'], //red alert
    state3: ['scene3'], //blue screen
    state4: ['scene4'], //random colors
    state5: ['scene5'],  //contemporary art collection
    state6: ['scene1','scene2', 'scene4', 'scene5'], //random visuals

  
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