from pymongo import MongoClient

# MongoDB Configuration
client = MongoClient("mongodb://127.0.0.1:27017/ankit")
db = client["ankit"]
users_collection = db["users"]

indexes = users_collection.index_information()
print(indexes)