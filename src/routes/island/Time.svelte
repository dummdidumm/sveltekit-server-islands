<script lang="ts">
	let { id } = $props();
</script>

<p>This ID is generated at random on the server at prerender time: {id}</p>
<p>Time: {new Date().toISOString()}</p>

<style>
	p {
		margin: 10px 20px;
	}
</style>
