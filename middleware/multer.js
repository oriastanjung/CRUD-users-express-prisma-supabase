const multer  = require('multer')
const fileSizeLimit = 10 * 1024 * 1024;
const storage = multer.memoryStorage()
const upload = multer({
    storage : storage,
    limits : fileSizeLimit
})

module.exports = upload