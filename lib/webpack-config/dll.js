/*
 * @file webpack config for serve
 * @author nighca <nighca@live.cn>
 */

const findBuildConf = require('../utils/build-conf').find
const getDevConfig = require('./dev')
const DllPlugin = require('webpack/lib/DllPlugin')

const path = require('path')
console.log('@dll')
module.exports = () =>
	Promise.all([getDevConfig(), findBuildConf()]).then(([webpackConfig, buildConfig]) => {
		webpackConfig = require('./addons/hot-dev')(webpackConfig, buildConfig.publicUrl)
		webpackConfig = require('./addons/configure-proxy')(webpackConfig, buildConfig.devProxy)
		;(webpackConfig.entry = {
			all: [
				'@sentry/browser',
				'antd',
				'braft-editor',
				'classnames',
				'codemirror',
				'core-js',
				'core-js/fn/promise',
				'd3-drag',
				'd3-selection',
				'docx',
				'dom-to-image',
				'downloadjs',
				'echarts-for-react',
				'echarts-stat',
				'echarts',
				'file-saver',
				'history',
				'inversify',
				'jspdf',
				'lodash',
				'md5',
				'mobx-react-devtools',
				'mobx-react-form',
				'mobx-react',
				'mobx',
				'moment',
				'monaco-editor',
				'monaco-editor/esm/vs/editor/editor.api.js',
				'object-sizeof',
				'query-string',
				'react-addons-css-transition-group',
				'react-addons-test-utils',
				'react-addons-transition-group',
				'react-color',
				'react-copy-to-clipboard',
				'react-csv',
				'react-dom',
				'react-drag-listview',
				'react-grid-layout',
				'react-highlight-words',
				'react-hot-loader',
				'react-icecream',
				'react-json-tree',
				'react-measure',
				'react-resizable',
				'react-sortable',
				'react-sortablejs',
				'react-transition-group',
				'react-virtualized',
				'react',
				'recompose',
				'reflect-metadata',
				'screenfull',
				'seamless-immutable',
				'sizeof',
				'sortablejs',
				'sql-formatter',
				'uuid',
				'validator',
				'whatwg-fetch',
			],
		}),
			(webpackConfig.output = {
				filename: 'all.dll.js',
				path: path.resolve('./node_modules/.dll_cache'),
				library: '_dll_all', //dll的全局变量名
			}),
			webpackConfig.plugins.push(
				new DllPlugin({
          context: 'fec-builder',
					name: '_dll_all', //dll的全局变量名
					path: path.join('./node_modules/.dll_cache', '[name].manifest.json'), //描述生成的manifest文件
				})
      )
      delete webpackConfig.devtool
		return webpackConfig
	})
