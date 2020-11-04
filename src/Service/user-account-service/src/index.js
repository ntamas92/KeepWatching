require('dotenv').config()
const http = require('http')

const server = http.createServer()

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})