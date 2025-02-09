from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
import time
from apscheduler.schedulers.background import BackgroundScheduler
from modules.sent_analysis import perform_sentiment_analysis
from modules.fake_news_det import detect_fake_news

app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL',
    f"postgresql://{os.getenv('POSTGRES_DB_USER', 'postgres')}:{os.getenv('POSTGRES_DB_PASSWORD', '123456')}@{os.getenv('POSTGRES_DB_HOST', 'localhost')}:{os.getenv('POSTGRES_DB_PORT', '5432')}/{os.getenv('POSTGRES_DB_NAME', 'news_agg')}"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Article(db.Model):
    __tablename__ = 'articles'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    fake_news_warning = db.Column(db.Boolean, nullable=True)
    sentiment_score = db.Column(db.Float, nullable=True)
    title = db.Column(db.String(200), nullable=False)
    url = db.Column(db.String(200), nullable=False)

def update_sent_scores():
    """Update sentiment scores for articles with a score of 0.0"""
    with app.app_context():
        articles_to_analyze = Article.query.filter(Article.sentiment_score == 0.0).all()
        for article in articles_to_analyze:
            article.sentiment_score = perform_sentiment_analysis(article.content)
        db.session.commit()

def detect_fake_news_in_recent_articles():
    """Detect fake news for the most recent articles"""
    with app.app_context():
        recent_articles = Article.query.order_by(Article.id.desc()).limit(100).all()
        for article in recent_articles:
            article.fake_news_warning = bool(detect_fake_news(article.content))
        db.session.commit()

def background_task():
    """Runs every 5 seconds to check for new data and update the database"""
    print("Running background task to update database...")
    update_sent_scores()
    detect_fake_news_in_recent_articles()
    print("Database update complete.")

# Start the background scheduler
scheduler = BackgroundScheduler()
scheduler.add_job(func=background_task, trigger="interval", seconds=5)
scheduler.start()

@app.route('/')
def home():
    return "Flask App is Running!"

if __name__ == '__main__':
    with app.app_context():  # Ensure app is initialized properly
        db.create_all()  # Create tables if they don't exist
    try:
        app.run(host='0.0.0.0', port=5000, debug=False, use_reloader=False)
    finally:
        scheduler.shutdown()
