const jsonServer = require('json-server')
const path = require('path')
const bodyParser = require('body-parser')
const uuid = require('uuid/v4')

const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'data.json'))
const db = router.db
const middlewares = jsonServer.defaults()

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

server.post('/users', bodyParser.json(), (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({ 'error': 'username and password required' })
  }

  if (db.get('users').find({ username: req.body.username }).value()) {
    return res.status(400).send({ 'error': 'user already exists with that username' })
  }

  db.get('users')
    .push({ 'id': uuid(), 'username': req.body.username, 'password': req.body.password })
    .write()
  return res.status(201).send({ 'username': req.body.username })
})

server.use(middlewares)
server.use(passport.authenticate('basic', { session: false }))
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
