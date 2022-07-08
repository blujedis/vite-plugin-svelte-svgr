import { sveltekit } from '@sveltejs/kit/vite';
import svgr from '../dist/index.mjs';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		svgr({
			svgo: {
				plugins: [
					{
						name: 'addAttributesToSVGElement',
						params: {
							attributes: [{ fill: 'currentColor' }]
						}
					}
				]
			}
		})
	]
};

export default config;
