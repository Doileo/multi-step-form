import React from "react";
import { useNavigate } from "react-router-dom";

const Step = ({ number, text, subtext, isDesktop }) => {
  const navigate = useNavigate();

  const handleStepClick = () => {
    switch (number) {
      case 1:
        navigate("/"); // Navigate to PersonalInfo component
        break;
      case 2:
        navigate("/select-plan"); // Navigate to SelectPlan component
        break;
      case 3:
        navigate("/add-ons"); // Navigate to AddOns component
        break;
      case 4:
        navigate("/summary"); // Navigate to Summary component
        break;
      default:
        navigate("/"); // Default to PersonalInfo component
        break;
    }
  };

  return (
    <div
      className={`step ${isDesktop ? "desktop-step" : "mobile-step"}`}
      onClick={handleStepClick}
    >
      <span className="step-number">{number}</span>
      {isDesktop && subtext && <span className="step-text">{subtext}</span>}
    </div>
  );
};

export default Step;
