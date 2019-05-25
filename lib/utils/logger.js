/*
 * @file logger
 * @author nighca <nighca@live.cn>
 */

const logger = require('log4js').getLogger('FECX')

logger.level = process.env.verbose ? 'debug' : 'info'

module.exports = logger
