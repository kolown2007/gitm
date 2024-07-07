import { PUBLIC_ABLY } from "$env/static/public";
import Ably from "ably";
import { writable } from 'svelte/store';



const ably = new Ably.Realtime(
  PUBLIC_ABLY
  );
console.log("Connected");
  var channel = ably.channels.get("get-started");

  export let eventData = writable(""); // Svelte store to hold event data


channel.subscribe("first", (message) => {
    console.log("Message received: " + message.data)
    eventData.set(message.data);
  });


