const {User, Squad, Faction} = require('../models')
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const config = require('../config')
const jwt = require("jsonwebtoken");

const service = {}

async function generateJwt(user){
  return await jwt.sign({ //TODO: Add User Agent and etc. to the token
    data: {
      user_id: user.id //todo: add time and physical expiration? pegged to expiresIn from accessTokenSecret?
    }
  }, config.accessTokenSecret, { expiresIn: '7d' });
}

service.me = async(token) => {
  let success = false
  const data = {}
  const errors = []
  let jwtToken
  try {
    jwtToken = jwt.verify(token, config.accessTokenSecret)
  } catch (err) {
    errors.push('Invalid JWT Token')
  }
  //TODO: getFactions and getSquads should always return 1
  if(errors.length === 0) {
    const user = await User.findOne({ where: { id: jwtToken.data.user_id } })
    const userFactions = (await user.getFactions()).map((faction) => {return {
      id: faction.id,
      name: faction.name
    }})
    const userSquads = (await user.getSquads()).map((squad) => {return {
      id: squad.id,
      name: squad.name
    }})
    data.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      factions: userFactions,
      squads: userSquads,
    }
    success = true
  }
  return {
    success: success,
    data: data,
    errors: errors
  }
}

service.login = async(email, password) => {
  let success = false
  const data = {}
  const errors = []

  if(email.length < 3 || email.length > 255) {
    errors.push('Email must be between 3 and 255 characters.')
  }
  if(password.length < 8) {
    errors.push('Password cannot be less than 8 characters.')
  }
  if(password.length > 255) {
    errors.push('Password cannot be greater than 255 characters.')
  }

  if(!emailValidator.validate(email)) {
    errors.push('Invalid Email Address.')
  }

  if(errors.length === 0) {
    const user = await User.findOne({where: {email: email.toLowerCase()}})
    if(!user) {
      //TODO: rate limits
      errors.push('Invalid Email Address or Password.')
    }
    if(errors.length === 0) {
      const result = await bcrypt.compare(password, user.password)
      if (result) {
        success = true
        data.accessToken = await generateJwt(user)
      } else {
        errors.push('Invalid Email Address or Password.')
      }
    }
  }
  return {
    success: success,
    data: data,
    errors: errors
  }
}

service.register = async(name, email, password, password2, faction) => {
  //TODO: Add reCaptcha
  let success = false
  const data = {}
  const errors = []

  if(name.length < 3 || name.length > 255) {
    errors.push('Name must be between 3 and 255 characters.')
  }
  if(email.length < 3 || email.length > 255) {
    errors.push('Email must be between 3 and 255 characters.')
  }
  if(faction.length < 3 || faction.length > 255) {
    errors.push('Faction must be between 3 and 255 characters.')
  }
  if(password.length < 8) {
    errors.push('Password cannot be less than 8 characters.')
  }
  if(password.length > 255) {
    errors.push('Password cannot be greater than 255 characters.')
  }
  if(password !== password2) {
    errors.push('Passwords must match.')
  }

  if(!emailValidator.validate(email)) {
    errors.push('Invalid Email Address.')
  }

  if(errors.length === 0) {
    const user = await User.findOne({where: {email: email.toLowerCase()}})
    if(user) {
      errors.push('Email Address is already in use.')
    }

    if(errors.length === 0) {
      //TODO: Email Verification
      const org = await Faction.create({
        name: Faction,
        Squads: {name: 'Dream Squad'},
        Users: {
          email: email.toLowerCase(),
          name: name,
          password: await bcrypt.hash(password, 12)
        }
      }, {
        include: [Squad, User]
      })
      success = true
      data.accessToken = await generateJwt(org.toJSON()['Users'][0])
    }
  }

  return {
    success: success,
    data: data,
    errors: errors
  }
}

module.exports = service