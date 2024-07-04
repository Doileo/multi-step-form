import React from "react";

const Step = ({ number, text, subtext, isDesktop }) => {
  return (
    <div className={`step ${isDesktop ? "desktop-step" : "mobile-step"}`}>
      <div className="step-circle">{number}</div>
      {isDesktop && (
        <div className="step-details">
          <div className="step-text">{text}</div>
          <div className="step-subtext">{subtext}</div>
        </div>
      )}
    </div>
  );
};

export default Step;
