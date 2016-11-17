const jwt = require('jwt-simple')
const secret = process.env.JWT_SECRET

exports.create = function (user) {
  return jwt.encode(user, secret)
}

exports.decode = function (token) {
  return jwt.decode(token, secret)
}


