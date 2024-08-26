import React, { useState } from "react";
import StepLayout from "../StepLayout/StepLayout";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddOns.css";

const AddOns = ({ onNextStep, onPrevStep }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { selectedPlan = { billingCycle: "monthly" } } = state;

  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const addons = {
    monthly: [
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
    ],
    yearly: [
      {
        id: "online-service",
        name: "Online service",
        price: 10,
        description: "Access to multiplayer games",
      },
      {
        id: "larger-storage",
        name: "Larger storage",
        price: 20,
        description: "Extra 1TB of cloud save",
      },
      {
        id: "customizable-profile",
        name: "Customizable profile",
        price: 20,
        description: "Custom theme on your profile",
      },
    ],
  }[selectedPlan.billingCycle];

  const handleToggleAddon = (addonId) => {
    setSelectedAddOns((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleNextStep = () => {
    onNextStep();
    navigate("/summary", { state: { selectedPlan, selectedAddOns } });
  };

  const handleGoBack = () => {
    onPrevStep();
    navigate(-1);
  };

  return (
    <StepLayout currentStep={3}>
      <div className="add-ons">
        <div className="add-ons__content">
          <h1>Pick add-ons</h1>
          <p>Add-ons enhance your gaming experience.</p>
        </div>
        <div className="add-ons__options">
          {addons.map(({ id, name, price, description }) => (
            <div
              key={id}
              className={`add-on-option ${
                selectedAddOns.includes(id) ? "selected" : ""
              }`}
            >
              <label>
                <input
                  type="checkbox"
                  checked={selectedAddOns.includes(id)}
                  onChange={() => handleToggleAddon(id)}
                  aria-label={`${name} - ${description} (+$${price}/${
                    selectedPlan.billingCycle === "monthly" ? "mo" : "yr"
                  })`}
                />
                <div className="add-on-content">
                  <div className="add-on-info">
                    <span className="add-on-name">{name}</span>
                    <span className="add-on-description">{description}</span>
                  </div>
                  <span
                    className={`add-on-price ${
                      selectedAddOns.includes(id) ? "selected" : ""
                    }`}
                  >
                    {`+$${price}/${
                      selectedPlan.billingCycle === "monthly" ? "mo" : "yr"
                    }`}
                  </span>
                </div>
              </label>
            </div>
          ))}
        </div>
        <div className="navigation-buttons">
          <button className="go-back__button" onClick={handleGoBack}>
            Go Back
          </button>
          <button
            className="next-step__button"
            onClick={handleNextStep}
            disabled={selectedAddOns.length === 0}
          >
            Next Step
          </button>
        </div>
      </div>
    </StepLayout>
  );
};

export default AddOns;
