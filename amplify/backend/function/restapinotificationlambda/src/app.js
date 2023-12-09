/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/notification', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

app.get('/notification/*', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

/****************************
* Example post method *
****************************/

app.post('/notification', function (req, res) {
  // Add your code here
  // res.json({success: 'post call succeed!', url: req.url, body: req.body})

  const eventBody = JSON.parse(req.body); // Parse the JSON string in event.body
  const { expoPushToken, title, body, data } = eventBody;

  const message = {
    to: expoPushToken,
    sound: "default",
    title: title,
    body: body,
    data: data,
  };

  try {
    const response = axios.post("https://exp.host/--/api/v2/push/send", message, {
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
    });

    const resp = {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(response.data),
    };
    // console.error("Axios response:", response.data);

    return res.json(resp);

  } catch (axiosError) {
    const resError = {
      statusCode: 400,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(axiosError.response.data),
    };
    // console.error("Axios error:", axiosError.response.data);
    return res.json(resError);
  }
});

app.post('/notification/*', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

/****************************
* Example put method *
****************************/

app.put('/notification', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

app.put('/notification/*', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

/****************************
* Example delete method *
****************************/

app.delete('/notification', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/notification/*', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
