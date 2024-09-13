from flask import Flask, request
import pandas as pd
import nltk
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.ensemble import RandomForestClassifier
import joblib

import ssl
ssl._create_default_https_context = ssl._create_unverified_context

nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('omw-1.4')
nltk.download('averaged_perceptron_tagger')

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

app = Flask(__name__)

# @staticmethod
def remove_stopwords(text):
    # Tokenize the text by splitting on whitespace
    words = text.split()
    stop=set(stopwords.words('english'))
    # Remove stopwords
    filtered_words = [word for word in words if word not in stop]

    # Rejoin the filtered words into a single string
    return ' '.join(filtered_words)

# @staticmethod
def lem_words(text):
    # Tokenize the text by splitting on whitespace
    words = text.split()
    lemmatizer = WordNetLemmatizer()
    # Remove stopwords
    stemmed = [lemmatizer.lemmatize(word) for word in words]

    # Rejoin the filtered words into a single string
    return ' '.join(stemmed)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/data', methods=['GET'])
def get_data():

    param1 = request.args.get('param1')
    text = pd.Series(param1)

    #Make everything lowercase
    text = text.str.lower()
    
    #Remove stop words
    text = text.apply(lambda x: remove_stopwords(x))

    #Remove Punctuation
    text= text.str.replace(r'[^a-zA-Z0-9 ]', '', regex=True)

    #Lemm Everything
    text = text.apply(lambda x: lem_words(x))

    #Load Model
    model = joblib.load('./vector.pkl')

    #Make Prediction
    predictions = model.predict(text)

    #Return Prediction
    return predictions.tolist()