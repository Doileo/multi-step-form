import React, { useState } from "react";
import StepLayout from "../StepLayout/StepLayout";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddOns.css";

const AddOns = ({ onNextStep, onPrevStep }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedPlan } = location.state || { billingCycle: "monthly" }; // Provide a default value for billingCycle

  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const addons = [
    {
      id: "online-service",
      name: "Online service",
      price: 1,
      description: "Access to multiplayer games",
    },
    {
      id: "larger-storage",
      name: "Larger storage",
      price: 2,
      description: "Extra 1TB of cloud save",
    },
    {
      id: "customizable-profile",
      name: "Customizable profile",
      price: 2,
      description: "Custom theme on your profile",
    },
  ];

  const handleToggleAddon = (addonId) => {
    setSelectedAddOns((prevSelectedAddOns) =>
      prevSelectedAddOns.includes(addonId)
        ? prevSelectedAddOns.filter((id) => id !== addonId)
        : [...prevSelectedAddOns, addonId]
    );
  };

  const handleNextStep = () => {
    onNextStep();
    navigate("/summary", { state: { selectedPlan, selectedAddOns } });
  };

  const handleGoBack = () => {
    onPrevStep();
    navigate(-1); // Navigate back to the previous step
  };

  return (
    <StepLayout currentStep={3}>
      <div className="add-ons">
        <div className="add-ons__content">
          <h1>Pick add-ons</h1>
          <p>Add-ons help enhance your gaming experience.</p>
        </div>
        <div className="add-ons__options">
          {addons.map((addon) => (
            <div
              key={addon.id}
              className={`add-on-option ${
                selectedAddOns.includes(addon.id) ? "selected" : ""
              }`}
            >
              <label>
                <input
                  type="checkbox"
                  checked={selectedAddOns.includes(addon.id)}
                  onChange={() => handleToggleAddon(addon.id)}
                />
                <div className="add-on-content">
                  <div className="add-on-info">
                    <span className="add-on-name">{addon.name}</span>
                    <span className="add-on-description">
                      {addon.description}
                    </span>
                  </div>
                  <span
                    className={`add-on-price ${
                      selectedAddOns.includes(addon.id) ? "selected" : ""
                    }`}
                  >{`+$${addon.price}/${
                    selectedPlan?.billingCycle === "monthly" ? "mo" : "yr"
                  }`}</span>{" "}
                  {/* Use optional chaining to safely access billingCycle */}
                </div>
              </label>
            </div>
          ))}
        </div>
        <div className="navigation-buttons">
          <div className="previous-step">
            <button className="go-back__button" onClick={handleGoBack}>
              Go Back
            </button>
          </div>
          <div className="next-step">
            <button
              className="next-step__button"
              onClick={handleNextStep}
              disabled={selectedAddOns.length === 0} // Disable button if no add-ons are selected
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </StepLayout>
  );
};

export default AddOns;
