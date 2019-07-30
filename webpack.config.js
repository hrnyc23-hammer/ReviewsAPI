// const webpack = require('webpack');
// const path = require('path');

// const config = {
//   entry: './client/app.jsx',
//   output: {
//     path: path.resolve(__dirname, 'public'),
//     filename: 'bundle.js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         use: 'babel-loader',
//         exclude: /node_modules/
//       },
//       {
//         test: /\.css$/,
//         use: [
//           'style-loader',
//           'css-loader'
//         ]
//       }
//     ]
//   },
//   resolve: {
//     extensions: [
//       '.js',
//       '.jsx'
//     ]
//   },
//   devServer: {
//     contentBase: './dist'
//   }
// }
// module.exports = config;