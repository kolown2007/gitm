import { PUSHER_APP_ID } from '$env/static/private';
import Pusher from 'pusher-js';
import { writable } from 'svelte/store';




var pusher = new Pusher(PUSHER_APP_ID, {
  cluster: 'ap1'
});


var channel = pusher.subscribe('my-channel');


export let eventData = writable(""); // Svelte store to hold event data
channel.bind('my-event', function(data: any) {
    //eventData.set(JSON.stringify(data)); // Update the store with the new data

    eventData.set(data);
});