import { UserInputError } from 'apollo-server-express'
import { attemptSignIn, signOut } from '../auth'
import { User } from '../models'
import { fields } from '../utils'
import { objectId, signIn, signUp } from '../validators'

export default {
  Query: {
    me: (root, args, { req }, info) => {
      return User.findById(req.session.userId, fields(info)).exec()
    },
    users: (root, args, context, info) => {
      // TODO: pagination
      return User.find({}, fields(info)).exec()
    },
    user: async (root, args, context, info) => {
      const { error } = await objectId.validateAsync(args)
      if (error) throw new UserInputError(error.message, error)
      return User.findById(args.id, fields(info)).exec()
    }
  },
  Mutation: {
    signUp: async (root, args, { req }) => {
      const { error } = await signUp.validateAsync(args, {
        abortEarly: false
      })
      if (error) throw new UserInputError(error.message, error)

      args.role = 'USER'
      args.image = {
        src: `https://eu.ui-avatars.com/api/?name=${args.name.replace(
          / /g,
          '+'
        )}`
      }
      const user = await User.create(args)

      req.session.userId = user.id

      return user
    },
    signIn: async (root, args, { req }, info) => {
      const { error } = await signIn.validateAsync(args, {
        abortEarly: false
      })
      if (error) throw new UserInputError(error.message, error)

      const user = await attemptSignIn(args, fields(info))

      req.session.userId = user.id

      return user
    },
    signOut: (root, args, { req, res }) => {
      return signOut(req, res)
    }
  },
  User: {
    role: async user => {
      return user.role
    },
    image: async user => {
      return Object.assign(user.image, { parent: user })
    }
  },
  ProfilePicture: {
    src: async image => {
      return image.src
    }
  }
}
