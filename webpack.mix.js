const mix = require('laravel-mix');

mix.js('src/main.js', 'public/js/app.js')
   .sass('src/app.scss', 'public/css/app.css')
   .disableNotifications();

Mix.listen('configReady', (webpackConfig) => {
  if (Mix.isUsing('hmr')) {
    // Remove leading '/' from entry keys
    webpackConfig.entry = Object.keys(webpackConfig.entry).reduce((entries, entry) => {
      entries[entry.replace(/^\//, '')] = webpackConfig.entry[entry];
      return entries;
    }, {});

    // Remove leading '/' from ExtractTextPlugin instances
    webpackConfig.plugins.forEach((plugin) => {
      if (plugin.constructor.name === 'ExtractTextPlugin') {
        plugin.filename = plugin.filename.replace(/^\//, '');
      }
    });
  }
});
