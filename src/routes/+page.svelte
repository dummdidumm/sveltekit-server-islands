<script lang="ts">
	import ServerIsland from './island/ServerIsland.svelte';
	import Time from './island/Time.svelte';
</script>

<h1>SvelteKit Server Islands</h1>
<p>This is static content</p>
<p>
	The following is render dynamically by fetching on the client and replacing the fallback with the
	returned HTML:
</p>

<ServerIsland component={Time} id={Math.random()}>
	<p>Loading...</p>
</ServerIsland>
