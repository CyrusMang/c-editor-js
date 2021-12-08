import styles from 'rollup-plugin-styles'
import autoprefixer from 'autoprefixer'
import babel from '@rollup/plugin-babel'

// the entry point for the library
const input = 'src/index.js'

//
const MODE = [
  {
    fomart: 'cjs'
  },
  {
    fomart: 'esm'
  },
  {
    fomart: 'umd'
  }
]

const config = MODE.map(m => {
  return {
    input: input,
    output: {
      // then name of your package
      name: "c-editor",
      file: `dist/index.${m.fomart}.js`,
      format: m.fomart,
      exports: "named",
      globals: {
        "react": "React",
        "@babel/runtime/helpers/slicedToArray": "_slicedToArray",
        "@babel/runtime/helpers/defineProperty": "_defineProperty",
        "@babel/runtime/helpers/asyncToGenerator": "_asyncToGenerator",
        "@babel/runtime/helpers/toConsumableArray": "_toConsumableArray",
        "@babel/runtime/regenerator": "_regeneratorRuntime",
      }
    },
    // this externelizes react to prevent rollup from compiling it
    external: ["react", /@babel\/runtime/],
    plugins: [
      // these are babel comfigurations
      babel({
        exclude: 'node_modules/**',
        plugins: ['@babel/transform-runtime'],
        babelHelpers: 'runtime'
      }),
      // this adds support for styles
      styles({
        postcss: {
          plugins: [
            autoprefixer()
          ]
        }
      })
    ]
  }
})

export default config