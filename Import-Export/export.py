import pandas as pd
from pymongo import MongoClient
import time
import os
from dotenv import load_dotenv

load_dotenv()

mongo_uri = os.getenv("MONGO_URI")
db_name = os.getenv("DB_NAME")
collection_name = os.getenv("COLLECTION_NAME")

try:
    client = MongoClient(mongo_uri)
    db = client[db_name]
    collection = db[collection_name]
    connectDb = True
except Exception as e:
    print("Error when connecting to db") 
    connectDb = False

start = time.time()

# Retrieve data from the MongoDB collection
#filtrare date, ascundere informatii private, filtrare pana la col H
if connectDb:
    data = collection.find()
    # Convert data to a pandas DataFrame
    df = pd.DataFrame(data)

    # Specify the CSV file path
    csv_file_path = 'cusotmers_file_OUPUT.csv'

    # Export CSV
    #Index = False => collum index will be excluded
    df.to_csv(csv_file_path, index=False)

    client.close()

    end = time.time()

    print("Data exported to CSV successfully.")

    print('CSV data imported to MongoDB successfully.')
    print("Total time: ")
    print(end - start)

print('Stop')