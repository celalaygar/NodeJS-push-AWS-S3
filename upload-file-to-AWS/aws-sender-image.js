const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config();

let s3 = null;
const fileName = "pikachu1.png"
const fileData = fs.readFileSync(fileName);



const AWSCredentials = {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
}

try {
    s3 = new AWS.S3(
        AWSCredentials
    );
    console.log("authorization end");

    s3.upload({
        Bucket: "cullo-mybucket",
        Key: fileName,
        Body: fileData,
        ContentType: "image/PNG"  // "video/mp4"
    }, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`File uploaded successfully. ${data.Location}`);
        }
    });
    console.log("upload end");
} catch (err) {
    console.log("putObject");
    console.log(err);
}
