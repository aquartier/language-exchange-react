require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT || 5000

app.get('/questions', require('./questions'))

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})


app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
