import React, { useState, useRef } from "react";
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

  // Refs for arrow key navigation
  const planRefs = useRef([]);

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

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = (index + 1) % plans.length;
      planRefs.current[next].focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (index - 1 + plans.length) % plans.length;
      planRefs.current[prev].focus();
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      setSelectedPlan(plans[index]);
    }
  };

  const PlanOption = ({ plan, index }) => (
    <button
      ref={(el) => (planRefs.current[index] = el)}
      type="button"
      role="radio"
      aria-checked={selectedPlan?.id === plan.id}
      className={`plan-option ${
        selectedPlan?.id === plan.id ? "selected" : ""
      }`}
      onClick={() => setSelectedPlan(plan)}
      onKeyDown={(e) => handleKeyDown(e, index)}
    >
      <img
        src={plan.icon}
        alt=""
        aria-hidden="true"
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

        <div
          className="select-plan__options"
          role="radiogroup"
          aria-label="Plan options"
        >
          {plans.map((plan, index) => (
            <PlanOption key={plan.id} plan={plan} index={index} />
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
