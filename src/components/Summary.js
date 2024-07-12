import React from "react";
import StepLayout from "./StepLayout";
import { useLocation, useNavigate } from "react-router-dom";

const Summary = ({ onPrevStep }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedPlan, selectedAddOns } = location.state || {};

  const addons = [
    {
      id: "online-service",
      name: "Online service",
      price: 1,
    },
    {
      id: "larger-storage",
      name: "Larger storage",
      price: 2,
    },
    {
      id: "customizable-profile",
      name: "Customizable profile",
      price: 2,
    },
  ];

  // Calculate total price including selected plan and addons
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

  // Handle navigation to previous step
  const handleGoBack = () => {
    onPrevStep(); // Navigate back to the previous step
    navigate("/add-ons"); // Navigate to the add-ons step
  };

  // Handle confirmation logic
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
          {selectedPlan && (
            <>
              <div>
                <span>{selectedPlan.name}</span>
                <span>({selectedPlan.billingCycle})</span>
                <span>
                  <a href="#select-plan">Change</a>
                </span>
              </div>
              <div>
                <span>{selectedPlan.price}</span>
              </div>
              <hr />
            </>
          )}

          <div>
            {addons.map((addon) => (
              <div key={addon.id}>
                <span>{addon.name}</span>
                <span>{addon.price}</span>
              </div>
            ))}
          </div>

          <div className="total">
            <span>
              Total ({selectedPlan ? selectedPlan.billingCycle : "Unknown"})
            </span>
            <span>{calculateTotal()}</span>
          </div>
        </div>

        <div className="summary__footer">
          <div className="previous-step">
            <button className="summary__go-back" onClick={handleGoBack}>
              Go Back
            </button>
          </div>
          <div className="next-step">
            <button className="summary__confirm" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </StepLayout>
  );
};

export default Summary;
