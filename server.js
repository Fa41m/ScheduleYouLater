const express = require('express')
const app = express()
app.use(express.static('public'));
const port = process.env.port || 8080

app.listen(port)