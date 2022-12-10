import pika
from constants import getConstants
import json
from sendEmail import sendmail
import threading

constants=getConstants() 

qparams ={'email_worker_queue':['email','fname','lname','booking_id','moviename','theater','seats','price','reservation_date','reservation_time','seatIDs'],
    'reset_password_queue':['email','password']}



class ThreadedConsumer(threading.Thread):
    def __init__(self,queue_name,params):
        threading.Thread.__init__(self)
        self.queue_name=queue_name
        self.params=params
        creds = pika.PlainCredentials('guest', 'guest')
        try:
            connection = pika.BlockingConnection(pika.ConnectionParameters(host = constants['RABBITMQ_HOST'], 
                port = constants['RABBITMQ_PORT'], virtual_host = "/", credentials = creds))
        except Exception as e:
            print(e)

        self.channel = connection.channel()
        self.channel.queue_declare(queue=self.queue_name, durable=True)
        self.channel.basic_qos(prefetch_count=1)
        self.channel.basic_consume(queue=self.queue_name, on_message_callback=self.callback)
        threading.Thread(target=self.channel.basic_consume(self.queue_name, on_message_callback=self.callback))

    def callback(self,ch, method, properties, body):
        print(" [x] Received "+self.queue_name)
        ch.basic_ack(delivery_tag=method.delivery_tag)
        body=json.loads(body); 
        print("body ", body)
        details={}

        for p in self.params:
            if p not in body:
                continue
            details[p]=body[p]

        sendmail(details)

        print(" [x] Done ",self.queue_name)


    def run(self):
        print ('starting thread to consume from rabbit for queue:'+self.queue_name)
        try:
            self.channel.start_consuming()
        except Exception as e:
            print("exception ", e)

def main():
    for q in constants["QUEUE_NAME"]:
        print ('launch thread ', q)
        td = ThreadedConsumer(queue_name=q,params=qparams[q])
        td.start()

main()