const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: isProd ? '/account-book' : '/',
  outputDir: 'docs',
  filenameHashing: false,
  productionSourceMap: false
}
