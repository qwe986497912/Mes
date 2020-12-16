/**
 * Async glob module.
 * @module aglob
 * @version 2.0.1
 */

'use strict'

const aglob = require('./aglob')

let lib = aglob.bind(this)

Object.assign(lib, aglob, {
  aglob
})

module.exports = lib
