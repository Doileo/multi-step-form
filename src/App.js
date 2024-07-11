import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import "./styles/main.css";
import PersonalInfo from "./components/PersonalInfo";
import SelectPlan from "./components/SelectPlan";
import AddOns from "./components/AddOns";
import Summary from "./components/Summary";
import Confirmation from "./components/Confirmation";

const App = () => {
  const handleNextStep = () => {
    // Handle next step logic if needed
  };

  const handlePrevStep = () => {
    // Handle previous step logic if needed
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
          <Route
            path="/add-ons"
            element={
              <AddOns onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
            }
          />
          <Route
            path="/summary"
            element={
              <Summary
                onNextStep={handleNextStep}
                onPrevStep={handlePrevStep}
              />
            }
          />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
