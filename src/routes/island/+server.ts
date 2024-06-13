import { render } from 'svelte/server';
import { error } from '@sveltejs/kit';
import { read } from '$app/server';
import island_url from './islands.json?url';
import { compile } from 'svelte/compiler';

const components: Record<string, any> = import.meta.glob('./*.svelte', {
	eager: true
});
const components_css: Record<string, any> = Object.fromEntries(
	Object.entries(
		import.meta.glob('./*.svelte', {
			eager: true,
			query: 'raw'
		})
	).map(([key, { default: text }]) => {
		return [key, compile(text, { dev: false, filename: 'input.svelte' }).css?.code || ''];
	})
);

export async function POST({ request }) {
	const params = await request.json();
	const to_load: any = await read(island_url).json();
	const entry = to_load.find((entry: any) => entry.id === params.id);
	if (!entry) error(404, 'Not found');

	await new Promise((r) => setTimeout(r, 1000)); // simulate async loading

	const name = './' + entry.component + '.svelte';
	const Component = components[name].default;
	const props = entry.props;
	const { body } = render(Component, { props });
	const css = components_css[name];
	return new Response(body + (css ? `<style>${css}</style>` : ''), {
		headers: {
			'content-type': 'text/html'
		}
	});
}
