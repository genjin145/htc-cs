const path = require('path');

module.exports = {
  entry: './src/js/script.js',
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: 'script.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      }
    ]
  }
};