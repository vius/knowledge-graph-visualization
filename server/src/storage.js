const Keyv = require('keyv')
const { KeyvFile } = require('keyv-file')
const path = require("path")

// More options with default value:
const getFileStorage = (filePath) => {
  const filename = path.resolve(__dirname, `../keyv-file/${filePath}`)
  const storage = new Keyv({
    store: new KeyvFile({
      filename, // the file path to store the data
      expiredCheckDelay: 24 * 3600 * 1000, // ms, check and remove expired data in each ms
      writeDelay: 100, // ms, batch write to disk in a specific duration, enhance write performance.
      encode: JSON.stringify, // serialize function
      decode: JSON.parse // deserialize function
    })
  })
  return storage
}

const platformStorage = getFileStorage('platform/user.json')
const adminStorage = getFileStorage('admin/user.json')


module.exports = {
  platform: platformStorage,
  admin: adminStorage
}