import pandas as pd
from pymongo import MongoClient
import time


#folosesc env ca sa ascund parola
mongo_uri = 'mongodb+srv://atoma6:parola123@nodejsapi.poinrf1.mongodb.net/?retryWrites=true&w=majority'
database_name = 'customers'
collection_name = 'customers'

try:
    client = MongoClient(mongo_uri)
    db = client[database_name]
    collection = db[collection_name]
except Exception as e:
    print("Error when connecting to db")

start = time.time()

# Retrieve data from the MongoDB collection
#filtrare date, ascundere informatii private, filtrare pana la col H
data = collection.find()

##NOT WORKING
#if data:
#    raise Exception("No data found in the collection")

#Caut ce este in data;


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

