/*
 * @file webpack config for serve
 * @author nighca <nighca@live.cn>
 */

const findBuildConf = require('../utils/build-conf').find
const getDevConfig = require('./dev')
const path = require('path')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')

module.exports = () =>
	Promise.all([getDevConfig(), findBuildConf()]).then(([webpackConfig, buildConfig]) => {
		webpackConfig = require('./addons/hot-dev')(webpackConfig, buildConfig.publicUrl)
		webpackConfig = require('./addons/configure-proxy')(webpackConfig, buildConfig.devProxy)
		webpackConfig.plugins.push(
			new DllReferencePlugin({
        context: 'fec-builder',
				manifest: require('/Users/belinda/qbox/pandora-insight-portal/node_modules/.dll_cache/all.manifest.json'),
			})
		)
		return webpackConfig
	})
