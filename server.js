const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')()
const axios = require('axios')

const RedisStore = require('connect-redis')(session)

// Body parser, to access `req.body`
app.use(bodyParser.json())

// Sessions to create `req.session`
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))


//

let config = require('./nuxt.config.js')

const apiClient = axios.create({
  baseURL: config.axios.baseURL,
  withCredentials: true
})

app.post('/auth/login', function (req, res) {
  // firstf fetch the auth token and store to session
  // Q fetch user immediately or in nuxtInit?
  const data = {
    username: req.body.username,
    password: req.body.password
  }
  return apiClient.post('/api/auth/token/create/', data)
    .then(function(resp) {
      req.session.authToken = resp.data.auth_token
      res.json({ token: req.session.authToken })
    })
    .catch(function() {
      res.status(401).json({ error: 'Bad credentials' })
    })
})

app.post('/auth/logout', function (req, res) {
  if (req.session.authToken) {
    apiClient.post('/api/auth/token/destroy/', {}, {
      headers: {
        'Authorization': 'Token ' + req.session.authToken
      }
    })
    delete req.session.authToken
  }
  res.json({ ok: true })
})


// We instantiate Nuxt.js with the options
const isProd = process.env.NODE_ENV === 'production'
config.dev = !isProd

const nuxt = new Nuxt(config)

// No build in production
if (!isProd) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)
app.listen(3000)
console.log('Server is listening on http://localhost:3000')
