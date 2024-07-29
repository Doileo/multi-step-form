// Step.js
import React from "react";
import "./Step.css";

const Step = ({ number, text, subtext, isDesktop, onClick }) => {
  return (
    <div
      className={`step ${isDesktop ? "desktop-step" : "mobile-step"}`}
      onClick={onClick}
    >
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
