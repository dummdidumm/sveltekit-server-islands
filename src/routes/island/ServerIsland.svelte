<script context="module">
	let id = 0;
	const to_load: Array<{ component: any; props: any; id: string }> = [];
</script>

<script lang="ts" generics="CProps extends Record<string, any> ">
	import type { Snippet, Component } from 'svelte';
	import { browser, building } from '$app/environment';
	import island_url from './islands.json?url';
	import * as fs from 'fs';

	type Props = { [K in keyof CProps]: CProps[K] } & {
		component: Component<CProps>;
		children?: Snippet;
	};
	let { component, children, ...props }: Props = $props();

	if (building && !browser) {
		id++;
		to_load.push({ component: component.name, props, id: String(id) });
		fs.writeFileSync('.svelte-kit/output/server' + island_url, JSON.stringify(to_load, null, 2));
	}
</script>

{#if building && !browser}
	<div style="display:contents" data-sveltekit-island={id}>
		{@render children?.()}
	</div>
{:else}
	<svelte:component this={component} {...props} />
{/if}
