import requests
from bs4 import BeautifulSoup
import pymongo
import os
from dotenv import load_dotenv
load_dotenv()

def extract_description_from_url(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check for any request errors

        soup = BeautifulSoup(response.content, 'html.parser')
        print("get the description")
        description_element = soup.find('div', {'class': 'css-1wekrze e1lbnp621'})
        print("====")
        print(description_element)
        return extract_text_from_html(description_element)

    except requests.exceptions.RequestException as e:
        print(f"An error occurred while requesting the URL: {e}")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None
def extract_text_from_html(html_text):
    try:
        soup = BeautifulSoup(html_text, 'html.parser')

        description_div = soup.find('div', {'data-cy': 'adPageAdDescription'})
        if description_div:
            paragraphs = description_div.find_all('p')
            extracted_text = '\n'.join(paragraph.get_text(strip=True) for paragraph in paragraphs)
            return extracted_text

    except Exception as e:
        print(f"An error occurred: {e}")

    return None

mongo_uri = os.getenv("MONGO_URI")
db_name = os.getenv("DB_NAME")
collection_name = os.getenv("COLLECTION_NAME")
olx_url = os.getenv("OLX_URL")

#the url to scrape==>>
url_to_scrape = olx_url
response = requests.get(url_to_scrape)

try:
    # Connecting to MongoDB
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

