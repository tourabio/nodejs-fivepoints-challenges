const express = require('express')
const multer = require('multer')
const path = require('path')
const passport = require('passport')
const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb => callBack
    cb(null, 'uploads') //null pour dire qu'il n'ya pas d'erreur à ce niveau
  },
  filename: (req, file, cb) => {
    const newFileName = Date.now() + path.extname(file.originalname) //extname donne d'extension du fichier
    cb(null, newFileName)
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
    return cb(new Error('not allowed mimeType !'))
  }
}
const upload = multer({ storage: storage, fileFilter: fileFilter })

// Routes
router.post(
  '/upload-single',
  //   [
  //     /*passport.authenticate("bearer", { session: false }),*/ upload.single(
  //       'image'
  //     ),
  //   ],
  async (req, res) => {
    const fn = upload.single('image')
    fn(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // a multer error
        res.json({ multerError: err })
      } else if (err) {
        res.json({ error: err })
      }
    })
    // if (req.file) {
    //   res.json({ message: 'Image has been uploaded successfully!' })
    // } else {
    //   res.json({ error: 'file not accepted ! only image/jpeg and image/png' })
    // }
  }
)

router.post(
  '/upload-multiple',
  //   [
  //     /*passport.authenticate('bearer', { session: false }),*/
  //     upload.array('images', 3),
  //   ],
  async (req, res) => {
    const fn = upload.array('images', 3)
    fn(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // a multer error
        res.json({ multerError: err })
      } else if (err) {
        res.json({ error: err })
      }
    })

    // console.log(req)
    // if (req.files) {
    //   res.json({ message: 'Image has been uploaded successfully!' })
    // } else {
    //   res.json({ error: 'file not accepted ! only image/jpeg and image/png' })
    // }
  }
)

module.exports = router
