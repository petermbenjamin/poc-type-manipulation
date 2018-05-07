const http = require('http')
const url = require('url')
const querystring = require('querystring')
const PORT = 3000

const ESCAPECHARS = RegExp(`<|>|&`, 'g') // just check for 3 chars in this contrived example

function sanitize(input) {
  if (typeof input === 'string') {
    if (!ESCAPECHARS.test(input)) {
      console.log(`input: ${input} is assumed to be good...`)
      return input
    }
    console.log(`input: ${input} needs to be sanitized...`)
    return input
      .replace('&', '&amp;')
      .replace('<', '&lt;')
      .replace('>', '&gt;')
  }
  return input
}

const requestHandler = (req, resp) => {
  // console.log(req)
  let parsedURL = url.parse(req.url)
  // sanitize & eval
  let userInput = querystring.parse(parsedURL.query)
  let sanitized = sanitize(userInput.foo)
  setImmediate(() => eval(sanitized))
  resp.end(JSON.stringify(userInput))
}

const server = http.createServer(requestHandler)

server.listen(PORT, err => {
  if (err) return console.log(`server failed: ${err}`)
  console.log(`server listening on ${PORT}`)
})
