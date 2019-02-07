
import babel       from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs    from 'rollup-plugin-commonjs';
import jsx         from 'rollup-plugin-jsx';





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

    jsx( {factory: 'h'} ),

    babel({
      presets: ["es2015-rollup", "react", "es3"],
      exclude: 'node_modules/**'
    })
  ]

};
