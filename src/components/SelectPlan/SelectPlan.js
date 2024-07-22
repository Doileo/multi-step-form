import React, { useState } from "react";
import StepLayout from "../StepLayout/StepLayout";
import arcadeIcon from "../../images/icon-arcade.svg";
import advancedIcon from "../../images/icon-advanced.svg";
import proIcon from "../../images/icon-pro.svg";
import { useNavigate } from "react-router-dom";
import "./SelectPlan.css";

const SelectPlan = ({ onNextStep, onPrevStep }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const navigate = useNavigate();

  const plans = [
    { id: "arcade", name: "Arcade", monthly: 9, yearly: 90, icon: arcadeIcon },
    {
      id: "advanced",
      name: "Advanced",
      monthly: 12,
      yearly: 120,
      icon: advancedIcon,
    },
    { id: "pro", name: "Pro", monthly: 15, yearly: 150, icon: proIcon },
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleNextStep = () => {
    if (selectedPlan) {
      const selectedPlanDetails = {
        ...selectedPlan,
        price:
          billingCycle === "monthly"
            ? selectedPlan.monthly
            : selectedPlan.yearly,
        billingCycle,
      };
      onNextStep(selectedPlanDetails);
      navigate("/add-ons", { state: { selectedPlan: selectedPlanDetails } });
    }
  };

  const handleGoBack = () => {
    onPrevStep();
    navigate(-1); // Navigate back to the previous step
  };

  return (
    <StepLayout currentStep={2}>
      <div className="select-plan">
        <div className="select-plan__content">
          <h1>Select your plan</h1>
          <p>You have the option of monthly or yearly billing.</p>
        </div>
        <div className="select-plan__options">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan-option ${
                selectedPlan?.id === plan.id ? "selected" : ""
              }`}
              onClick={() => handleSelectPlan(plan)}
            >
              <img
                src={plan.icon}
                alt={`${plan.name} icon`}
                className="plan-option__icon"
              />
              <div>
                <h2>{plan.name}</h2>
                <p>
                  {billingCycle === "monthly"
                    ? `$${plan.monthly}/mo`
                    : `$${plan.yearly}/yr`}
                  {billingCycle === "yearly" && <span> + 2 months free</span>}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="select-plan__billing-toggle">
          <span className={billingCycle === "monthly" ? "active" : ""}>
            Monthly
          </span>
          <label className="switch">
            <input
              type="checkbox"
              checked={billingCycle === "yearly"}
              onChange={() =>
                setBillingCycle(
                  billingCycle === "monthly" ? "yearly" : "monthly"
                )
              }
            />
            <span className="slider"></span>
          </label>
          <span className={billingCycle === "yearly" ? "active" : ""}>
            Yearly
          </span>
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
              disabled={!selectedPlan} // Disable button if no plan is selected
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </StepLayout>
  );
};

export default SelectPlan;
