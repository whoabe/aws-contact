### TL;DR

Email Contact form using AWS SES, form details stored in DynamoDB, login with Cognito User Pools, and hosted in S3 bucket.

### Demo:

https://mk-challenge-whoabe.s3-ap-southeast-1.amazonaws.com/index.html

### Directory:

    .
    ├── Amplify                         # AWS amplify library (*gitignored)
    ├── build                           # production files
    ├── Lambda                          # AWS lambda functions written in javascript using NodeJs for SES and DynamoDB put
    ├── src                             # Source files
        ├── components                  # components used in app
        │     └── ContactForm.js        # Form component
        └── App.js                      # App component


### How to run:

\$ yarn install
\$ yarn start
