const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const webpack = require('webpack');
const path = require('path');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackNotifierPlugin = require('webpack-notifier');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const tls = process.env.TLS;

module.exports = (config, options) => {
  // PLUGINS
  if (config.mode === 'development') {
    config.optimization = config.optimization || {};
    config.optimization.runtimeChunk = false;

    config.plugins.push(
      new ESLintPlugin({
        extensions: ['js', 'ts'],
      }),
      new FriendlyErrorsWebpackPlugin(),
      new BrowserSyncPlugin(
        {
          host: 'localhost',
          port: 9000,
          https: tls,
          proxy: {
            target: `http${tls ? 's' : ''}://localhost:4200`,
            proxyOptions: {
              changeOrigin: false, //pass the Host header to the backend unchanged  https://github.com/Browsersync/browser-sync/issues/430
            },
          },
          socket: {
            clients: {
              heartbeatTimeout: 60000,
            },
          },
          /*
          ghostMode: { // uncomment this part to disable BrowserSync ghostMode; https://github.com/jhipster/generator-jhipster/issues/11116
            clicks: false,
            location: false,
            forms: false,
            scroll: false,
          },
          */
        },
        {
          reload: false,
        }
      ),
      new WebpackNotifierPlugin({
        title: 'Gateway',
        contentImage: path.join(__dirname, 'logo-jhipster.png'),
      })
    );

    if (!process.env.JHI_DISABLE_WEBPACK_LOGS) {
      config.plugins.push(
        new SimpleProgressWebpackPlugin({
          format: 'compact',
        })
      );
    }
  }

  if (config.mode === 'production') {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        // Webpack statistics in target folder
        reportFilename: '../stats.html',
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })
    );
  }

  const patterns = [
    // jhipster-needle-add-assets-to-webpack - JHipster will add/remove third-party resources in this array
  ];

  if (patterns.length > 0) {
    config.plugins.push(new CopyWebpackPlugin({ patterns }));
  }

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TIMESTAMP: `'${new Date().getTime()}'`,
        // APP_VERSION is passed as an environment variable from the Gradle / Maven build tasks.
        VERSION: `'${process.env.hasOwnProperty('APP_VERSION') ? process.env.APP_VERSION : 'DEV'}'`,
        DEBUG_INFO_ENABLED: config.mode === 'development',
        // The root URL for API calls, ending with a '/' - for example: `"https://www.jhipster.tech:8081/myservice/"`.
        // If this URL is left empty (""), then it will be relative to the current context.
        // If you use an API server, in `prod` mode, you will need to enable CORS
        // (see the `jhipster.cors` common JHipster property in the `application-*.yml` configurations)
        SERVER_API_URL: `''`,
      },
    }),
    new ModuleFederationPlugin({
      remotes: {
        blog: `blog@${process.env.JHI_JAR === 'true' ? '/services/blog' : 'http://localhost:4202'}/remoteEntry.js`,
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: '11.1.1' },
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: '11.1.1' },
        '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: '11.1.1' },
        '@angular/router': { singleton: true, strictVersion: true, requiredVersion: '11.1.1' },
        '@angular/forms': { singleton: true, strictVersion: true, requiredVersion: '11.1.1' },
        '@fortawesome/angular-fontawesome': { singleton: true, strictVersion: true },
        '@fortawesome/fontawesome-common-types': { singleton: true, strictVersion: true },
        '@fortawesome/fontawesome-svg-core': { singleton: true, strictVersion: true },
        '@fortawesome/free-solid-svg-icons': { singleton: true, strictVersion: true },
        '@ng-bootstrap/ng-bootstrap': { singleton: true, strictVersion: true },
        '@ngx-translate/core': { singleton: true, strictVersion: true },
        '@ngx-translate/http-loader': { singleton: true, strictVersion: true },
        dayjs: { singleton: true, strictVersion: true },
        'ngx-infinite-scroll': { singleton: true, strictVersion: true },
        'ngx-webstorage': { singleton: false, strictVersion: true },
        rxjs: { singleton: true, strictVersion: true },
        'rxjs/operators': { singleton: true, strictVersion: true },
        'zone.js': { singleton: true, strictVersion: true },
        'ng-jhipster/config': {
          singleton: true,
          import: 'src/main/webapp/app/shared',
        },
        'ng-jhipster/core': {
          singleton: true,
          import: 'src/main/webapp/app/core',
        },
        'ng-jhipster/shared': {
          singleton: true,
          import: 'src/main/webapp/app/shared',
        },
      },
    })
  );

  return config;
};
