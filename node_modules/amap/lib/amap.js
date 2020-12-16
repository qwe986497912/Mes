/**
 * @function amap
 * @param {string} filename - Filename to extract
 * @param {Object} [options] - Optional settings
 * @param {string} [options.dest] - Path to save file (which has no longer contains sourcemap)
 * @param {string} [options.map] - Path to save sourcemap file
 * @returns {Promise}
 */
'use strict'

const co = require('co')
const fs = require('fs')
const path = require('path')
const { mkdirpAsync, existsAsync, statAsync } = require('asfs')
const filecopy = require('filecopy')
const filedel = require('filedel')
const exorcist = require('exorcist')

/** @lends amap */
function amap (filename, options = {}) {
  let {
    dest = filename,
    map = `${dest}.map`,
    tmp = `${dest}.tmp`
  } = options
  return co(function * () {
    let { size, mtime } = (yield existsAsync(filename)) && (yield statAsync(filename)) || {}
    if (Number(size) === 0) {
      console.warn(`[amap] "${filename}" is empty.`)
      return
    }
    {
      let mapState = (yield existsAsync(map)) && (yield statAsync(map))
      let hasMap = mtime && mapState && (new Date(mtime) <= new Date(mapState.mtime))
      if (hasMap) {
        console.warn(`[amap] Skipped generating "${map}" because already update to date with ${filename}`)
        return
      }
    }
    yield mkdirpAsync(path.dirname(filename))
    yield mkdirpAsync(path.dirname(tmp))
    let readStream = fs.createReadStream(filename)
    let writeStream = fs.createWriteStream(tmp)

    yield new Promise((resolve, reject) => {
      readStream.on('error', reject)
      writeStream.on('error', reject)
      writeStream.on('close', (ex) => co(function * () {
        resolve()
      }).catch(reject))
      readStream.pipe(exorcist(map)).pipe(writeStream)
    })
    yield filecopy(tmp, dest)
    console.log(`File generated: ${dest}, ${map}`)
    yield filedel(tmp)
  })
}

module.exports = amap
