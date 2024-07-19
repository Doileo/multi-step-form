import React from "react";
import StepLayout from "../StepLayout/StepLayout";
import { useNavigate } from "react-router-dom";
import "./PersonalInfo.css";

const PersonalInfo = ({ onNextStep }) => {
  const navigate = useNavigate();

  const handleNextStep = () => {
    onNextStep();
    navigate("/select-plan");
  };

  return (
    <StepLayout currentStep={1}>
      <div className="personal-info-container">
        {/* Content */}
        <div className="info-content">
          <h1 className="info-heading">Personal info</h1>
          <p className="info-text">
            Please provide your name, email address, and phone number.
          </p>

          <form className="info-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="e.g. Stephen King" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="e.g. stephenking@lorem.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" placeholder="e.g. +1 234 567 890" />
            </div>
          </form>
        </div>

        {/* Navigation Button */}
        <div className="navigation-buttons">
          <button type="button" onClick={handleNextStep}>
            Next Step
          </button>
        </div>
      </div>
    </StepLayout>
  );
};

export default PersonalInfo;
