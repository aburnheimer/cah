# Celebrity@Home

## Standing up the Environment
1. Create a Cloud Formation stack using <code>cah_api_endpoint.json</code>
2. Apply <code>use-aws-sdk.patch</code> to the newly created <code>cah-api-microservicehttpendpoint-...</code> lambda function.

## Uploading or Updating a Second Function
<code>zip function.zip cah-action-lambda_function.js</code>

...then either of:

* <code>aws lambda create-function --function-name cah-api-actionhttpendpoint-UHKW87G3XP72L --zip-file fileb://function.zip --handler cah-action-lambda_function.handler --runtime nodejs12.x --role arn:aws:iam::203331381859:role/cah-api-microservicehttpendpointRole-DAPD6T23FZRU</code>
* <code>aws lambda update-function-code --function-name cah-api-actionhttpendpoint-UHKW87G3XP72L --zip-file fileb://function.zip</code>

...then the create necessary API Gateway resource for <code>/action/{proxy+}</code>.
