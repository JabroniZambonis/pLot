const jwt = require('../lib/jwt')
const User = require('../Models/usersModel')
const request = require('request-promise')
const qs = require('querystring')

const fbBase = 'https://graph.facebook.com/v2.8/me?'

exports.fbAuthenticate = function (req, res) {
  const fbAccessToken = req.body.fbAccessToken
  // build up query to facebook
  const queryString = {
    fields: 'name,id,email,picture',
    access_token: fbAccessToken
  }
  const facebook = fbBase + qs.stringify(queryString);
  // validate fb token with facebook
  request(facebook)
    .then(response => {
      // parse response
      const parsed = JSON.parse(response)
      // try and add new user
      new User({
        name: parsed.name,
        email: parsed.email,
        fbId: parsed.id,
        photo: parsed.picture.data.url,
        fbAccessToken: fbAccessToken
      }).save()
      // user was successfully saved
      // respond with jwt token to frontend
      .then(user => {
        // create a partial user that will get sent to client
        // and used for access token creation
        const partial = {
          name: user.name,
          email: user.name,
          photo: user.photo
          _id: user._id
        }
        const token = jwt.create(partial)
        return res.status(201).json({
          accessToken: token,
          user: partial
        })
      })
      // potential error creating user
      .catch(err => {
        // if the err has a code of 11000
        // it is a duplicate and in that case
        // just update the users access token
        if (err.code === 11000) {
          User.findOneAndUpdate(
            { email: parsed.email },
            { $set: { fbAccessToken: fbAccessToken } },
            // return updated user not old one
            { new: true }
          )
          .then(user => {
            // user has been updated now send jwt based of partial user
            // information
            const partial = {
              name: user.name,
              email: user.name,
              photo: user.photo
              _id: user._id
            }
            const token = jwt.create(partial)
            return res.status(200).json({ 
              accessToken: token,
              user: partial
            })   
          })
        } else {
          // unknown server error
          return res.status(500).json(err)
        }
      })
    })
    // error sending access token to facebook
    .catch(err => res.status(500).json(err))
}

exports.login = function (req, res) {
  // read the authorization header and decode user
  const token = req.get('Authorization')
  const user = jwt.decode(token)
  res.status(200).json(user)
}
