var ApiBuilder = require('claudia-api-builder');
var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

var table = "pin";
var pin = "12345";
var params = {
    TableName: table,
    Key:{
        "pin": pin,
    }
};

api = new ApiBuilder();
module.exports = api;


api.get('/greet', function (request) {
  console.log("i am in greet method");
  console.log("JSON stringify" + JSON.stringify(docClient));
  
    AWS.config.update({
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com"
    });

    return new Promise ( (resolve, reject ) => {
        docClient.get(params, (err, data)=>{
            if (err) { 
                    console.log("failed!");
                    resolve(err) }
            else { 
                console.log("passed!");
                resolve(data)};
        })
    });
});