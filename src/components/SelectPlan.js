import React, { useState } from "react";
import StepLayout from "./StepLayout";
import arcadeIcon from "../images/icon-arcade.svg";
import advancedIcon from "../images/icon-advanced.svg";
import proIcon from "../images/icon-pro.svg";
import { useNavigate } from "react-router-dom";

const SelectPlan = ({ onNextStep, onPrevStep }) => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const navigate = useNavigate();

  const plans = [
    { name: "Arcade", monthly: "$9/mo", yearly: "$90/yr", icon: arcadeIcon },
    {
      name: "Advanced",
      monthly: "$12/mo",
      yearly: "$120/yr",
      icon: advancedIcon,
    },
    { name: "Pro", monthly: "$15/mo", yearly: "$150/yr", icon: proIcon },
  ];

  const handleNextStep = () => {
    onNextStep();
    navigate("/add-ons");
  };

  const handleGoBack = () => {
    onPrevStep();
    navigate(-1); // Navigate back to the previous step
  };

  return (
    <StepLayout currentStep={2}>
      {/* Content */}
      <div className="select-plan">
        <header className="select-plan__header">
          <h1>Select your plan</h1>
          <p>You have the option of monthly or yearly billing.</p>
        </header>
        <div className="select-plan__options">
          {plans.map((plan) => (
            <div key={plan.name} className="plan-option">
              <img
                src={plan.icon}
                alt={`${plan.name} icon`}
                className="plan-option__icon"
              />
              <div>
                <h2>{plan.name}</h2>
                <p>
                  {billingCycle === "monthly" ? plan.monthly : plan.yearly}
                  {billingCycle === "yearly" && <span> + 2 months free</span>}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="select-plan__billing-toggle">
          <label>
            Monthly
            <input
              type="radio"
              name="billing"
              value="monthly"
              checked={billingCycle === "monthly"}
              onChange={() => setBillingCycle("monthly")}
            />
          </label>
          <label>
            Yearly
            <input
              type="radio"
              name="billing"
              value="yearly"
              checked={billingCycle === "yearly"}
              onChange={() => setBillingCycle("yearly")}
            />
          </label>
        </div>
        <div className="select-plan__footer">
          <div className="previous-step">
            <button className="select-plan__go-back" onClick={handleGoBack}>
              Go Back
            </button>
          </div>
          <div className="next-step">
            <button className="select-plan__next-step" onClick={handleNextStep}>
              Next Step
            </button>
          </div>
        </div>
      </div>
    </StepLayout>
  );
};

export default SelectPlan;
