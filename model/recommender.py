

"""
This script performs a recommendation process for a project collaboration platform. It fetches data from a MongoDB database,
preprocesses the data, calculates project recommendations for each user based on their preferences using a TF-IDF and cosine 
similarity approach, filters out projects that users already own or are subscribed to, and updates the recommendations in the 
database.

The file was generated with ChatGPT with some modification and debugging. Prompt: so, I want to write a very simple recommender program ( i think you can probably use scikit learn for that?

Usage:
1. Ensure MongoDB URI is set in the environment variable "MONGO_URI".
2. Run the script to fetch, preprocess data, compute recommendations, filter them, and update the MongoDB collection.

Functions:
- fetch_data(): Connects to MongoDB and fetches user and project data.
- clean_and_preprocess_data(projects_data, users_data): Cleans and preprocesses the fetched data.
- recommend_projects(projects_df, users_df): Computes project recommendations for users.
- remove_user_owned_and_subscribed_projects(recommended_projects, df_users): Filters out projects that users already own or 
  are subscribed to.
- update_recommendations_collection(final_recommendations): Updates the recommendations in the MongoDB collection.
"""


import numpy as np
from pymongo import MongoClient
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv
import os



def fetch_data():
    # Connect to MongoDB

    client = MongoClient(os.getenv("MONGO_URI"))
  
    db = client['test']

    # Fetch all projects
    projects_collection = db['projects']
    projects = projects_collection.find()
    
    # Convert the MongoDB cursor to a list of dictionaries
    projects_list = list(projects)

    # Create a DataFrame from the list of dictionaries
    df_projects = pd.DataFrame(projects_list)
    print("Projects DataFrame:")
    


    
    # # Fetch all users
    users_collection = db['users']
    users = users_collection.find()
    
    # Convert the MongoDB cursor to a list of dictionaries
    users_list = list(users)

    # Create a DataFrame from the list of dictionaries
    df_users = pd.DataFrame(users_list)

    return df_projects, df_users

def clean_and_preprocess_data(projects_data, users_data):
    # Convert the projects data to DataFrame
    projects_df = pd.DataFrame(projects_data)

    # Drop non-relevant columns from projects
    projects_df = projects_df[['projectID', 'difficultyTag', 'projectTags', 'techTags']]

    # Convert lists to comma-separated strings in projects
    projects_df['projectTags'] = projects_df['projectTags'].apply(lambda tags: ', '.join(tags))
    projects_df['techTags'] = projects_df['techTags'].apply(lambda tags: ', '.join(tags))

    # Normalize the difficulty tags in projects
    difficulty_mapping = {
        "Easy": "easy",
        "Intermediate": "medium",
        "Hard": "hard"
    }
    projects_df['difficultyTag'] = projects_df['difficultyTag'].map(difficulty_mapping)

    # Convert the users data to DataFrame
    users_df = pd.DataFrame(users_data)

    # Drop non-relevant columns from users
    users_df = users_df[['userID', 'preferences']]

    # Convert preferences to a single string in users
    def preferences_to_string(prefs):
        difficulty_str = '; '.join(prefs['difficultyTags'])
        project_tags_str = ', '.join(prefs['projectTags'])
        tech_tags_str = ', '.join(prefs['techTags'])
        return f"{difficulty_str}; {project_tags_str}; {tech_tags_str}"

    users_df['preferences'] = users_df['preferences'].apply(preferences_to_string)

    # Rename columns to match the desired format
    projects_df.rename(columns={
        'projectID': 'projectID',
        'difficultyTag': 'difficultyTag',
        'projectTags': 'projectTags',
        'techTags': 'techTags'
    }, inplace=True)

    users_df.rename(columns={
        'userID': 'userID',
        'preferences': 'preferences'
    }, inplace=True)

    return projects_df, users_df


def recommend_projects(projects_df, users_df):
    # Combine project tags and techTags
    projects_df['combinedTags'] = projects_df['projectTags'] + ', ' + projects_df['techTags']
    
    # Preprocess text (e.g., lowercasing)
    def preprocess_text(text):
        return text.lower()
    
    projects_df['combinedTags'] = projects_df['combinedTags'].apply(preprocess_text)
    users_df['preferences'] = users_df['preferences'].apply(lambda x: preprocess_text(', '.join(x.split('; ')[1:])))
    
    # Combine all text data for consistent vectorization
    all_texts = pd.concat([projects_df['combinedTags'], users_df['preferences']])
    
    # Vectorize all texts
    vectorizer = TfidfVectorizer()
    all_vectors = vectorizer.fit_transform(all_texts)
    
    # Split the vectorized data
    project_vectors = all_vectors[:len(projects_df)]
    user_vectors = all_vectors[len(projects_df):]
    
    # Calculate similarity
    cosine_sim = cosine_similarity(user_vectors, project_vectors)
    
    # Get recommendations for each user
    def get_recommendations(similarity_matrix, project_ids):
        recommendations = {}
        for i, sim_scores in enumerate(similarity_matrix):
            recommendations[users_df['userID'].iloc[i]] = [project_ids[j] for j in np.argsort(sim_scores)[::-1]]
        return recommendations
    
    # Example output
    project_ids = projects_df['projectID'].tolist()
    recommended_projects = get_recommendations(cosine_sim, project_ids)
    
    return recommended_projects

def remove_user_owned_and_subscribed_projects(recommended_projects, df_users):

    res = []
    for user_id, recommended in recommended_projects.items():
        
        

        # Get the user's owned and subscribed projects
        user_data = df_users[df_users['userID'] == user_id].iloc[0]
        owned_projects = user_data['ownedProjects']
        subscribed_projects = user_data['subscribedProjects']
        

        filtered_recommendations = []
        
        # # Remove owned and subscribed projects from recommendations
        # filtered_recommendations = [project for project in recommended if project not in owned_projects and project not in subscribed_projects]

        for project in recommended:
            if project not in owned_projects:
                if project not in subscribed_projects:
                    filtered_recommendations.append(project)
                


        print("filtered recommendations", filtered_recommendations)
        recommended_projects[user_id] = filtered_recommendations

    return recommended_projects

def update_recommendations_collection(final_recommendations):
    # Connect to MongoDB
    client = MongoClient(os.getenv("MONGO_URI"))
    db = client['test']
    
    # Access the recommendations collection
    recommendations_collection = db['recommendations']
    
    # Drop the existing recommendations collection
    recommendations_collection.drop()
    
    # Insert the new recommendations
    for user_id, recommendations in final_recommendations.items():
        recommendations_collection.insert_one({
            "userID": user_id,
            "recommendations": recommendations
        })




# Example usage
if __name__ == '__main__':

    df_projects, df_users = fetch_data()

    df_projects2, df_users2 = fetch_data()

    df_projects, df_users = clean_and_preprocess_data(df_projects, df_users)


    projects = recommend_projects(df_projects, df_users )

    final_recommendations = remove_user_owned_and_subscribed_projects(projects, df_users2)

