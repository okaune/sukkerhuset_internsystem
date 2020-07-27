import Joi from 'joi'

const email = Joi.string()
  .email()
  .min(8)
  .max(254)
  .trim()
  .lowercase()
  .required()
  .label('Email')

const phone = Joi.string()
  .length(8)
  .trim()
  .regex(/^[0-9]{8}$/)
  .message('must be a eight digit phone number.')
  .required()
  .label('Phone')

const name = Joi.string()
  .max(100)
  .trim()
  .required()
  .label('Name')

const password = Joi.string()
  .min(8)
  .max(100)
  .regex(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).*$/)
  .message(
    'must have at least one lowercase letter, one uppercase letter, and one digit.'
  )
  .required()
  .label('Password')

export const signUp = Joi.object().keys({
  email,
  phone,
  name,
  password
})

export const signIn = Joi.object().keys({
  email,
  password
})
