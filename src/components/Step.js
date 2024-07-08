import React from "react";

const Step = ({ number, text, subtext, isDesktop }) => {
  return (
    <div className={`step ${isDesktop ? "desktop-step" : "mobile-step"}`}>
      {isDesktop ? (
        <>
          <div className="step-number">{number}</div>
          <div className="step-text">
            <div className="step-main-text">{text}</div>
            <div className="step-sub-text">{subtext}</div>
          </div>
        </>
      ) : (
        <div className="step-number-mobile">{number}</div>
      )}
    </div>
  );
};

export default Step;
