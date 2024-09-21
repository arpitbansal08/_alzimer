import "./App.css";
import MedicalForm from "./MedicalForm";

const medicalFormFullForms = {
  AGE: "Age (1-100)",
  GENDER: "Gender (Male: 1, Female: 0)", 
  EDUC: "Years of Education (1-40)",
  SESS: "Socioeconomic Status (1-5)",
  MMSE: "Mini-Mental State Examination (0-30)",
  CDR: "Clinical Dementia Rating", 
  TIV: "Intracranial Volume (0-2000)",
  WBV: "Whole Brain Volume (0-1)",
  ASF: "Amyloid beta plaque burden (CSF) (1-2)", 
};

function App() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}> 
        <img
          alt="React Logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgs0IY4gwrh81om_lRWQ0mpRTFYTqknB-SaVLlNwVNYg&s"
          className="react-logo"
          style={{ marginRight: "4px" }} 
        />
      </div>
      <div style={{ display: "inline-block" }}> 
        <h1>Alzheimer Detection</h1>
        <h3>
          Clinicians should be able to input MRI results, biographical data, and other
          parameters for a patient.
        </h3>
      </div>
      <div style={{ width: "1200px", marginTop: "20px" }}>
        <MedicalForm />
      </div>
      <div>
        <h2>Full Forms of Medical Form Fields:</h2>
        <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
          {Object.entries(medicalFormFullForms).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
