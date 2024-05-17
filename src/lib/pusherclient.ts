import Pusher from 'pusher-js';
import { writable } from 'svelte/store';


// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('0c270d7232e186fdc1c8', {
  cluster: 'ap1'
});


var channel = pusher.subscribe('my-channel');
export let eventData = writable(""); // Svelte store to hold event data

channel.bind('my-event', function(data: any) {
    // eventData.set(JSON.stringify(data)); // Update the store with the new data

    eventData.set(data);
});