import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
// import { terser } from 'rollup-plugin-terser'

export default {
  input: './index.js',
  output: {
    sourcemap: false,
    format: 'cjs',
    file: './dist/index.js',
    exports: 'named',
  },
  plugins: [
    nodeResolve({
      dedupe: 'graphql',
      browser: false,
    }),
    commonjs(),
    // terser(), This appears to break stuff currently
  ],
}
