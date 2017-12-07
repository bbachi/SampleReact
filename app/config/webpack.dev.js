var path =  require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

const sourcePath = path.join(__dirname, '../src');
const buildPath = path.join(__dirname, '../dist');
const environment = (process.env.NODE_ENV === "production");
var dotEnvPath = '../environment/dev/.env';
console.log("ENV:::"+process.env.NODE_ENV);
if(environment){
  dotEnvPath = './environment/prod/.env';
  console.log('webpack is building for production:::'+dotEnvPath);
}else{
   console.log('webpack is building for development:::'+dotEnvPath);
}

module.exports = {
  entry: ["./src/index.js"],
  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, buildPath)
  },
  
  devServer: {
    port:9000,
    compress: true,
    hot:true,
    inline: true,
    proxy: {
        "/api": {
          target: "http://localhost:3080",
          pathRewrite: {"^/api" : ""}
        }
    }
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader",exclude: /node_modules/,},
      { test: /\.json/, loader: "json-loader", exclude:/node_modules/,},
      {test: /\.js$/, include: path.join(__dirname, 'app'), loaders: ['babel-loader']},
      {test: /(\.css)$/, use: [{ loader: "style-loader" },{ loader: "css-loader" }]},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      {test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },  
  resolve: {
    extensions: [".tsx", ".ts", ".js",".json"]
  },
  plugins: [
    new Dotenv({
      path: dotEnvPath, // Path to .env file (this is the default) 
      safe: false // load .env.example (defaults to "false" which does not use dotenv-safe) 
    }),
    new HtmlWebpackPlugin({
      template: path.join(sourcePath, 'index.html'),
      path: buildPath,
      filename: 'index.html',
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:9000' })
  ]
}
