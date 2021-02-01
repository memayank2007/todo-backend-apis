const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateItemInput (data) {
  let errors = {}
  data.title = !isEmpty(data.title) ? data.title : ''

  if (Validator.isEmpty(data.title)) {
    errors.title = 'title is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
