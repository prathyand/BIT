import os

def getConstants():
    constants = {}
    constants["APP_PORT"] = 5003

    constants["RABBITMQ_HOST"] = 'localhost'
    if os.environ.get('RABBITMQ_HOST') is not None:
        constants["RABBITMQ_HOST"] = os.environ.get('RABBITMQ_HOST')

    constants["RABBITMQ_PORT"] = '5672'
    if os.environ.get('RABBITMQ_PORT') is not None:
        constants["RABBITMQ_PORT"] = os.environ.get('RABBITMQ_PORT')

    constants["QUEUE_NAME"] = 'email_worker_queue'
    if os.environ.get('QUEUE_NAME') is not None:
        constants["QUEUE_NAME"] = os.environ.get('QUEUE_NAME')

    return constants