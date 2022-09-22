/**
 * NOTE: Import not work without "?component" given
 * that third party modules may export *.svg" module.
 * This causes an issue with default exports and
 * declaration merging.
 */

/**
 * Just the common types here for simplicity.
 * It will allow for unknown properties.
 * You could override if you wish.
 */
interface SVGProps {
	className?: string | undefined | null;
	viewBox?: string | undefined | null;
	class?: string | undefined | null;
	color?: string | undefined | null;
	fill?: string | undefined | null;
	height?: number | string | undefined | null;
	id?: string | undefined | null;
	lang?: string | undefined | null;
	max?: number | string | undefined | null;
	media?: string | undefined | null;
	method?: string | undefined | null;
	min?: number | string | undefined | null;
	name?: string | undefined | null;
	style?: string | undefined | null;
	stroke?: string | undefined | null;
	'stroke-linecap'?: 'butt' | 'round' | 'square' | 'inherit' | undefined | null;
	'stroke-linejoin'?: 'miter' | 'round' | 'bevel' | 'inherit' | undefined | null;
	'stroke-opacity'?: number | string | undefined | null;
	'stroke-width'?: number | string | undefined | null;
	target?: string | undefined | null;
	type?: string | undefined | null;
	width?: number | string | undefined | null;
	[key: string]: string | number | undefined | null;
}

declare module '*.svg' {
	import { type SvelteComponentTyped } from 'svelte';
	class SVGComponent extends SvelteComponentTyped<SVGProps> {}
	export default SVGComponent;
}

declare module '*.svg?component' {
	import type { SvelteComponentTyped } from 'svelte';
	class SVGComponent extends SvelteComponentTyped<SVGProps> {}
	export default SVGComponent;
}

declare module '*.svg?raw' {
	const content: string;
	export default content;
}

declare module '*.svg?url' {
	const content: string;
	export default content;
}
