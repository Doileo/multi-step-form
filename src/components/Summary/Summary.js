import React from "react";
import StepLayout from "../StepLayout/StepLayout";
import { useLocation, useNavigate } from "react-router-dom";
import "./Summary.css";

const Summary = ({ onPrevStep }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedPlan, selectedAddOns } = location.state || {};

  const addons = [
    { id: "online-service", name: "Online service", price: 1 },
    { id: "larger-storage", name: "Larger storage", price: 2 },
    { id: "customizable-profile", name: "Customizable profile", price: 2 },
  ];

  const calculateTotal = () => {
    let total = selectedPlan ? selectedPlan.price : 0;
    if (selectedAddOns && selectedAddOns.length > 0) {
      selectedAddOns.forEach((addonId) => {
        const addon = addons.find((item) => item.id === addonId);
        if (addon) {
          total += addon.price;
        }
      });
    }
    return total;
  };

  const handleGoBack = () => {
    onPrevStep(); // Navigate back to the previous step
    navigate("/add-ons"); // Navigate to the add-ons step
  };

  const handleConfirm = () => {
    onPrevStep(); // This should navigate back to the previous step
    navigate("/confirmation");
  };

  return (
    <StepLayout currentStep={4}>
      <div className="summary">
        <div className="top-elements">
          <h2>Finishing up</h2>
          <p>Double-check everything looks OK before confirming.</p>
        </div>

        <div className="plan-details">
          <div className="plan-header">
            <div className="plan-info">
              <div className="plan-name">
                <span>{selectedPlan ? selectedPlan.name : ""}</span>
                <span>({selectedPlan ? selectedPlan.billingCycle : ""})</span>
              </div>
              <a href="#select-plan" onClick={() => navigate("/select-plan")}>
                Change
              </a>
            </div>
            <div className="price">
              {selectedPlan
                ? `$${selectedPlan.price}/${
                    selectedPlan.billingCycle === "Monthly" ? "mo" : "yr"
                  }`
                : ""}
            </div>
          </div>

          <hr />

          {selectedAddOns && selectedAddOns.length > 0 && (
            <div className="addons">
              {selectedAddOns.map((addonId) => {
                const addon = addons.find((item) => item.id === addonId);
                return (
                  <div className="addon-item" key={addon.id}>
                    <span>{addon.name}</span>
                    <span>
                      +${addon.price}/
                      {selectedPlan.billingCycle === "Monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="total">
          <span>
            Total (per{" "}
            {selectedPlan ? selectedPlan.billingCycle.toLowerCase() : "month"})
          </span>
          <span>
            +${calculateTotal()}/
            {selectedPlan
              ? selectedPlan.billingCycle === "Monthly"
                ? "mo"
                : "yr"
              : ""}
          </span>
        </div>

        <div className="navigation-buttons">
          <div className="previous-step">
            <button className="go-back__button" onClick={handleGoBack}>
              Go Back
            </button>
          </div>
          <div className="next-step">
            <button className="next-step__button" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </StepLayout>
  );
};

export default Summary;
