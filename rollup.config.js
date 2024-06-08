// rollup.config.js
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import url from "@rollup/plugin-url";
import { babel } from "@rollup/plugin-babel";
import alias from "@rollup/plugin-alias";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import path from "path";
import { fileURLToPath } from "url";
import { terser } from "rollup-plugin-terser";
import analyze from "rollup-plugin-analyzer";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  input: "src/index.tsx",
  output: [
    {
      format: "esm",
      dir: "dist/esm",
      entryFileNames: "index.js",
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [
    alias({
      entries: [
        { find: "src", replacement: path.resolve(__dirname, "./src") },
        { find: "app", replacement: path.resolve(__dirname, "./src/app") },
        {
          find: "components",
          replacement: path.resolve(__dirname, "./src/components"),
        },
        {
          find: "services",
          replacement: path.resolve(__dirname, "./src/services"),
        },
        {
          find: "hocs",
          replacement: path.resolve(__dirname, "./src/hocs"),
        },
        {
          find: "helpers",
          replacement: path.resolve(__dirname, "./src/helpers"),
        },
      ],
    }),
    peerDepsExternal(),
    resolve({
      preferBuiltins: false,
      browser: true,
    }),
    commonjs(),
    json(),
    typescript({
      tsconfig: "./tsconfig.json",
      useTsconfigDeclarationDir: true,
      clean: true,
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationDir: "./dist/types",
          emitDeclarationOnly: true,
        },
      },
    }),
    postcss({
      // extract: "index.css", // Extract CSS to the root dist directory
      minimize: true,
      inject: true,
    }),
    url({
      include: ["**/*.svg"],
      limit: 8192,
      emitFiles: true,
    }),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-react", "@babel/preset-typescript"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"),
      "use client": "",
    }),
    terser(),
    analyze({ summaryOnly: true }),
  ],
  external: ["react", "react-dom"],
};
