import requests
from bs4 import BeautifulSoup
import pymongo
import os
from dotenv import load_dotenv
load_dotenv()

mongo_uri = os.getenv("MONGO_URI")
db_name = os.getenv("DB_NAME")
collection_name = os.getenv("COLLECTION_NAME")
olx_url = "https://www.olx.ro/imobiliare/apartamente-garsoniere-de-vanzare/2-camere/?currency=EUR&view=grid"

try:
    # Connecting to MongoDB try separat!
    client = pymongo.MongoClient(mongo_uri)
    db = client[db_name]
    collection = db[collection_name]
    print("Connected to db")

    #try to connect to the olx page
    response = requests.get(olx_url)

    if response.status_code == 200:
        # Parse the HTML content
        soup = BeautifulSoup(response.content, 'html.parser')

        title_elements = soup.find_all('h6', {'class': 'css-40l3sp er34gjf0'})

        for title_element, in title_elements:
            title = title_element.text.strip()
            # Create a dictionary to hold the data
            ad_data = {
                'title': title,
            }
            # Insert the data into the MongoDB collection
            result = collection.insert_one(ad_data)

        print("Extraction complete!")
        print(f"{len(title_elements)} ads were added to MongoDB")

    else:
        print(f"Failed to retrieve the webpage. Status code: {response.status_code}")

except pymongo.errors.ConnectionFailure as e:
    print(f"Could not connect to MongoDB: {e}")
except Exception as e:
    print(f"An error occurred: {e}")

