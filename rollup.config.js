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
      exports: "auto",
      globals: {
        "react": "React",
        "@babel/runtime/helpers/slicedToArray": "_slicedToArray"
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