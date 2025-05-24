import pandas as pd

class SymptomsList:
    def get():
        symp_code = pd.read_csv("./datasets/symptom_weight_code.csv")
        symp_code = symp_code.drop('Unnamed: 0', axis='columns')
        symp_code_dict = []
        for i in range(0, symp_code.shape[0]):
            symp_code_dict.append(dict({'id': i, 'symptom': symp_code['Symptom'][i], 'weight': symp_code['weight'][i]}))
        return symp_code_dict