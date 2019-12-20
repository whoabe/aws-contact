// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
// Set SES service object
const SES = new AWS.SES();
// --------------------
// Set AWS config region for DB
const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-2" });

exports.handler = (event, context) => {
  // Create DB params
  const dbParams = {
    TableName: "Messages",
    Item: {
      email: event.email ? event.email : "No Email",
      name: event.name ? event.name : "No name",
      messageId: event.message ? event.message : ""
    }
  };

  //   Set const variables pulled from event
  const recipient = event.email;
  const subject = event.name;
  const body_text = event.message;
  const body_html = `<html>
    <head></head>
        <body>
            <p>${body_text}</p>
        </body>
    </html>`;

  // Create sendEmail params
  const emailParams = {
    Destination: {
      ToAddresses: [recipient]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body_html
        },
        Text: {
          Charset: "UTF-8",
          Data: body_text
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject
      }
    },
    Source: "mkdecisionemail@gmail.com"
  };

  // Create promises
  const sendPromise = SES.sendEmail(emailParams).promise();
  const putPromise = documentClient.put(dbParams).promise();

  // Call promises
  sendPromise
    .then(data => {
      console.log(data.MessageId);
      context.done(null, "Email Sent");
      putPromise()
        .then(data => {
          console.log(data);
          context.done(null, "data input");
        })
        .catch(err => {
          console.error(err, err.stack);
          context.done(null, "failed");
        });
    })
    .catch(err => {
      console.error(err, err.stack);
      context.done(null, "Failed");
    });
};
