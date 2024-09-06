const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const sqs = new AWS.SQS()
const operation = {}

operation.sendSqsMessage = async (name, data) => {
	sqs.sendMessage({
		MessageBody:
			JSON.stringify({
				"labels": [name],
				"data": data
			}),
		MessageDeduplicationId: Math.random().toString(),
		MessageGroupId: Math.random().toString(),
		QueueUrl: process.env.SQS_QUEUE_URL,
	}, function (err, data) {
		if (err) {
			//console.log("Error", err);
		} else {
			//console.log("Success", data.MessageId);
		}
	});
}

module.exports = operation