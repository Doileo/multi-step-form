import React, { useEffect } from "react";
import StepLayout from "../StepLayout/StepLayout";
import { useLocation, useNavigate } from "react-router-dom";
import "./Summary.css";

const Summary = ({ onPrevStep }) => {
  // Retrieves the navigation state passed from the previous step (plan and add-ons)
  const { state } = useLocation();
  const navigate = useNavigate();

  // Destructure safely so the component won't break if state is missing
  const { selectedPlan, selectedAddOns } = state || {};

  // Redirects the user if they arrive at this step without a selected plan
  // This prevents displaying an empty or broken summary screen
  useEffect(() => {
    if (!selectedPlan) {
      navigate("/select-plan", { replace: true });
    }
  }, [selectedPlan, navigate]);

  // Defines all available add-ons and their prices for both billing cycles
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

  // Selects which list of add-ons to use based on the user's billing cycle
  const addons =
    selectedPlan?.billingCycle === "yearly"
      ? addonsList.yearly
      : addonsList.monthly;

  // Calculates the total cost by summing the selected plan and any chosen add-ons
  const calculateTotal = () => {
    const planTotal = selectedPlan?.price || 0;
    const addonsTotal =
      selectedAddOns?.reduce(
        (sum, addonId) =>
          sum + (addons.find((item) => item.id === addonId)?.price || 0),
        0
      ) || 0;
    return planTotal + addonsTotal;
  };

  // Handles navigation between steps
  // Ensures previous step callback runs and selected data is preserved through route state
  const handleNavigation = (path) => {
    onPrevStep();
    navigate(path, {
      state: { selectedPlan, selectedAddOns },
    });
  };

  // Prevents rendering until selectedPlan exists
  // Avoids displaying empty UI during redirect
  if (!selectedPlan) return null;

  return (
    <StepLayout currentStep={4}>
      <div className="summary">
        {/* Header with title and short instructions */}
        <header className="summary-header">
          <h2>Finishing up</h2>
          <p>Double-check everything looks OK before confirming.</p>
        </header>

        {/* Displays selected plan details and a link to change the plan */}
        <section className="plan-details">
          <div className="plan-header">
            <div className="plan-info">
              <span>
                {selectedPlan.name} ({selectedPlan.billingCycle})
              </span>
              {/* Prevents full page reload and uses router navigation instead */}
              <a
                href="#select-plan"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("/select-plan");
                }}
              >
                Change
              </a>
            </div>

            {/* Shows price for the selected plan */}
            <div className="price">
              ${selectedPlan.price}/
              {selectedPlan.billingCycle === "monthly" ? "mo" : "yr"}
            </div>
          </div>

          <hr />

          {/* Displays the selected add-ons, if any */}
          {selectedAddOns?.length > 0 && (
            <div className="addons">
              {selectedAddOns.map((addonId) => {
                const addon = addons.find((item) => item.id === addonId);
                if (!addon) return null; // Prevents rendering undefined add-ons
                return (
                  <div className="addon-item" key={addon.id}>
                    <span>{addon.name}</span>
                    <span>
                      +${addon.price}/
                      {selectedPlan.billingCycle === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Displays the total cost based on the chosen billing cycle */}
        <section className="total">
          <span>Total (per {selectedPlan.billingCycle.toLowerCase()})</span>
          <span>
            +${calculateTotal()}/
            {selectedPlan.billingCycle === "monthly" ? "mo" : "yr"}
          </span>
        </section>

        {/* Navigation buttons for moving between steps */}
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
