const jsonServer = require('json-server')
const path = require('path')

const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy

const router = jsonServer.router(path.join(__dirname, 'data.json'))
const db = router.db

passport.use(new BasicStrategy(
  function (username, password, done) {
    const user = db.get('users').find({ username: username, password: password }).value()
    if (user) {
      return done(null, username)
    } else {
      return done(null, false)
    }
  }
))

module.exports = passport.authenticate('basic', { session: false })
