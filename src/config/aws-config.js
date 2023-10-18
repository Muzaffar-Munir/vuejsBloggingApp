// cognito-config.js
import AWS from 'aws-sdk';

AWS.config.region = process.env.VUE_APP_AWS_REGION; // Replace with your AWS region

export default AWS;