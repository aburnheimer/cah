# cah
Celebrity@Home

## Standing up the Environment
1. Create a Cloud Formation stack using <code>cah_api_endpoint.json</code>

## Uploading Subsequent Function
1. <code>zip function.zip cah-util-lambda_function.js</code>
2. <code>aws lambda create-function --function-name cah-api-utilhttpendpoint-UHKW87G3XP72L --zip-file fileb://function.zip --handler index.handler --runtime nodejs12.x --role arn:aws:iam::203331381859:role/cah-api-microservicehttpendpointRole-DAPD6T23FZRU</code>
