const aws = require('aws-sdk')
const fs = require('fs')
require('dotenv').config()

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccesskey: process.env.AWS_SECRET_ACCESS_KEY
})

const s3 = new aws.S3({params : {Bucket: 'gabrielsokoltestbucket'}})

console.log(process.env.AWS_ACCESS_KEY_ID)

const aws_upload = (params) => {
    new Promise((resolve, reject) =>{
        const {filename, file} = params

        //const buf = Buffer.from(file.replace(/^data:.+;base64,/, ""), "base64")

        const time = new Date().getTime()
        //console.log(file)
        console.log('file is above me')
        const data = {
            Key: `${filename}_${time}.jpg`,
            Body: file,
            ACL: 'public-read',
            ContentType: 'image/jpeg'
        }
    
        s3.upload(data, (err, data) => {
            if (err) {
                console.log(`Error uploading file: ${err}`)
                reject(err)
            } else {
                console.log(data)
                const url = `https://gabrielsokoltestbucket.s3.us-east-2.amazonaws.com/${filename}_${time}`
                console.log(`file uploaded successfully. file location: ${data.Location}`)
                resolve({url})
            }
        })
    
    })


}


const readStream = fs.createReadStream('server/pics/cute_cats_drawn.jpg')
aws_upload({"filename":'filename', "file": readStream})

exports.aws_upload = aws_upload
