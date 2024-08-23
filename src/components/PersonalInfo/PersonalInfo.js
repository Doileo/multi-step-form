import React, { useState } from "react";
import StepLayout from "../StepLayout/StepLayout";
import { useNavigate } from "react-router-dom";
import "./PersonalInfo.css";

const PersonalInfo = ({ onNextStep }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleNextStep = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      onNextStep();
      navigate("/select-plan");
    }
  };

  return (
    <StepLayout currentStep={1}>
      <section className="personal-info-container">
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
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <span
                  id="name-error"
                  className="error-message"
                  aria-live="polite"
                >
                  {errors.name}
                </span>
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
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span
                  id="email-error"
                  className="error-message"
                  aria-live="polite"
                >
                  {errors.email}
                </span>
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
                aria-required="true"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <span
                  id="phone-error"
                  className="error-message"
                  aria-live="polite"
                >
                  {errors.phone}
                </span>
              )}
            </div>
          </form>
        </div>

        <div className="navigation-buttons">
          <button
            type="button"
            className="next-step__button"
            onClick={handleNextStep}
            aria-label="Proceed to the next step"
          >
            Next Step
          </button>
        </div>
      </section>
    </StepLayout>
  );
};

export default PersonalInfo;
