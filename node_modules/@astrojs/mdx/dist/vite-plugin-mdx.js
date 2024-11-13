import { setVfileFrontmatter } from "@astrojs/markdown-remark";
import { getAstroMetadata } from "astro/jsx/rehype.js";
import { VFile } from "vfile";
import { createMdxProcessor } from "./plugins.js";
import { parseFrontmatter } from "./utils.js";
function vitePluginMdx(mdxOptions) {
  let processor;
  let sourcemapEnabled;
  return {
    name: "@mdx-js/rollup",
    enforce: "pre",
    buildEnd() {
      processor = void 0;
    },
    configResolved(resolved) {
      sourcemapEnabled = !!resolved.build.sourcemap;
      const jsxPluginIndex = resolved.plugins.findIndex((p) => p.name === "astro:jsx");
      if (jsxPluginIndex !== -1) {
        resolved.plugins.splice(jsxPluginIndex, 1);
      }
    },
    async resolveId(source, importer, options) {
      if (importer?.endsWith(".mdx") && source[0] !== "/") {
        let resolved = await this.resolve(source, importer, options);
        if (!resolved) resolved = await this.resolve("./" + source, importer, options);
        return resolved;
      }
    },
    // Override transform to alter code before MDX compilation
    // ex. inject layouts
    async transform(code, id) {
      if (!id.endsWith(".mdx")) return;
      const { data: frontmatter, content: pageContent, matter } = parseFrontmatter(code, id);
      const frontmatterLines = matter ? matter.match(/\n/g)?.join("") + "\n\n" : "";
      const vfile = new VFile({ value: frontmatterLines + pageContent, path: id });
      setVfileFrontmatter(vfile, frontmatter);
      if (!processor) {
        processor = createMdxProcessor(mdxOptions, { sourcemap: sourcemapEnabled });
      }
      try {
        const compiled = await processor.process(vfile);
        return {
          code: String(compiled.value),
          map: compiled.map,
          meta: getMdxMeta(vfile)
        };
      } catch (e) {
        const err = e;
        err.name = "MDXError";
        err.loc = { file: id, line: e.line, column: e.column };
        Error.captureStackTrace(err);
        throw err;
      }
    }
  };
}
function getMdxMeta(vfile) {
  const astroMetadata = getAstroMetadata(vfile);
  if (!astroMetadata) {
    throw new Error(
      "Internal MDX error: Astro metadata is not set by rehype-analyze-astro-metadata"
    );
  }
  return {
    astro: astroMetadata,
    vite: {
      // Setting this vite metadata to `ts` causes Vite to resolve .js
      // extensions to .ts files.
      lang: "ts"
    }
  };
}
export {
  vitePluginMdx
};
