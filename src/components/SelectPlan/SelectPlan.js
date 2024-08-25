import React, { useState } from "react";
import StepLayout from "../StepLayout/StepLayout";
import arcadeIcon from "../../images/icon-arcade.svg";
import advancedIcon from "../../images/icon-advanced.svg";
import proIcon from "../../images/icon-pro.svg";
import { useNavigate } from "react-router-dom";
import "./SelectPlan.css";

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

const SelectPlan = ({ onNextStep, onPrevStep }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const navigate = useNavigate();

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

  const handleBillingCycleToggle = () =>
    setBillingCycle((prevCycle) =>
      prevCycle === "monthly" ? "yearly" : "monthly"
    );

  const PlanOption = ({ plan }) => (
    <button
      type="button"
      aria-pressed={selectedPlan?.id === plan.id}
      className={`plan-option ${
        selectedPlan?.id === plan.id ? "selected" : ""
      }`}
      onClick={() => setSelectedPlan(plan)}
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
    </button>
  );

  return (
    <StepLayout currentStep={2}>
      <div className="select-plan">
        <header className="select-plan__content">
          <h1>Select your plan</h1>
          <p>You have the option of monthly or yearly billing.</p>
        </header>
        <section
          className="select-plan__options"
          role="radiogroup"
          aria-label="Plan options"
        >
          {plans.map((plan) => (
            <PlanOption key={plan.id} plan={plan} />
          ))}
        </section>
        <div className="select-plan__billing-toggle">
          <span className={billingCycle === "monthly" ? "active" : ""}>
            Monthly
          </span>
          <label className="switch">
            <input
              type="checkbox"
              checked={billingCycle === "yearly"}
              onChange={handleBillingCycleToggle}
              aria-label="Toggle billing cycle"
            />
            <span className="slider"></span>
          </label>
          <span className={billingCycle === "yearly" ? "active" : ""}>
            Yearly
          </span>
        </div>
        <footer className="navigation-buttons">
          <button className="go-back__button" onClick={onPrevStep}>
            Go Back
          </button>
          <button
            className="next-step__button"
            onClick={handleNextStep}
            disabled={!selectedPlan}
          >
            Next Step
          </button>
        </footer>
      </div>
    </StepLayout>
  );
};

export default SelectPlan;
