# SvelteKit Server Islands

A quick experiment to see if it's possible to have SvelteKit + "server islands", i.e. prerendered shell and dynamic server-rendered bits.

How it works:

- create a `ServerIsland` component to which you pass the components you want to render dynamically
- that component writes the info to a file during prerendering
- `app.html` contains a tiny script that queries for islands
- each of those are fetched from a server endpoint, which picks up the info from prerendering and renders the component to HTML
- script replaces placeholder of island with actual content
