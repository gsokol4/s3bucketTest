const express = require("express")

const app = express()
awsUpload = require('./s3/uploadS3.js')

const port = process.env.PORT || 400;

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/upload', (req, res) => {

})

app.listen(port, () => console.log(`server running on port ${port}`))