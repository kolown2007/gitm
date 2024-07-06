<script lang="ts">
if ('serviceWorker' in navigator) {
	addEventListener('load', function () {
		navigator.serviceWorker.register('/service-worker.ts').then(function (registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            console.log('ServiceWorker registration failed: ', err);
        });
	});
}

</script>

<svelte:head>
    <title>Ghost in The Machine</title>
</svelte:head>

<slot />

<style>
    :global(body) {
        background-color: #0cc9bd;
        margin: 0;
        padding: 0;
        color: rgba(255, 255, 255, 0.87);
        background-color: #000000;
        font-family: Arial, Helvetica, sans-serif;
    }
</style>