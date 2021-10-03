const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required.'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required.'],
    },
    age: {
      type: Number,
      required: [true, 'Age is required.'],
    },
    email: {
      type: String,
      required: [true, 'E-mail is required.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    todos: [{ type: Schema.Types.ObjectId, ref: 'todo' }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

UserSchema.pre('findOneAndUpdate', async function () {
  const docToUpdate = await this.model.findOne(this.getQuery())
  //console.log('docToUpdate : ', docToUpdate) // The document that `findOneAndUpdate()` will modify
  if (this._update.password === docToUpdate.password) {
    console.log('password hasnt changed')
  } else {
    console.log('password has changed')
    var new_pass = this._update.password
    // 1. Hash the password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(new_pass, salt)
    new_pass = hash
    this._update.password = new_pass
  }
})

const userModel = mongoose.model('user', UserSchema)
module.exports = userModel
