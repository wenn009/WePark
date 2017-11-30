const express = require('express');
const models = require('../models');
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()
const AWS = require('aws-sdk')
const async = require('async')
const bucketName = "garage-image-bucket"
const path = require('path')
const fs = require('fs')
let pathParams, image, imageName;
AWS.config.loadFromPath('config.json')


const s3 = new AWS.S3({region: 'us-east-1'})
const createMainBucket = (callback) => {
	// Create the parameters for calling createBucket
	const bucketParams = {
	   Bucket : bucketName
	};                    
	s3.headBucket(bucketParams, function(err, data) {
	   if (err) {
	   	console.log("ErrorHeadBucket", err)
	      	s3.createBucket(bucketParams, function(err, data) {
			   if (err) {
			   	console.log("Error", err)
			      callback(err, null)
			   } else {
			      callback(null, data)
			   }
			});
	   } else {
	      callback(null, data)
	   }
	})                             
}

const createItemObject = (callback) => {
  const params = { 
        Bucket: bucketName, 
        Key: `${imageName}`, 
        ACL: 'public-read',
        Body:image
    };
	s3.putObject(params, function (err, data) {
		if (err) {
	    	console.log("Error uploading image: ", err);
	    	callback(err, null)
	    } else {
	    	console.log("Successfully uploaded image on S3", data);
	    	callback(null, data)
	    }
	})  
}


const UploaderFileController = {
    registerRouter() {
        const router = express.Router();

        router.get('/', this.displayForm);
        router.post('/upload', multipartMiddleware, this.upload);

        return router;
    },
    upload(req, res, next){
        var tmp_path = req.files.file.path;
        image = fs.createReadStream(tmp_path);
        imageName = req.files.file.name;
        async.series([
            createMainBucket,
            createItemObject
            ], (err, result) => {
            if(err) return res.send(err)
            else return res.json({message: "Successfully uploaded"}) 
        })
    },
    displayForm(req, res){
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.write(
            '<form action="/upload" method="post" enctype="multipart/form-data">' +
            '<input type="file" name="file">' +
            '<input type="submit" value="Upload">' +
            '</form>'
        );
        res.end();
    }
}

module.exports = UploaderFileController.registerRouter();