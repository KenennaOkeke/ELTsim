import json
import random
import statistics
import boto3
import requests

sqs = boto3.client('sqs', endpoint_url="http://localhost:4566", region_name='us-east-1')
producer_queue_url = sqs.get_queue_url(QueueName="EVOELT_PRODUCER.fifo")['QueueUrl']
consumer_queue_url = sqs.get_queue_url(QueueName="EVOELT_CONSUMER.fifo")['QueueUrl']

def receive(receive_count):
    response = sqs.receive_message(
        QueueUrl=producer_queue_url,
        MaxNumberOfMessages=receive_count,
        WaitTimeSeconds=10
    )
    if "Messages" in response:
        for message in response["Messages"]:
            print("Received SQS Message ID: " + message["MessageId"])
            # TODO: Error handling
            message_body = json.loads(message["Body"])
            raw_event_id = message_body["raw_event_id"]
            labels = message_body["labels"]
            print("Processing Raw Event ID " + raw_event_id)
            current_and_past_events = requests.get(
                "http://localhost:8080/lookup/raw/sequence",
                {"raw_event_id": raw_event_id}
            ).json()
            if "error" not in current_and_past_events:  # TODO: case handle errors (500 if not found currently)
                minimum = []
                average = []
                maximum = []
                for event in current_and_past_events["events"]:
                    data = json.loads(event["data"])
                    minimum.append(data["min_bandwidth"][0])
                    average.append(data["average_bandwidth"][0])
                    maximum.append(data["max_bandwidth"][0])

                produced_message = {
                    "raw_event_id": raw_event_id,
                    "labels": ["v1"],
                    "data": {
                        "min_average": statistics.mean(minimum),
                        "average_average": statistics.mean(average),
                        "max_average": statistics.mean(maximum)
                    }
                }
                consumer = sqs.send_message(
                    QueueUrl=consumer_queue_url,
                    MessageBody=json.dumps(produced_message),
                    MessageGroupId=str(random.random()),
                    MessageDeduplicationId=str(random.random())
                )
                print("Sent Processed Message ID " + consumer["MessageId"])
            print("Deleting SQS Message: " + message["MessageId"])
            sqs.delete_message(
                QueueUrl=producer_queue_url,
                ReceiptHandle=message["ReceiptHandle"]
            )
            print("Deleted SQS Message: " + message["MessageId"])


if __name__ == '__main__':
    while True:
        receive(receive_count=1)
