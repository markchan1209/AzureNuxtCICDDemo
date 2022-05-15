const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')
console.log(process.env.NODE_ENV)
console.log(process.env.VUE_APP_API_URL)
console.log(process.env.VUE_APP_CLOUD_WEB)
async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(3000, '0.0.0.0')
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()
