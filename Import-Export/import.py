import pandas as pd
from pymongo import MongoClient
import time

#If the name of collection not matching, creates automatically a new one!!!
mongo_uri = 'mongodb+srv://atoma6:parola123@nodejsapi.poinrf1.mongodb.net/?retryWrites=true&w=majority'  
db_name = 'customers'  
collection_name = 'customers1'
csv_file_path = "./customers_customers-1000.csv"

start = time.time()


# Read the CSV 
df = pd.read_csv(csv_file_path)

# Convert the dataframe to a list of dictionaries
try:
    data = df.to_dict(orient='records')
except Exception as e:
    print("Error when converting to dictionaries")

# Connect to MongoDB
try:
    client = MongoClient(mongo_uri)
    db = client[db_name]
    collection = db[collection_name]
except Exception as e:
    print("Error when connecting to db")


# Insert the data into MongoDB
collection.insert_many(data)
client.close()

end = time.time()

print('CSV data imported to MongoDB successfully.')
print("Total time: ")
print(end-start)
