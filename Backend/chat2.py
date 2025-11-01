from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

# Option 1: store your API key as an environment variable
PERPLEXITY_API_KEY = os.getenv("PERPLEXITY_API_KEY")

@app.route("/search", methods=["POST"])
def search():
    data = request.get_json()
    query = data.get("query")

    if not query:
        return jsonify({"error": "Missing 'query' field"}), 400

    headers = {
        "Authorization": f"Bearer {PERPLEXITY_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "query": query,
        "max_results": data.get("max_results", 5),
        "search_recency_filter": data.get("search_recency_filter", "month")
    }

    response = requests.post("https://api.perplexity.ai/search", headers=headers, json=payload)

    # Forward the Perplexity API response
    if response.ok:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Request failed", "details": response.text}), response.status_code


if __name__ == "__main__":
    app.run(debug=True)
