import type { OptimizeOptions } from 'svgo';
export declare type SvgType = 'raw' | 'url' | 'component';
export { OptimizeOptions };
export declare type FilterPattern = ReadonlyArray<string | RegExp> | string | RegExp | null;
export interface PluginOptions {
    /**
     * The default output type for imported SVG.
     *
     * @default 'component'
     */
    type?: SvgType;
    /**
     * The root path that below include/exclude scopes will be resolved from.
     * If undefined process.cwd() is used and likely what you want.
     */
    root?: string;
    /**
     * The scopes/paths to be processed. If undefined all resolved SVG are processed.
     */
    include?: FilterPattern;
    /**
     * The scopes/paths to be excluded. If undefined no svg files will be unprocessed.
     */
    exclude?: FilterPattern;
    /**
     * Specify svgo options, leave undefined for defaults or false to disabled
     * optimization. The plugin will also look for `svgo.config.js` if you prefer
     * a configuration file.
     *
     * @default true uses SVGO defaults.
     * @see https://github.com/svg/svgo
     */
    svgo?: OptimizeOptions | boolean;
}
