import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import styled from "@emotion/styled"; // Import Emotion for styling

const StyledTextField = styled(TextField)`
  margin: 1rem;
  width: 150px;
  border-radius: 64px;
`;

const MedicalForm = () => {
  const [formData, setFormData] = useState({
    GENDER: "",
    AGE: "",
    EDUC: "",
    SESS: "",
    MMSE: "",
    TIV: "",
    WBV: "",
    ASF: "",
  });
  const [predictionData, setPredictionData] = useState(null); // State to store prediction data
  const [isLoading, setIsLoading] = useState(false); // State to indicate loading status
  const [error, setError] = useState(null); // State to store error message (if any)

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true); // Set loading state to true
    setError(null); // Clear any previous errors

    const dataToSend = {
      GENDER: parseFloat(formData.GENDER === "male" ? 1 : 0), // Encode gender
      AGE: parseFloat(formData.AGE), // Convert to number if needed
      EDUC: parseFloat(formData.EDUC), // Convert to number if needed
      SESS: parseFloat(formData.SESS),
      MMSE: parseFloat(formData.MMSE),
      TIV: parseFloat(formData.TIV),
      WBV: parseFloat(formData.WBV),
      ASF: parseFloat(formData.ASF),
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/predict",
        dataToSend,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setPredictionData(response.data.Prediction); // Store prediction data
    } catch (error) {
      setError(error.message); // Set error message if request fails
    } finally {
      setIsLoading(false); // Set loading state to false after processing finishes
    }
  };

  const renderPrediction = () => {
    if (isLoading) {
      return <p>Loading prediction...</p>;
    } else if (error) {
      return <p style={{ color: "red" }}>Error: {error}</p>;
    } else if (predictionData !== null) {
      const hasAlzheimers = predictionData === 1; // Assuming prediction is 1 for Alzheimer's
      return (
        <div>
          <p>Prediction:</p>
          {hasAlzheimers ? (
            <p style={{ color: "red" }}>Alzheimer's detected</p>
          ) : (
            <p style={{ color: "green" }}>No Alzheimer's detected</p>
          )}
        </div>
      );
    } else {
      return null; // No prediction data yet
    }
  };

  return (
    <div className="medical-form">
      <h2>Medical Input Form</h2>
      <form onSubmit={handleSubmit}>
        <StyledTextField
          label="Age"
          variant="outlined"
          name="AGE"
          type="number"
          value={formData.AGE}
          onChange={handleChange}
          required
        />
        <StyledTextField
          label="Years of education"
          variant="outlined"
          name="EDUC"
          type="number"
          value={formData.EDUC}
          onChange={handleChange}
          required
        />

        <StyledTextField
          label="Socioeconomic Status"
          variant="outlined"
          name="SESS"
          type="number"
          value={formData.SESS}
          onChange={handleChange}
          required
        />

        <StyledTextField
          label="MMSE"
          variant="outlined"
          name="MMSE"
          type="number"
          value={formData.MMSE}
          onChange={handleChange}
          required
        />

        <StyledTextField
          label="TIV"
          variant="outlined"
          name="TIV"
          type="number"
          value={formData.TIV}
          onChange={handleChange}
          required
        />

        <StyledTextField
          label="WBV"
          variant="outlined"
          name="WBV"
          type="number"
          value={formData.WBV}
          onChange={handleChange}
          required
        />

        <StyledTextField
          label="ASF"
          variant="outlined"
          name="ASF"
          type="number"
          value={formData.ASF}
          onChange={handleChange}
          required
        />
        <RadioGroup
          row
          aria-labelledby="gender-label"
          name="GENDER"
          value={formData.GENDER}
          onChange={handleChange}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
        <br/>
        <Button variant="contained" type="submit" color="primary">
          Submit
        </Button>
      </form>
      {renderPrediction()}
    </div>
  );
};

export default MedicalForm;
