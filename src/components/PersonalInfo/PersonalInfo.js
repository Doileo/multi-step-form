import React, { useState } from "react";
import StepLayout from "../StepLayout/StepLayout";
import { useNavigate } from "react-router-dom";
import "./PersonalInfo.css";

// Utility function to validate the form fields and return errors
const validateForm = (formData) => {
  const errors = {};
  if (!formData.name) errors.name = "Name is required"; // Validate name field
  if (!formData.email) errors.email = "Email is required"; // Validate email field
  if (!formData.phone) errors.phone = "Phone number is required"; // Validate phone field
  return errors; // Return any errors found
};

const PersonalInfo = ({ onNextStep }) => {
  const navigate = useNavigate(); // Hook to navigate to the next page

  // State to store form data and errors
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({}); // Track form validation errors

  // Handle input field changes dynamically
  const handleChange = (field) => (e) => {
    const { value } = e.target; // Get the input value
    setFormData((prev) => ({ ...prev, [field]: value })); // Update form data state
  };

  // Handle the form submission and validate before moving to the next step
  const handleNextStep = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const validationErrors = validateForm(formData); // Validate the form data

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // If there are errors, set the errors state
    } else {
      onNextStep(); // Proceed to the next step if no errors
      navigate("/select-plan"); // Navigate to the next page
    }
  };

  return (
    <StepLayout currentStep={1}>
      {" "}
      {/* Layout component for the current step */}
      <section className="personal-info-container">
        <div className="info-content">
          <h1 className="info-heading">Personal info</h1>
          <p className="info-text">
            Please provide your name, email address, and phone number.
          </p>

          {/* Form to collect personal info */}
          <form className="info-form" onSubmit={handleNextStep}>
            {/* Name input field with error handling */}
            <div className={`form-group ${errors.name ? "error" : ""}`}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="e.g. Stephen King"
                value={formData.name}
                onChange={handleChange("name")} // Handle change for name
                aria-required="true"
                aria-invalid={!!errors.name} // Indicate if there's an error
                aria-describedby={errors.name ? "name-error" : undefined} // Associate error message with input
              />
              {/* Display error message for name field */}
              {errors.name && (
                <span
                  id="name-error"
                  className="error-message"
                  role="alert" // Announce error immediately
                  aria-live="polite" // Ensure the error is announced politely
                >
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email input field with error handling */}
            <div className={`form-group ${errors.email ? "error" : ""}`}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="e.g. stephenking@lorem.com"
                value={formData.email}
                onChange={handleChange("email")} // Handle change for email
                aria-required="true"
                aria-invalid={!!errors.email} // Indicate if there's an error
                aria-describedby={errors.email ? "email-error" : undefined} // Associate error message with input
              />
              {/* Display error message for email field */}
              {errors.email && (
                <span
                  id="email-error"
                  className="error-message"
                  role="alert" // Announce error immediately
                  aria-live="polite" // Ensure the error is announced politely
                >
                  {errors.email}
                </span>
              )}
            </div>

            {/* Phone number input field with error handling */}
            <div className={`form-group ${errors.phone ? "error" : ""}`}>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                placeholder="e.g. +1 234 567 890"
                value={formData.phone}
                onChange={handleChange("phone")} // Handle change for phone
                aria-required="true"
                aria-invalid={!!errors.phone} // Indicate if there's an error
                aria-describedby={errors.phone ? "phone-error" : undefined} // Associate error message with input
              />
              {/* Display error message for phone field */}
              {errors.phone && (
                <span
                  id="phone-error"
                  className="error-message"
                  role="alert" // Announce error immediately
                  aria-live="polite" // Ensure the error is announced politely
                >
                  {errors.phone}
                </span>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="navigation-buttons">
              <button
                type="submit"
                className="next-step__button"
                aria-label="Proceed to the next step"
              >
                Next Step
              </button>
            </div>
          </form>
        </div>
      </section>
    </StepLayout>
  );
};

export default PersonalInfo;
