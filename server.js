const http = require('http')
const url = require('url')
const querystring = require('querystring')

function sanitize(input) {
  const AMP = '&'
  const LT = '<'
  const GT = '>'
  const ESCAPECHARS = RegExp(`${LT}|${GT}|${AMP}`, 'g') // just check for 3 chars in this contrived example
  if (typeof input === 'string') {
    if (!ESCAPECHARS.test(input)) {
      // input is good
      return input
    }
    // input is bad
    return input
      .replace(AMP, '&amp;')
      .replace(LT, '&lt;')
      .replace(GT, '&gt;')
  }
  return input
}

const requestHandler = (req, resp) => {
  let parsedURL = url.parse(req.url)
  let userInput = querystring.parse(parsedURL.query)
  let sanitized = sanitize(userInput.foo)
  setImmediate(() => {
    console.log(`received: ${sanitized}`)
  })
  resp.end(JSON.stringify(sanitized))
}

const server = http.createServer(requestHandler)
const PORT = 3000
server.listen(PORT, err => {
  if (err) return console.log(`server failed: ${err}`)
  console.log(`server listening on ${PORT}`)
})
