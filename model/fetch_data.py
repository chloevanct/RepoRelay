from pymongo import MongoClient

def fetch_data():
    # Connect to MongoDB

    client = MongoClient("mongodb+srv://m001-student:m001-mongodb-basics@reporelay.tqbaobr.mongodb.net/?retryWrites=true&w=majority&appName=RepoRelay")
  
    print(client)
    db = client['test']

    # Fetch all projects
    projects_collection = db['projects']
    projects = projects_collection.find()
    print("Projects:")
    for project in projects:
        print(project)

    # # Fetch all users
    # users_collection = db['users']
    # users = users_collection.find()
    # print("\nUsers:")
    # for user in users:
    #     print(user)

if __name__ == '__main__':
    fetch_data()
