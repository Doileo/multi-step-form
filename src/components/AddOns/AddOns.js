import React, { useState } from "react";
import StepLayout from "../StepLayout/StepLayout";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddOns.css";

const AddOns = ({ onNextStep, onPrevStep }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Safely read selectedPlan from location.state or provide a fallback
  const selectedPlan = location.state?.selectedPlan || {
    billingCycle: "monthly",
    name: "Demo Plan",
  };

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

  const handleNextStep = (e) => {
    e.preventDefault();
    onNextStep?.();
    navigate("/summary", { state: { selectedPlan, selectedAddOns } });
  };

  const handleGoBack = () => {
    onPrevStep?.();
    navigate(-1);
  };

  return (
    <StepLayout currentStep={3}>
      <main className="add-ons">
        <div className="add-ons__content">
          <h1 id="addons-heading">Pick add-ons</h1>
          <p id="addons-desc">
            Add-ons enhance your {selectedPlan.name} experience.
          </p>
        </div>

        <form
          aria-labelledby="addons-heading"
          aria-describedby="addons-desc"
          onSubmit={handleNextStep}
        >
          <fieldset>
            <legend className="sr-only">Available add-ons</legend>

            <div className="add-ons__options">
              {addons.map(({ id, name, price, description }) => (
                <div
                  key={id}
                  className={`add-on-option ${
                    selectedAddOns.includes(id) ? "selected" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id={id}
                    name="addons"
                    value={id}
                    checked={selectedAddOns.includes(id)}
                    onChange={() => handleToggleAddon(id)}
                  />
                  <label htmlFor={id}>
                    <div className="add-on-content">
                      <div className="add-on-info">
                        <span className="add-on-name">{name}</span>
                        <span className="add-on-description">
                          {description}
                        </span>
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
          </fieldset>

          <div className="navigation-buttons">
            <button
              type="button"
              className="go-back__button"
              onClick={handleGoBack}
            >
              Go Back
            </button>
            <button
              type="submit"
              className="next-step__button"
              disabled={selectedAddOns.length === 0}
            >
              Next Step
            </button>
          </div>
        </form>
      </main>
    </StepLayout>
  );
};

export default AddOns;
