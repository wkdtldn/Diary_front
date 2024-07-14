from flask import Flask, request, jsonify
import json
from flask_cors import CORS
from datetime import datetime
from pytz import timezone

app = Flask(__name__)

CORS(app)

@app.route('/today', methods=['GET'])
def today():
    now = datetime.now(timezone('Asia/Seoul'))
    today = now.strftime("%Y-%m-%d")
    print(today)
    return today

if __name__ == "__main__":
    app.run(port=3012, debug=True)