'use strict';

console.log('Loading function');

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

// Create the DynamoDB service object
var dynamo = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const done = (err, res) => callback(null, {
      statusCode: err ? '400' : '200',
      body: err ? err.message : JSON.stringify(res),
      headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
      },
  });

  console.log('Loading function');

  switch(event.pathParameters.proxy) {
    case 'fetchNextClue':
      switch (event.httpMethod) {
        case 'GET':
          dynamo.scan({ ScanFilter: { "Guessed" : {
            "AttributeValueList": [ {
              "BOOL": false
            } ],
            "ComparisonOperator": "EQ"
          } }, TableName: "cah-clue" }, function(err, res) {
            if(!err){
              var fetchedClueId = "";
              var fetchedClueText = "";
              var key=getRandomInt(res.Items.length);
              fetchedClueId=res.Items[key].ClueId.S;
              fetchedClueText=res.Items[key].Text.S;
              if(fetchedClueText.length<1){ console.warn("fetchNextClue clueText.length<1"); }
              done(null, { ClueId: fetchedClueId, Text: fetchedClueText });
            } else {
              done(err);
            }
          });
          break;
        default:
          done(new Error(`Unsupported method "${event.pathParameters.proxy} ${event.httpMethod}"`));
      }
      break;
    default:
      done(new Error(`Unsupported path "${event.pathParameters.proxy}"`));
  }
};
