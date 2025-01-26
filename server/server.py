import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
from transformers import pipeline

app = Flask(__name__)
CORS(app)

nlp = spacy.load("en_core_web_sm")
sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

def extract_aspects_and_sentiment(text):
    doc = nlp(text)
    aspects = []

    for chunk in doc.noun_chunks: 
        aspect = chunk.text
        sentiment_result = sentiment_pipeline(aspect)[0] 
        aspects.append({
            "aspect": aspect,
            "sentiment": sentiment_result['label'],
            "score": sentiment_result['score']
        })

    return aspects

@app.route('/upload-csv', methods=['POST'])
def upload_csv():
    file = request.files.get('file')
    if not file:
        return jsonify({"error": "No file uploaded!"}), 400

    try:
        df = pd.read_csv(file)
        if "review" not in df.columns:
            return jsonify({"error": "CSV must have a 'review' column"}), 400
        
        df = df.dropna(subset=['review'])
        df['review'] = df['review'].astype('object')

        df['aspects'] = df['review'].apply(lambda x: extract_aspects_and_sentiment(x))

        all_aspects = []
        for aspects in df['aspects']:
            all_aspects.extend(aspects)

        aspect_df = pd.DataFrame(all_aspects)
        positive_aspects = aspect_df[aspect_df['sentiment'] == 'POSITIVE']
        negative_aspects = aspect_df[aspect_df['sentiment'] == 'NEGATIVE']

        top_positive_aspects = (
            positive_aspects.groupby('aspect')['score']
            .mean()
            .sort_values(ascending=False)
            .head(3)
            .reset_index()
        )
        top_negative_aspects = (
            negative_aspects.groupby('aspect')['score']
            .mean()
            .sort_values(ascending=False)
            .head(3)
            .reset_index()
        )

        return jsonify({
            "top_positive_aspects": top_positive_aspects.to_dict(orient="records"),
            "top_negative_aspects": top_negative_aspects.to_dict(orient="records"),
            "full_aspect_analysis": df.to_dict(orient="records")
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)
