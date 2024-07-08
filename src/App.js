import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import "./styles/main.css";
import PersonalInfo from "./components/PersonalInfo";
import SelectPlan from "./components/SelectPlan";
import AddOns from "./components/AddOns";
import Summary from "./components/Summary";
import Confirmation from "./components/Confirmation";

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<PersonalInfo onNextStep={handleNextStep} />}
          />
          <Route
            path="/select-plan"
            element={
              <SelectPlan
                onNextStep={handleNextStep}
                onPrevStep={handlePrevStep}
              />
            }
          />
          <Route path="/add-ons" element={<AddOns />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
