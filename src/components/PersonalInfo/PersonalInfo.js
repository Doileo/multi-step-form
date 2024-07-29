import React, { useState } from "react";
import StepLayout from "../StepLayout/StepLayout";
import { useNavigate } from "react-router-dom";
import "./PersonalInfo.css";

const PersonalInfo = ({ onNextStep }) => {
  const navigate = useNavigate();

  // State to hold form data and errors
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    return newErrors;
  };

  // Handle navigation to the next step
  const handleNextStep = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onNextStep();
      navigate("/select-plan");
    }
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
            <div className={`form-group ${errors.name ? "error" : ""}`}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="e.g. Stephen King"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>
            <div className={`form-group ${errors.email ? "error" : ""}`}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="e.g. stephenking@lorem.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>
            <div className={`form-group ${errors.phone ? "error" : ""}`}>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                placeholder="e.g. +1 234 567 890"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>
          </form>
        </div>

        {/* Navigation Button */}
        <div className="navigation-buttons">
          <button
            type="button"
            className="next-step__button"
            onClick={handleNextStep}
          >
            Next Step
          </button>
        </div>
      </div>
    </StepLayout>
  );
};

export default PersonalInfo;
