from flask import Flask, request, redirect, jsonify
from model.disease_finder import DiseaseFinder
from model.get_symptoms import SymptomsList
import json
import numpy as np

app = Flask(__name__)

# Custom JSON encoder for handling numpy types
def convert_to_serializable(obj):
    if isinstance(obj, np.integer):
        return int(obj)
    elif isinstance(obj, np.floating):
        return float(obj)
    elif isinstance(obj, np.ndarray):
        return obj.tolist()
    else:
        raise TypeError(f"Type {type(obj)} not serializable")

@app.route("/disease_finder", methods=["POST"])
def disease_finder():
    if request.method=="POST":
        user = request.get_json()
        diseases = DiseaseFinder.find(user['symptoms'])
        return json.dumps(diseases)

@app.route("/get_symptoms", methods=["GET"])
def get_symptoms():
    try:
        symptoms_list = SymptomsList.get()
        serializable_symptoms = json.loads(json.dumps(symptoms_list, default=convert_to_serializable))
        return jsonify({"message": "Successfully Fetched Data", "symptoms":serializable_symptoms})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__=="__main__":
    app.run(debug=True)