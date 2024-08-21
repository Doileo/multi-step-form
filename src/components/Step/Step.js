import React from "react";

const Step = ({
  number,
  text,
  subtext,
  isDesktop,
  isCompleted,
  isLocked,
  onClick,
}) => {
  return (
    <div
      className={`step ${isDesktop ? "desktop-step" : "mobile-step"} ${
        isCompleted ? "completed" : ""
      } ${isLocked ? "locked" : ""}`}
      onClick={!isLocked ? onClick : undefined}
    >
      <div className="step-number">{number}</div>
      {isDesktop && (
        <div className="step-text">
          <div className="step-main-text">{text}</div>
          <div className="step-sub-text">{subtext}</div>
        </div>
      )}
    </div>
  );
};

export default Step;
