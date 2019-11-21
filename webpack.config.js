const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  stats: {
    // One of the two if I remember right
    entrypoints: false,
    children: false
  },
  mode: 'development',
  entry: path.join(__dirname, './src/main.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devServer: {
    port: 3000,
    open: true,
    host: '192.168.1.101'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties', 'transform-remove-strict-mode', ["component",
              {
                "libraryName": "mint-ui",
                "style": true
              }
            ]]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            // options: { 开启 css 模块化后, vue 组件中的 less 样式无效
            //   modules: {
            //     mode: 'local',
            //     localIdentName: '[name]_[local]-[hash:5]'
            //   }
            // }
          },
          {
            loader: "less-loader"
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[hash:6]-[name].[ext]',
              outputPath: './images'
            }
          }
        ]
      },
      // 处理字体文件
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: [
          { loader: 'url-loader' }
        ]
      },
      { // 处理 .vue 文件的 loader
        test: /\.vue$/,
        use: [
          { loader: 'vue-loader' }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: [".js", ".jsx", '.vue']
  }
}