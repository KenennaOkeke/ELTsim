const {User, Squad, Faction} = require('../models')
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const config = require('../config')
const jwt = require("jsonwebtoken");

const service = {}

service.updateSettings = async(userId, name, email) => {
  let success = false
  const data = {}
  const errors = []

  if(name.length < 3 || name.length > 255) {
    errors.push('Name must be between 3 and 255 characters.')
  }
  if(email.length < 3 || email.length > 255) {
    errors.push('Email must be between 3 and 255 characters.')
  }

  if(!emailValidator.validate(email)) {
    errors.push('Invalid Email Address.')
  }

  //TODO: Email updated email

  if(errors.length === 0) {
    User.update({name: name, email: email}, {where: {id: userId}})
    success = true
  }
  return {
    success: success,
    data: data,
    errors: errors
  }
}

service.updatePassword = async(userId, oldPassword, newPassword, newPassword2) => {
  let success = false
  const data = {}
  const errors = []

  if(newPassword !== newPassword2) {
    errors.push('New passwords must match.')
  }
  if(newPassword.length < 8) {
    errors.push('New password cannot be less than 8 characters.')
  }
  if(newPassword.length > 255) {
    errors.push('New password cannot be greater than 255 characters.')
  }

  if(oldPassword.length < 8) {
    errors.push('Password cannot be less than 8 characters.')
  }
  if(oldPassword.length > 255) {
    errors.push('Password cannot be greater than 255 characters.')
  }

  if(errors.length === 0) {
    const user = await User.findOne({where: {id: userId}})
    const result = await bcrypt.compare(oldPassword, user.password)
    if (result) {
      //TODO: Password changed email
      User.update({password: await bcrypt.hash(newPassword, 12)}, {where: {id: userId}})
      success = true
      //TODO: Create a backend service that handles auth DB, restrict db user access to the password column
    } else {
      errors.push('Invalid current password.')
    }
  }
  return {
    success: success,
    data: data,
    errors: errors
  }
}

module.exports = service