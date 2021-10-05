const express = require('express')
const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const passport = require('passport')
const router = express.Router()

// les API
router.post(
  '/send-text',
  //passport.authenticate('bearer', { session: false }),
  async (req, res) => {
    // 1. create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
    // 2. create mail options
    let info = await transporter.sendMail({
      from: 'Tourabi mohamed sayed 👻', // sender address
      to: 'mohamedsayed.tourabi@esprit.tn', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Bonjour mohamed !!', // Text body
    })
    // 3. send respone
    res.json({ message: 'E-mail send successfully!' })
  }
)

router.post(
  '/send-html',
  //passport.authenticate('bearer', { session: false }),
  async (req, res) => {
    // 1. create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
    // 2. create mail options
    let info = await transporter.sendMail({
      from: 'Tourabi mohamed sayed 👻', // sender address
      to: 'mohamedsayed.tourabi@esprit.tn', // list of receivers
      subject: 'Hello ✔', // Subject line
      html: '<h1>Bonjour mohamed</h1>', // html body
    })
    // 3. send respone
    res.json({ message: 'E-mail send successfully!' })
  }
)

router.post(
  '/send-html/:name',
  //passport.authenticate('bearer', { session: false }),
  async (req, res) => {
    // 1. create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
    // 2. load HTML template
    const template = fs.readFileSync(
      path.resolve('./common/mail_templates', 'register_mail.html'),
      { encoding: 'utf-8' }
    )
    const html = ejs.render(template, {
      name: req.params.name,
    })

    // 3. create mail options
    let info = await transporter.sendMail({
      from: 'Tourabi mohamed sayed 👻', // sender address
      to: 'mohamedsayed.tourabi@esprit.tn', // list of receivers
      subject: 'Hello ✔', // Subject line
      html: html, // html body
    })
    // 4. send respone
    res.json({ message: 'E-mail send successfully!' })
  }
)

router.post(
  '/send-attachment',
  //passport.authenticate('bearer', { session: false }),
  async (req, res) => {
    // 1. create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
    // 2. create mail options
    let info = await transporter.sendMail({
      from: 'Tourabi mohamed sayed 👻', // sender address
      to: 'mohamedsayed.tourabi@esprit.tn', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Bonjour mohamed !!', // Text body
      attachments: [
        {
          // utf-8 string as an attachment
          filename: 'text1.txt',
          content: 'hello world!',
        },
      ],
    })
    // 3. send respone
    res.json({ message: 'E-mail send successfully!' })
  }
)

module.exports = router
