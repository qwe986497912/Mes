/**
 * Test case for amap.
 * Runs with mocha.
 */
'use strict'

const amap = require('../lib/amap.js')
const assert = require('assert')
const co = require('co')
const abrowserify = require('abrowserify')

describe('amap', function () {
  this.timeout(3000)
  let tmpDir = `${__dirname}/../tmp`
  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Amap', () => co(function * () {
    let src = require.resolve('../misc/mocks/mock-module.js')
    let dest = tmpDir + '/testing-browser-script-mapped.js'
    yield abrowserify(src, dest, {
      debug: true
    })
    yield amap(dest)
  }))
})

/* global describe, before, after, it */
