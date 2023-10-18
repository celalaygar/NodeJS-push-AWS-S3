const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config();

let s3 = null;

const credentials = {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
}

try {
    s3 = new AWS.S3({
        ...credentials
    });
    console.log("authorization end");

    const bucketName = "cullo-mybucket"
    const fileName = "ss2.mp4"
    const fileData = fs.readFileSync(fileName);

    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: fileData,
    };

    s3.putObject(params).on("httpUploadProgress", (evt) => {
        console.log("Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%");
        console.log(
            "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
    }).promise().then((err, data) => {
        console.log("err: ", err);
        console.log("data: ", data);
        console.log(fileName + " uploaded successfully.");
        console.log("https://" + bucketName + ".s3." + "REGION" + ".amazonaws.com/" + fileName);
    });
    console.log("upload end");
} catch (err) {
    console.log("putObject");
    console.log(err);
}
