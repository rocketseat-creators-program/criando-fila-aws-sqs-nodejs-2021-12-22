import AWS from 'aws-sdk'

AWS.config.update({ region: 'us-east-1'})

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' })
const queueURL = 'https://sqs.us-east-1.amazonaws.com/251882100115/my-queue'

const sendSQS = function() {
  const params: AWS.SQS.SendMessageRequest = {
    QueueUrl: queueURL,
    DelaySeconds: 0,
    MessageBody: JSON.stringify({
      id: 1,
      name: 'Iphone X',
      description: 'Phone at Apple',
      value: 15000
    }),
    MessageAttributes: {
      "Produto_1": {
        DataType: 'String',
        StringValue: 'Macbook M1'
      },
      "Produto_2": {
        DataType: 'String',
        StringValue: 'Iphone X'
      },
      "Produto_3": {
        DataType: 'String',
        StringValue: 'Teclado Mecanico'
      },
    }
  }

  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log(`Error ${err}`)
    } else {
      console.log(`Success: ${JSON.stringify(data)}`)
    }
  })
}

sendSQS()