import Joi from 'joi'
import mongoose from 'mongoose'

const objectId = joi => ({
  type: 'objectId',
  base: joi.string(),
  messages: {
    objectId: '"{{#label}}" must be a valid Object ID'
  },
  validate(value, helpers) {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return { value, errors: helpers.error('objectId') }
    }
  }
})

export default Joi.extend(objectId)
