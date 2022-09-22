# Vite Plugin Svelte SVGR

<div style="margin-bottom: 12px;">
  <img src="fixtures/example.png" alt="Plugin example image" width="300"/>
</div>

A Vite plugin which enables SVG import similar to what you may be accustomed to in React.

This plugin will preprocess SVG elements for [SvelteKit](https://kit.svelte.dev/) that may then be easily imported into your project. Additionally the proper types for Typescript users have been provided.

**Note**

While this plugin or similar may be required for your needs I would encourage you to consider using a library such as [Iconify](https://docs.iconify.design/) if you are only interested in using Icons from icon sets.

[See Instructions for Typescript](#imports-with-typescript)

## Install

```sh
pnpm i vite-plugin-svelte-svgr -D
```

```sh
yarn add vite-plugin-svelte-svgr --dev
```

```sh
npm install vite-plugin-svelte-svgr -D
```

## Configuration

Import the plugin and extend `svelte.config.js` with an instance of the plugin containing your options as shown below.

### @sveltejs/kit@1.0.0-next.346 and Above

Defined in `vite.config.js`

```js
import svgr from 'vite-plugin-svelte-svgr';
import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	// see https://github.com/svg/svgo for svgo plugin options.
	plugins: [sveltekit(), svgr()]
};
export default config;
```

### @sveltejs/kit@1.0.0-next.345 and Below

Defined in `svelte.config.js`

```js
import svgr from 'vite-plugin-svelte-svgr';
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  ...,
  kit: {
    ...,
    vite: {
      // see https://github.com/svg/svgo for svgo plugin options.
      plugins: [sveltekit(), svgr()]
    }
  }
};
export default config
```

## Advanced Options

It's not uncommon to have one group of svg icons that you use as urls or raw only, while others you may wish to use as a component. This can be achieved by defining your include/exclude parameters along with whatever [SVGO](https://github.com/svg/svgo) options you wish to use.

**Example specifying type with include**

When no query is used the defined type below will be applied for any SVG in the included path.

```svelte
<script lang="ts">
  import SomeSvg from '$lib/icons/raw/some.svg'
</script>
```

```js
// see above for imports excluded for brevity.
const config = {
	plugins: [
		sveltekit(),
		svgr({
			type: 'raw',
			// see https://github.com/rollup/plugins/tree/master/packages/pluginutils#createfilter
			// for how to use root, include and exclude options. If you are familiar with Rollup's
			// create filter it's exactly that utility here doing its magic!!
			include: ['src/lib/icons/raw']
		})
	]
};
```

**Note**

If in the case above you imported as `from '$lib/icons/raw/some.svg?component'` then the type designation in the configuration would be overridden a SvelteComponent SVG would be returned instead.

### SVGO Options

The following shows an example with customized SVGO options. It demonstrates how to override the default present as well as adding an attribute to all SVGs. In this case setting fill to "currentColor" which is a common use case causing the SVG to inherit or use the current css color property from the parent element. To make your SVG work like icons from iconsets setting this attribute or perhaps `stroke` is likely what you're after!

```js
const svgoOptions = {
	multipass: true,
	plugins: [
		// Ensuring viewbox isn't removed.
		{
			name: 'preset-default',
			params: {
				overrides: {
					removeViewBox: false
				}
			}
		},
		{
			// setting fill attribute to "currentColor"
			name: 'addAttributesToSVGElement',
			params: {
				attributes: [{ fill: 'currentColor' }]
			}
		}
	]
};

// showing config in `vite.config.js` for older
// svelte kit configurations see above.
const config = {
	plugins: [
		sveltekit(),
		svgr({
			svgo: svgoOptions
		})
	]
};

export default config;
```

## Usage

**Import as Component:**

Use the component as you would any Svelte component including passing props.

While you can import without using the ?component param typings may complain due to default exports being overridden. If Typescript complains just use the `"./some/path/icon.svg?component"` instead of `"./some/path/icon.svg"`

```svelte
<script>
  import Logo from "./logo.svg?component";
</script>

<Logo width={200} />
```

Or perhaps a class when using [Tailwind](https://tailwindcss.com/)

```svelte
  <Logo class="w-5 h-5">
```

**Url Import**

```svelte
<script>
  import logoUrl from "./logo.svg?url";
</script>

<img src={logoUrl} />
```

**Raw Import**

```svelte
<script>
  import logo from "./logo.svg?raw";
</script>

{@html logo}
```

## Options

While not using [Rollup](https://rollupjs.org/guide/en/) we are underneath using a filtering tool created for Rollup. See [reference](https://github.com/rollup/plugins/tree/master/packages/pluginutils#createfilter) for more information on how to use `root`, `include` and `exclude` properties.

```ts
interface Options {
	/**
	 * The default output type for imported SVG.
	 *
	 * @default 'component'
	 */
	type?: SvgType;

	/**
	 * The root path that below include/exclude scopes will be resolved from.
	 * If undefined process.cwd() is used and likely what you want.
	 *
	 * @default undefined
	 */
	root?: string;

	/**
	 * The scopes/paths to be processed. If undefined all resolved SVG are processed.
	 *
	 * @default undefined
	 */
	include?: FilterPattern;

	/**
	 * The scopes/paths to be excluded. If undefined no svg files will be unprocessed.
	 *
	 * @default undefined
	 */
	exclude?: FilterPattern;

	/**
	 * Specify svgo options, leave undefined for defaults or false to disabled
	 * optimization. The plugin will also look for `svgo.config.js` if you prefer
	 * a configuration file.
	 *
	 * @see https://github.com/svg/svgo
	 * @default undefined
	 */
	svgo?: OptimizeOptions | boolean;
}
```

## Imports with Typescript

You'll likely want to create a reference to the ambient modules types in your `app.d.ts` (for Svelte Kit) or applicable. Typescript will likely complain about importing a path like`./path/to/some.svg?component`;

Simply add the reference to our plugin and the error should go away. **After updating you may need to close your editor or restart the [Typescript](https://www.typescriptlang.org/) server**.

```ts
/* app.d.ts or other global types file */
/// <reference types="vite-plugin-svelte-svgr" />
```

**You can also reference in tsconfig.json**

```json
{
	"compilerOptions": {
		"types": ["vite-plugin-svelte-svgr"]
	}
}
```

## Jest Testing

To make [Jest](https://jestjs.io/) happy you'll need to adjust your `jest.config.js` telling Jest how to handle `.svg` components. There are a couple of ways of doing this. Here's one.

Install the `jest-transform-stub`

```js
module.exports = {
  ...
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-transform-stub',
  }
};
```

Another options is to create a Mock component then point the module mapper to the Mock component. This is similar to what you might do with React and `createClass`.

**Create Mock Component**

Create an empty SVG element at `src/lib/icons/Mock.svelte`

```svelte
<svg />
```

**Update Jest Config**

Update module name mapper to reflect the above path in your `package.json` or jest config file.

```js
module.exports = {
	moduleNameMapper: {
		'^.+\\.svg$': '<rootDir>/src/lib/icons/Mock.svelte'
	}
};
```

## Docs

See [https://blujedis.github.io/vite-plugin-svelte-svgr/](https://blujedis.github.io/vite-plugin-svelte-svgr/)

## License

See [LICENSE](LICENSE)
