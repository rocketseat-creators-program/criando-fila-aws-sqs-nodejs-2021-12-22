import AWS from 'aws-sdk'

AWS.config.update({ region: 'us-east-1'})

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' })
const queueURL = 'https://sqs.us-east-1.amazonaws.com/251882100115/my-queue'

const params: AWS.SQS.ReceiveMessageRequest = {
  QueueUrl: queueURL,
  MaxNumberOfMessages: 10,
  VisibilityTimeout: 30,
  WaitTimeSeconds: 0,    
}

function deleteMessage() {
  sqs.receiveMessage(params, function(err: AWS.AWSError, data: AWS.SQS.ReceiveMessageResult) {
    if (err) {
      console.log(`Error ${err}`)
    } else if (data.Messages) {
      console.log("Number of messages received: ", data.Messages.length)

      data.Messages.forEach(element => {
        console.log('Message -> ', element)

        const deleteParams: AWS.SQS.DeleteMessageRequest = {
          QueueUrl: queueURL,
          ReceiptHandle: element.ReceiptHandle || '' 
        }

        sqs.deleteMessage(deleteParams, function(err: AWS.AWSError, data) {
          if (err) {
            console.log(`Delete error: ${err}`)
          } else {
            console.log('Message Deleted: ', data)
          }
        })
      })
    } else console.log(`No messages received`);
  })
}

deleteMessage()