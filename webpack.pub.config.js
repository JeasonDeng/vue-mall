const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  stats: {
    // One of the two if I remember right
    entrypoints: false,
    children: false
  },
  mode: 'production',
  entry: {
    app: path.resolve(__dirname, 'src/main.js'),
    vendors: ['jquery']  // 这个数组放第三方包的名称
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  devServer: {
    port: 3000,
    open: true
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
            plugins: ['@babel/plugin-proposal-class-properties', '@babel/transform-runtime']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'  // 指定抽取的时候, 自动为路径加上../ 前缀
            },
          },
          'css-loader'
        ],
      },
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[hash:6]-[name].[ext]',
              outputPath: 'images'   // 将图片放到统一目录下
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
          {loader: 'vue-loader'}
        ]
      }  
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      minify: { // 压缩 HTML 页面
        removeComments: true, // 删除注释
        removeScriptTypeAttributes: true // 删除 script 标签的 type 属性
      }
    }),
    new CleanWebpackPlugin(), // 每次打包先删除 dist 再重新生成
    new VueLoaderPlugin(),
    // new ExtractTextPlugin('css/style.css'), // 抽取的 css 文件存放目录
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new OptimizeCSSAssetsPlugin() // 压缩 css
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],  // 压缩 js 文件
    splitChunks: {                      // 分离第三方包
      cacheGroups: {
        commons: {
          name: "vendors",             // 指定要抽离的入口名称
          filename: 'js/vendors.js',   // 抽离的第三方包文件名
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  }
}
