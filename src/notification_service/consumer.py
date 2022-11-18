import pika
import time
from constants import getConstants
import json
from sendEmail import sendmail

constants=getConstants() 

creds = pika.PlainCredentials('guest', 'guest')
try:
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host = constants['RABBITMQ_HOST'], port = constants['RABBITMQ_PORT'], virtual_host = "/", credentials = creds)
    )

except Exception as e:
    print(e)
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host = constants['RABBITMQ_HOST'], port = constants['RABBITMQ_PORT'], virtual_host = "/", credentials = creds)
    )

channel = connection.channel()

channel.queue_declare(queue=constants['QUEUE_NAME'], durable=True)
print(' [*] Waiting for messages. To exit press CTRL+C')


def callback(ch, method, properties, body):
    print(" [x] Received")
    ch.basic_ack(delivery_tag=method.delivery_tag)
    body=json.loads(body); 
    details={}
    details['email'] = body['email']
    details['booking_id'] = body['booking_id']
    details['moviename']= body['moviename']
    details['theatre']=body['theatre']
    details['seats']=body['seats']
    details['date']=body['date']
    sendmail(details)
    time.sleep(body.count(b'.'))
    print(" [x] Done")
    


channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue=constants['QUEUE_NAME'], on_message_callback=callback)

try:
    channel.start_consuming()
except Exception as e:
    print(e)
    channel.start_consuming()

