import flask
import joblib
from flask import Flask, request, jsonify
from sklearn.ensemble import RandomForestClassifier # Replace with your model import statement
from joblib import dump
from flask_cors import CORS
app=Flask(__name__)
CORS(app)

model = joblib.load('/Users/arpitbansal/Documents/REACT-JS-TUTORIAL/testin/model.pkl')
scaler=joblib.load('/Users/arpitbansal/Documents/REACT-JS-TUTORIAL/testin/scaler.pkl')

@app.route('/api/predict', methods=['POST'])

def predict():
# Access data from the request
  data = request.get_json()
  
  gender = float(data.get('GENDER'))
  age= float(data.get('AGE'))
  educ = float(data.get('EDUC'))
  sess = float(data.get('SESS'))
  mmse = float(data.get('MMSE'))
  tiv = float(data.get('TIV'))
  wbv = float(data.get('WBV'))
  asf = float(data.get('ASF'))

    # Preprocess the input data
  input_data = scaler.transform([[gender,age,educ, sess, mmse, tiv, wbv, asf]])

  # Preprocess data (if needed)
  # ... (Your data preprocessing logic)

  # Make prediction using your model
  prediction =model.predict(input_data)  # Replace with your model prediction call

  # Prepare response
  response = {'Prediction': prediction}
  print(prediction)
  print(data)
  print(input_data)
  return jsonify({'Prediction': int(prediction[0])})

if __name__ == '__main__':
    
  app.run(debug=True)
