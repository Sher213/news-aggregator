import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.tree import DecisionTreeClassifier

# Load the model and vectorizer once (for efficiency)
loaded_model = joblib.load('decision_tree_model.pkl')
loaded_vectorizer = joblib.load('tfidf_vectorizer.pkl')

def detect_fake_news(content):
    """
    Detects whether the given article content is fake news.
    Returns True if fake news, False otherwise.
    """
    X_new = loaded_vectorizer.transform([content])  # Ensure input is a list
    y_new_pred = loaded_model.predict(X_new)

    return bool(y_new_pred[0])
