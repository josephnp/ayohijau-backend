const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const uploadToS3 = (file) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${Date.now()}_${file.filename}`,
            Body: file.buffer,
            ACL: 'public-read',
        };

        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.Location);
            }
        })
    });
};

module.exports = uploadToS3;