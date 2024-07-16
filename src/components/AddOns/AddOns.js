import React, { useState } from "react";
import StepLayout from "../StepLayout/StepLayout";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddOns.css";

const AddOns = ({ onNextStep, onPrevStep }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedPlan } = location.state || {};

  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const addons = [
    { id: "online-service", name: "Online service", price: 1 },
    { id: "larger-storage", name: "Larger storage", price: 2 },
    { id: "customizable-profile", name: "Customizable profile", price: 2 },
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
        <header className="add-ons__header">
          <h1>Pick add-ons</h1>
          <p>Add-ons help enhance your gaming experience.</p>
        </header>
        <div className="add-ons__options">
          {addons.map((addon) => (
            <div key={addon.id} className="add-on-option">
              <label>
                <input
                  type="checkbox"
                  checked={selectedAddOns.includes(addon.id)}
                  onChange={() => handleToggleAddon(addon.id)}
                />
                <span>{addon.name}</span>
                <span>{`+$${addon.price}/${
                  selectedPlan.billingCycle === "monthly" ? "mo" : "yr"
                }`}</span>
              </label>
            </div>
          ))}
        </div>
        <div className="add-ons__footer">
          <div className="previous-step">
            <button className="add-ons__go-back" onClick={handleGoBack}>
              Go Back
            </button>
          </div>
          <div className="next-step">
            <button className="add-ons__next-step" onClick={handleNextStep}>
              Next Step
            </button>
          </div>
        </div>
      </div>
    </StepLayout>
  );
};

export default AddOns;
