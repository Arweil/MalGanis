import resolve from 'rollup-plugin-node-resolve'; // 支持node_modules第三方库使用
import commonjs from 'rollup-plugin-commonjs'; // 支持代码(开发目录src，rollup本事已经支持export语法)中的export写法 commonjs => es6
import babel from 'rollup-plugin-babel'; // babel支持
import { uglify } from 'rollup-plugin-uglify'; // 代码压缩

const config = {
  input: 'src/index.js',
  output: {
    file: './dist/GalGanis.js',
    format: 'umd',
    name: 'GalGanis'
  },
  plugins: [
    resolve({
      browser: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs({
      // namedExports: {
      //   'node_modules/react/index.js': ['Component', 'Children', 'createElement']
      // }
    })
  ],
  external: ['react', 'react-dom', 'prop-types']
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify());
} else {
  config.output.sourcemap = true
}

export default config;
