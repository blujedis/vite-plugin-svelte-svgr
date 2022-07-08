import { promises } from 'fs';
import { compile } from 'svelte/compiler';
import { optimize } from 'svgo';
import { createFilter } from '@rollup/pluginutils';

// src/index.ts
var { readFile } = promises;
var SVG_PARTS_EXP = /(<svg.*?)(>.*)/s;
var SVG_SUFFIX_EXP = /\.svg(\?.*)$/;
var SVG_MATCH_EXP = /\.svg(?:\?(raw|url|component))?$/;
var DEFAULTS = {
  type: "component"
};
var SVGO_DEFAULTS = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false
        }
      }
    }
  ]
};
var cache = /* @__PURE__ */ new Map();
function extendWithProps(data) {
  const parts = SVG_PARTS_EXP.exec(data);
  if (!parts)
    throw new Error("Data is not a valid SVG element.");
  const [, head, body] = parts;
  return `${head} {...$$props}${body}`;
}
function isSVGOError(err) {
  return typeof err === "object" && err !== null && !("data" in err);
}
function initPlugin(opts = { type: "component" }) {
  opts = {
    ...DEFAULTS,
    ...opts
  };
  const shouldOptimize = !!opts.svgo || typeof opts.svgo === "undefined";
  let svgoOptions = opts.svgo || {};
  svgoOptions = svgoOptions === true ? { ...SVGO_DEFAULTS } : svgoOptions;
  let filter;
  if (opts.include || opts.exclude)
    filter = createFilter(opts.include, opts.exclude, { resolve: opts.root });
  return {
    name: "svelte-svgr",
    async transform(src, id, options) {
      const match = id.match(SVG_MATCH_EXP);
      if (!(match || []).length || filter && !filter(id))
        return null;
      const isSSR = options == null ? void 0 : options.ssr;
      if (match) {
        const type = match[1] || opts.type;
        if (type && type === "url")
          return src;
        try {
          const cacheid = `${id}:${isSSR}`;
          const cached = cache.get(cacheid);
          if (cached)
            return cached;
          const filename = id.replace(SVG_SUFFIX_EXP, ".svg");
          let data = (await readFile(filename)).toString("utf-8");
          const optimized = shouldOptimize ? optimize(data, { ...svgoOptions, path: filename }) : { data };
          if (isSVGOError(optimized)) {
            console.error("Got optimize error from SVGO:", optimized);
            return void 0;
          }
          if (type === "raw") {
            data = `
export default \`${optimized.data}\`;`;
          } else {
            optimized.data = extendWithProps(optimized.data);
            const { js } = compile(optimized.data, {
              css: false,
              filename: id,
              hydratable: true,
              namespace: "svg",
              generate: isSSR ? "ssr" : "dom"
            });
            delete js.map;
            data = js;
          }
          cache.set(cacheid, data);
          return data;
        } catch (err) {
          const { stack } = err;
          const message = `SVG at ${id} could NOT be resolved. See stack below.`;
          console.error(`${message}
${stack}`);
        }
      }
      return null;
    }
  };
}
var src_default = initPlugin;

export { src_default as default };
//# sourceMappingURL=index.mjs.map