var path = require('path');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
  entry: {
    vendor: ['three', 'dat.gui/build/dat.gui.min', 'stats.js'],
    //commons: ['./src/control.js', './src/stats.js'],
    bundle: './src/app.js',
    geometries: './src/geometries.js'
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    new CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.js",
      minChunks: Infinity
    }),
    new CommonsChunkPlugin({
      name: "commons",
      filename: "commons.js",
      minChunks: 2,
      chunks: ['bunde', 'geometries'],
      children: true

      // chunks: ["pageA", "pageB"],
      // (Only use these entries)
    })
  ],
  module: {
    preLoaders: [
      {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
    ],
    loaders: [{
      test: /\/three\/examples\/js\/.*\.js/,
      loader: "imports?THREE=three"
    },
    {
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
