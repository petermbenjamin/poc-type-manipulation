let input1 = 'test string'
let input2 = '<script>alert("test malicious string")</script>'

const ESCAPECHARS = RegExp(`<|>|&`, 'g') // just check for 3 chars in this contrived example

// sanitization logic on client-side and server-side
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
  console.log(`don't know what to do with ${input}... returning it as is`)
  return input
}

sanitize(input1)
sanitize(input2)

let value = document.getElementById('input').value

let sanitizedValue = sanitize(value)
let r = new XMLHttpRequest()
r.open('POST', 'localhost:3000/test', true)
r.onreadystatechange = function() {
  if (r.readyState != 4 || r.status != 200) return
  console.log(`success: ${r.responseText}`)
}
r.send('banana=yellow')
