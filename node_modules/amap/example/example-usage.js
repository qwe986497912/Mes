'use strict'

const amap = require('amap')
const co = require('co')

co(function * () {
  yield amap('ui/index.js') // index.js -> index.js + index.js.map
}).catch((err) => console.error(err))
