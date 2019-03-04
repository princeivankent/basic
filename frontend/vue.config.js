module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?  `${process.env.VUE_APP_URL}/public` : `/${process.env.VUE_APP_NAME}/`,

  // proxy API requests to Valet during development
  devServer: {
    proxy: process.env.VUE_APP_URL
  },

  // output built static files to Laravel's public dir.
  // note the "build" script in package.json needs to be modified as well.
  outputDir: '../public',

  // modify the location of the generated HTML file.
  // make sure to do this only in production.
  indexPath: process.env.NODE_ENV === 'production'
    ? '../resources/views/index.blade.php'
    : 'index.html'
}