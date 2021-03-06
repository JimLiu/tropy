'use strict'

const parse = require('exif-reader')
const { debug, verbose } = require('./common/log')


module.exports = {
  exif(buffer, mimetype = 'image/jpeg') {
    return new Promise((resolve) => {
      let data = {}

      try {
        switch (mimetype) {
          case 'image/jpeg':
            var offset = 0

            while (offset < buffer.length) {
              if (buffer[offset++] === 0xFF && buffer[offset++] === 0xE1) {
                const meta = parse(buffer.slice(offset + 2))

                data = ({
                  ...meta.gps, ...meta.exif, ...meta.image
                })

                break
              }
            }
            break
        }

      } catch (error) {
        verbose(`EXIF extraction failed: ${error.message}`)
        debug(error.stack)

      } finally {
        resolve(data)
      }
    })
  }
}
