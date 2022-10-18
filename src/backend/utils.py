from pymongo import MongoClient

# client = pymongo.MongoClient("mongodb+srv://bmcshane:<password>@cluster0.vkmii.mongodb.net/?retryWrites=true&w=majority")
# db = client.test

def get_db_handle(db_name, host, port, username, password):
    client = MongoClient(host=host,
                         port=int(port),
                         username=username,
                         password=password)
    db_handle = client['db_name']
    return db_handle, client