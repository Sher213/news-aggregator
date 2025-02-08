import numpy as np
import re
import string
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk

# Ensure nltk resources are available
nltk.download('vader_lexicon')

def perform_sentiment_analysis(content):

    # Text Preprocessing function
    def clean_text(text):
        text = text.lower()
        text = re.sub(r'\d+', '', text)  # Remove numbers
        text = text.translate(str.maketrans('', '', string.punctuation))  # Remove punctuation
        text = re.sub(r'\s+', ' ', text).strip()  # Remove extra spaces
        return text

    # Sentiment Analysis function
    def get_sentiment_score(text):
        sia = SentimentIntensityAnalyzer()
        return sia.polarity_scores(text)['compound']

    # Apply cleaning and score
    clean_content = clean_text(content)
    score = get_sentiment_score(clean_content)

    return score