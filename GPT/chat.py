import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import json
import re

load_dotenv(dotenv_path="../.env")

app = Flask(__name__)
CORS(app)

PORT = int(os.getenv("PORT", 3001))
PERPLEXITY_API_KEY = os.getenv("PERPLEXITY_API_KEY")

alerts = []

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message")
    user = data.get("user")
    if not message:
        return jsonify({"error": "Message is required"}), 400

    # Build structured analysis prompt
    prompt = f"""
You are an AI mental health assistant. Analyze the user's message and respond strictly in JSON:
{{
  "anxiety": {{ "level": "low|medium|high", "probability": 0-1 }},
  "depression": {{ "level": "low|medium|high", "probability": 0-1 }},
  "suicide_risk": {{ "level": "low|medium|high", "probability": 0-1 }},
  "message": "Supportive response with emojis"
}}
User message: "{message}"
"""

    try:
        headers = {
            "Authorization": f"Bearer {PERPLEXITY_API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": "sonar-pro",  # GPT-5-level model
            "messages": [
                {"role": "system", "content": "You are a mental health assistant that replies strictly in JSON."},
                {"role": "user", "content": prompt}
            ]
        }

        resp = requests.post("https://api.perplexity.ai/chat/completions", headers=headers, json=payload)
        resp.raise_for_status()
        result = resp.json()

        # Extract message safely
        raw = result.get("choices", [{}])[0].get("message", {}).get("content", "")

        # Clean JSON if wrapped in ```json
        text = re.sub(r"```json\s*|```", "", raw).strip()

        try:
            ai_data = json.loads(text)
        except json.JSONDecodeError:
            ai_data = {
                "anxiety": {"level": "unknown", "probability": 0},
                "depression": {"level": "unknown", "probability": 0},
                "suicide_risk": {"level": "unknown", "probability": 0},
                "message": "Sorry, I couldn’t analyze this properly."
            }

        # Alert if high suicide risk
        sr = ai_data.get("suicide_risk", {})
        if sr.get("level") == "high" or sr.get("probability", 0) > 0.7:
            alert = {
                "userMessage": message,
                "analysis": ai_data,
                "timestamp": __import__("datetime").datetime.utcnow().isoformat(),
                "user": user
            }
            alerts.append(alert)
            print("🚨 High suicide risk:", alert)

        return jsonify(ai_data)

    except Exception as e:
        print("Error in /api/chat:", e)
        return jsonify({
            "anxiety": {"level": "unknown", "probability": 0},
            "depression": {"level": "unknown", "probability": 0},
            "suicide_risk": {"level": "unknown", "probability": 0},
            "message": "Sorry, something went wrong. 💪"
        }), 500


@app.route("/admin/alerts", methods=["GET"])
def get_alerts():
    print("sended***********")
    return jsonify(alerts)

@app.route("/admin/alerts/clear", methods=["POST"])
def clear_alerts():
    global alerts
    alerts = []
    return jsonify({"success": True, "message": "All alerts cleared"}), 200

if __name__ == "__main__":
    print(f"Server running on http://localhost:{PORT}")
    app.run(host="0.0.0.0", port=PORT, debug=True)
