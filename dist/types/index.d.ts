import { Plugin } from 'vite';
import { PluginOptions } from './types';
/**
 * Initializes the plugin instance.
 *
 * @param options vite plugin svelte svgr global options.
 */
declare function initPlugin(opts?: PluginOptions): Plugin;
export * from './types';
export default initPlugin;
import './ambient';