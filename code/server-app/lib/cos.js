var ibm = require('ibm-cos-sdk');
 
var config = {
    endpoint: process.env.COS_ENDPOINT || '<endpoint>',
    apiKeyId: process.env.COS_IAM_APIKEY || '<cos_apikey>',
    serviceInstanceId: process.env.COS_ID || '<resource-instance-id>',
};


let cos;
let cos_bucket_name = process.env.COS_BUCKET_NAME;

/**
 * Connects to the Cloud Object Storage
 * 
 * @return {Promise} - when resolved, contains the ref to the storage, ready to go
 */
const COSConnect = () => {
    return new Promise((resolve, reject) => {
        var cos_ref = new ibm.S3(config);
        if (cos_ref) {
            //console.log(cos_ref)
            resolve(cos_ref)
        } else {
            console.log('Connect failure for COS ID: ' +
                config.serviceInstanceId);
            reject();
        }
    });
}

// Initialize the COS when this module is loaded
(function getCOSConnection() {
    console.log('Initializing Object Storage connection...', 'getCOSConnection()');
    COSConnect().then((cos_ref) => {
        console.log('Object Storage connection initialized.', 'COSConnect()');
        cos = cos_ref;
    }).catch((err) => {
        console.log('Error while initializing COS: ' + err.message, 'getCOSConnection()');
        throw err;
    });
})();

function doCreateObject(key, data) {
    console.log('Creating object');
    return cos.putObject({
        Bucket: cos_bucket_name,
        Key: key,
        Body: data
    }).promise();
}

function doGetObject(key) {
    console.log('Getting object: ' + key);
    return cos.getObject({
        Bucket: cos_bucket_name,
        Key: key
    }).promise();
}

function doDeleteObject(key) {
    console.log('Deleting object');
    return cos.deleteObject({
        Bucket: cos_bucket_name,
        Key: key
    }).promise();
}

module.exports = {
    create: doCreateObject,
    get: doGetObject,
    delete: doDeleteObject,
  };