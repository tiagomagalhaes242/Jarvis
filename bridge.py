from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

ESP_URL = "http://192.168.18.50"

@app.route("/ligar")
def ligar():
    try:
        resposta = requests.get(f"{ESP_URL}/ligar", timeout=3)
        return jsonify({
            "ok": True,
            "comando": "ligar",
            "esp_status": resposta.status_code
        })
    except Exception as e:
        return jsonify({
            "ok": False,
            "erro": str(e)
        }), 500


@app.route("/desligar")
def desligar():
    try:
        resposta = requests.get(f"{ESP_URL}/desligar", timeout=3)
        return jsonify({
            "ok": True,
            "comando": "desligar",
            "esp_status": resposta.status_code
        })
    except Exception as e:
        return jsonify({
            "ok": False,
            "erro": str(e)
        }), 500


@app.route("/")
def inicio():
    return "JARVIS Bridge ONLINE"


app.run(host="0.0.0.0", port=5000)
