import alias from "@rollup/plugin-alias";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import url from "@rollup/plugin-url";
import path from "path";
import analyze from "rollup-plugin-analyzer";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript2";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Shared plugins
const commonPlugins = [
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
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }),
  commonjs(),
  json(),
  postcss({
    extract: "oauthify.css",
    minimize: true,
    modules: false,
    use: ['sass'],
  }),
  url({
    include: ["**/*.svg"],
    limit: 8192,
    emitFiles: false,
  }),
  replace({
    preventAssignment: true,
    "process.env.NODE_ENV": JSON.stringify("production"),
    "use client": "",
  }),
];

// Main build configuration
export default [
  // ESM build
  {
    input: "src/index.tsx",
    output: {
      format: "esm",
      dir: "dist/esm",
      entryFileNames: "index.js",
      chunkFileNames: "[name]-[hash].js",
      sourcemap: true,
      preserveModules: false,
    },
    external: ["react", "react-dom", "react/jsx-runtime"],
    plugins: [
      ...commonPlugins,
      typescript({
        tsconfig: "./tsconfig.json",
        useTsconfigDeclarationDir: true,
        clean: true,
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
            declarationDir: "./dist/types",
            emitDeclarationOnly: false,
            target: "ES2020",
            module: "ESNext",
          },
        },
      }),
      babel({
        babelHelpers: "bundled",
        presets: ["@babel/preset-react", "@babel/preset-typescript"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        exclude: "node_modules/**",
      }),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        format: {
          comments: false,
        },
      }),
      analyze({ summaryOnly: true, limit: 10 }),
    ],
  },

  // CommonJS build
  {
    input: "src/index.tsx",
    output: {
      format: "cjs",
      dir: "dist/cjs",
      entryFileNames: "index.js",
      chunkFileNames: "[name]-[hash].js",
      sourcemap: true,
      exports: "named",
    },
    external: ["react", "react-dom", "react/jsx-runtime"],
    plugins: [
      ...commonPlugins,
      typescript({
        tsconfig: "./tsconfig.json",
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
            target: "ES2020",
            module: "ESNext",
          },
        },
      }),
      babel({
        babelHelpers: "bundled",
        presets: [
          ["@babel/preset-env", { targets: { node: "14" } }],
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        exclude: "node_modules/**",
      }),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        format: {
          comments: false,
        },
      }),
    ],
  },

  // UMD build (for CDN usage)
  {
    input: "src/index.tsx",
    output: {
      format: "umd",
      name: "OAuthify",
      file: "dist/umd/oauthify.min.js",
      sourcemap: true,
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
    external: ["react", "react-dom"],
    plugins: [
      ...commonPlugins,
      typescript({
        tsconfig: "./tsconfig.json",
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
            target: "ES5",
          },
        },
      }),
      babel({
        babelHelpers: "bundled",
        presets: [
          ["@babel/preset-env", { targets: "> 0.25%, not dead" }],
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        exclude: "node_modules/**",
      }),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log", "console.info"],
        },
        format: {
          comments: false,
        },
      }),
    ],
  },
];