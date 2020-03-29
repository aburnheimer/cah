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

  const returnRandomUnguessedClue = (err, res) => {
    if(!err){
      var fetchedClueId = "";
      var fetchedClueText = "";
      if(res.Items.length>0){
        var key=getRandomInt(res.Items.length);
        fetchedClueId=res.Items[key].ClueId.S;
        fetchedClueText=res.Items[key].Text.S;
        if(fetchedClueText.length<1){ console.warn("fetchNextClue clueText.length<1"); }
      }
      done(null, { ClueId: fetchedClueId, Text: fetchedClueText, CluesRemaining: res.Items.length});
    } else {
      done(err);
    }
  };

  console.log('Loading function');

  switch(event.pathParameters.proxy) {
    case 'fetchNextClue':
      switch (event.httpMethod) {
        case 'GET':
          if("queryStringParameters" in event &&
              event.queryStringParameters && "guessedClue" in event.queryStringParameters &&
              event.queryStringParameters["guessedClue"].length > 0){
            dynamo.updateItem({
                Key:{ "ClueId": { "S": event.queryStringParameters["guessedClue"] } },
                UpdateExpression: "SET Guessed=:g",
                ExpressionAttributeValues: { ":g": { "BOOL": true } },
                TableName: "cah-clue" }, function(err, res) {
              if(!err){ // Same as scan() below, but depending on updateItem() as a cause
                dynamo.scan({ ScanFilter: { "Guessed" : {
                  "AttributeValueList": [ {
                    "BOOL": false
                  } ],
                  "ComparisonOperator": "EQ"
                } }, TableName: "cah-clue" }, function(err, res) { returnRandomUnguessedClue(err, res) });
              } else {
                done(err);
              }
            });
            } else {
              dynamo.scan({ ScanFilter: { "Guessed" : {
                "AttributeValueList": [ {
                  "BOOL": false
                } ],
                "ComparisonOperator": "EQ"
              } }, TableName: "cah-clue" }, function(err, res) { returnRandomUnguessedClue(err, res) });
            }
          break;
        default:
          done(new Error(`Unsupported method "${event.pathParameters.proxy} ${event.httpMethod}"`));
      }
      break;
    default:
      done(new Error(`Unsupported path "${event.pathParameters.proxy}"`));
  }
};
