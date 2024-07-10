import React, { useState } from "react";
import StepLayout from "./StepLayout";
import { useNavigate } from "react-router-dom";

const AddOns = ({ onNextStep, onPrevStep }) => {
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const navigate = useNavigate();

  const handleNextStep = () => {
    navigate("/confirmation", {
      state: { selectedAddOns },
    });
  };

  const handleGoBack = () => {
    onPrevStep(); // This should navigate back to the previous step
    navigate("/select-plan"); // Optional: Explicit navigation to ensure correct route
  };

  const addOns = [
    {
      id: "online-service",
      name: "Online service",
      description: "Access to multiplayer games",
      price: 1,
    },
    {
      id: "larger-storage",
      name: "Larger storage",
      description: "Extra 1TB of cloud save",
      price: 2,
    },
    {
      id: "customizable-profile",
      name: "Customizable profile",
      description: "Custom theme on your profile",
      price: 2,
    },
  ];

  const handleAddOnSelect = (addOnId) => {
    const index = selectedAddOns.indexOf(addOnId);
    if (index === -1) {
      setSelectedAddOns([...selectedAddOns, addOnId]);
    } else {
      setSelectedAddOns(selectedAddOns.filter((item) => item !== addOnId));
    }
  };

  return (
    <StepLayout currentStep={3}>
      <div className="add-ons">
        <header className="add-ons__header">
          <h1>Pick add-ons</h1>
          <p>Add-ons help enhance your gaming experience</p>
        </header>
        <div className="add-ons__options">
          {addOns.map((addOn) => (
            <div key={addOn.id} className="add-on">
              <div>
                <h2>{addOn.name}</h2>
                <p>${addOn.price}/mo</p>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedAddOns.includes(addOn.id)}
                    onChange={() => handleAddOnSelect(addOn.id)}
                  />
                  <span>{addOn.description}</span>
                </label>
              </div>
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
