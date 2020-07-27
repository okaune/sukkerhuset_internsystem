import { compare, hash } from 'bcryptjs'
import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      validate: {
        validator: email => User.doesntExist({ email }),
        message: 'Email already registered.'
      }
    },
    phone: {
      type: String,
      validate: {
        validator: phone => User.doesntExist({ phone }),
        message: 'Phone number already registered.'
      }
    },
    password: String,
    role: {
      type: String,
      enum: ['ADMIN', 'MODERATOR', 'USER']
    },
    image: {
      src: String
    }
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10)
  }
})

userSchema.statics.doesntExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0
}

userSchema.methods.matchesPassword = function(password) {
  return compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
