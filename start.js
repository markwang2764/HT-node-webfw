require('babel-core/register')()
require('babel-polyfill')
require('./app/index.js')

console.log('env: ', process.env.NODE_ENV)
