const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  entry: {
    main: path.resolve(__dirname, './client/index.js'),
  },
  mode: NODE_ENV,
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack boilerplate',
      template: '/client/index.html'
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: [".js", '.jsx']
  },
  devServer: {
    static: {
      directory: './',
    },
    port: 8080,
    proxy: {
      '/api/**': {
        'target': 'http://[::1]:3000',
        'secure': false,
        'changeOrigin': true
      },
    }
  },
  module:{
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          } 
        }
      },
      // CSS, PostCSS, and Sass
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ]
  }


}