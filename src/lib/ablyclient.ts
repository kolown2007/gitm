import { PUBLIC_ABLY } from "$env/static/public";
import Ably from "ably";
import { writable } from 'svelte/store';


const ably = new Ably.Realtime(
  PUBLIC_ABLY
  );
console.log("Connected");
  var channel = ably.channels.get("get-started");

   export let eventData = writable("");



channel.subscribe("first", (message) => {
  // console.log(`event-> first: msg-> ${message.data}`);
   eventData.set(message.data);

});


export function initializeAbly(scene: Phaser.Scene, callback: () => void) {
  channel.subscribe("endless", (message) => {
    if (scene.scene.isActive() && scene.scene.isVisible()) {
      callback();
    } else {
      console.log('Scene is not active or visible, skipping callback execution.');
    }
  });
}