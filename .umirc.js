import { resolve } from 'path'

export default {
  history: 'hash',
  hash: true,
  history: 'browser',
  plugins: [
    ['umi-plugin-react', {
      dva: { immer: true },
      antd: true,
      routes: {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//,
        ],
      },
    }],
  ],
  proxy: {
    '/api': {
      // target: 'http://192.168.111.6:30009',
      target: 'http://www.xiangjv.top:2345',
      // target: 'http://172.20.54.151:2345',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  theme: './config/theme.config.js',
  alias: {
    api: resolve(__dirname, './services'),
    components: resolve(__dirname, './components'),
    utils: resolve(__dirname, './utils'),
    themes: resolve(__dirname, './themes'),
    assets: resolve(__dirname, './assets'),
    reducers: resolve(__dirname, './reducers'),
  }
};
