declare module '*.svg' {
	import { SvelteComponent } from 'svelte';
	const content: SvelteComponent;
	export default content;
}

declare module '*.svg?component' {
	import { SvelteComponent } from 'svelte';
	// removing typeof here will cause JSX to complain.
	const content: typeof SvelteComponent;
	export default content;
}

declare module '*.svg?raw' {
	const content: string;
	export default content;
}

declare module '*.svg?url' {
	const content: string;
	export default content;
}
