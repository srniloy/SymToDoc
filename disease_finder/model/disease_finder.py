import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.model_selection import train_test_split

class DiseaseFinder:
    def __init__(self):
        self.symp_code = pd.read_csv("./datasets/symptom_weight_code.csv").drop('Unnamed: 0', axis='columns')
        self.disease_details = pd.read_csv("./datasets/symptom_Description.csv")
        self.train = pd.read_csv("./datasets/coded_dataset.csv").drop_duplicates(subset=['Disease'])
        self.doc_df = pd.read_csv("./datasets/Doctor_Versus_Disease.csv", header=None, names=["Disease", "Specialist"], encoding='latin1')
        

        # Preprocess
        self.X = self.train.drop("Disease", axis=1)
        self.Y = self.train["Disease"]
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.model.fit(self.X, self.Y)

        # Build symptom code dict
        self.symp_code_dict = {row['Symptom'].strip(): row['code'] for _, row in self.symp_code.iterrows()}

    def find(self, symptoms: str):
        input_symptoms = symptoms.split("+")
        
        # Convert symptoms to code
        input_symptoms_code = [self.symp_code_dict.get(sym.strip(), 0) for sym in input_symptoms]
        input_symptoms_code.sort()
        
        # Pad to 17 features
        while len(input_symptoms_code) < 17:
            input_symptoms_code.append(0)

        # Predict
        top_probs = self.model.predict_proba([input_symptoms_code])[0]
        top_indices = top_probs.argsort()[-5:][::-1]

        top_diseases = self.model.classes_[top_indices]
        top_weights = top_probs[top_indices]


        result = []
        for i, (disease, weight) in enumerate(zip(top_diseases, top_weights)):
            desc_row = self.disease_details[self.disease_details['Disease'] == disease]
            specialization_row = self.doc_df[self.doc_df['Disease'].str.strip().str.lower() == disease.strip().lower()]

            description = desc_row['Description'].values[0] if not desc_row.empty else "Description not found"
            specialization = specialization_row['Specialist'].values[0] if not specialization_row.empty else "General Physician"

            result.append({
                'id': i,
                'disease': disease,
                'description': description,
                'specialization': specialization,
                'weight': round(weight * 100, 2)
            })

        return result
