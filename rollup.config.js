
import babel       from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs    from 'rollup-plugin-commonjs';
import jsx         from 'rollup-plugin-jsx';
import buble       from 'rollup-plugin-buble';





export default {

  input: 'src/js/index.js',

  output    : {
    file      : 'build/pie7.js',
    format    : 'iife',
    name      : 'pie7',
    sourcemap : true,
  },

  plugins: [

    nodeResolve({
      module: true,
      jsnext: true,
      browser: true,
      extensions: [ '.js', '.jsx' ],
      preferBuiltins: false
    }),

    babel({

      plugins: ["syntax-jsx"],

      presets: [
        [ "env", { "targets": { "ie": 7 }, "modules": false } ],
        "es3"
      ],

      exclude: 'node_modules/**'

    }),

    buble({
      jsx: "h"
    })

  ]

};
