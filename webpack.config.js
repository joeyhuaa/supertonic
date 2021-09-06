module.exports = {
  entry: './app/javascript/packs/index.js',
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ["react-hot-loader/babel", "@emotion"]
          }
        },
      }
    ]
  }
}