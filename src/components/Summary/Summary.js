import React from "react";
import StepLayout from "../StepLayout/StepLayout";
import { useLocation, useNavigate } from "react-router-dom";
import "./Summary.css";

const Summary = ({ onPrevStep }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { selectedPlan, selectedAddOns } = state || {};

  const addonsList = {
    monthly: [
      { id: "online-service", name: "Online service", price: 1 },
      { id: "larger-storage", name: "Larger storage", price: 2 },
      { id: "customizable-profile", name: "Customizable profile", price: 2 },
    ],
    yearly: [
      { id: "online-service", name: "Online service", price: 10 },
      { id: "larger-storage", name: "Larger storage", price: 20 },
      { id: "customizable-profile", name: "Customizable profile", price: 20 },
    ],
  };

  const addons =
    selectedPlan?.billingCycle === "yearly"
      ? addonsList.yearly
      : addonsList.monthly;

  const calculateTotal = () => {
    const planTotal = selectedPlan?.price || 0;
    const addonsTotal = selectedAddOns?.reduce(
      (sum, addonId) =>
        sum + (addons.find((item) => item.id === addonId)?.price || 0),
      0
    );
    return planTotal + addonsTotal;
  };

  const handleNavigation = (path) => {
    onPrevStep();
    navigate(path);
  };

  return (
    <StepLayout currentStep={4}>
      <div className="summary">
        <header className="summary-header">
          <h2>Finishing up</h2>
          <p>Double-check everything looks OK before confirming.</p>
        </header>

        <section className="plan-details">
          <div className="plan-header">
            <div className="plan-info">
              <span>
                {selectedPlan?.name} ({selectedPlan?.billingCycle})
              </span>
              <a
                href="#select-plan"
                onClick={() => handleNavigation("/select-plan")}
              >
                Change
              </a>
            </div>
            <div className="price">
              {selectedPlan &&
                `$${selectedPlan.price}/${
                  selectedPlan.billingCycle === "monthly" ? "mo" : "yr"
                }`}
            </div>
          </div>

          <hr />

          {selectedAddOns?.length > 0 && (
            <div className="addons">
              {selectedAddOns.map((addonId) => {
                const addon = addons.find((item) => item.id === addonId);
                return (
                  <div className="addon-item" key={addon.id}>
                    <span>{addon.name}</span>
                    <span>
                      +${addon.price}/
                      {selectedPlan?.billingCycle === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="total">
          <span>
            Total (per {selectedPlan?.billingCycle.toLowerCase() || "month"})
          </span>
          <span>
            +${calculateTotal()}/
            {selectedPlan?.billingCycle === "monthly" ? "mo" : "yr"}
          </span>
        </section>

        <div className="navigation-buttons">
          <button
            className="go-back__button"
            onClick={() => handleNavigation("/add-ons")}
          >
            Go Back
          </button>
          <button
            className="next-step__button"
            onClick={() => handleNavigation("/confirmation")}
          >
            Confirm
          </button>
        </div>
      </div>
    </StepLayout>
  );
};

export default Summary;
