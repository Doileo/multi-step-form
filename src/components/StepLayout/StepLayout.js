import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Step from "../Step/Step";
import desktopImage from "../../images/bg-sidebar-desktop.svg";
import mobileImage from "../../images/bg-sidebar-mobile.svg";
import "./StepLayout.css";

// Define step data outside the component to keep it clean
const STEPS = [
  { number: 1, text: "YOUR INFO", route: "/your-info" },
  { number: 2, text: "SELECT PLAN", route: "/select-plan" },
  { number: 3, text: "ADD-ONS", route: "/add-ons" },
  { number: 4, text: "SUMMARY", route: "/summary" },
];

const getStepClass = (isDesktop) =>
  isDesktop ? "desktop-layout" : "mobile-layout";

const StepLayout = ({ currentStep, children }) => {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // Optimize the resize handler using useCallback
  const handleResize = useCallback(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const handleStepClick = (stepNumber) => {
    if (stepNumber <= currentStep) {
      navigate(STEPS[stepNumber - 1].route);
    }
  };

  return (
    <div className={`step-layout ${getStepClass(isDesktop)}`}>
      <div className="info-image">
        <img src={isDesktop ? desktopImage : mobileImage} alt="Sidebar" />
        <div className={isDesktop ? "desktop-steps" : "mobile-steps"}>
          {STEPS.map((step) => (
            <Step
              key={step.number}
              number={step.number}
              text={`STEP ${step.number}`}
              subtext={step.text}
              isDesktop={isDesktop}
              isCompleted={step.number < currentStep}
              isLocked={step.number > currentStep}
              onClick={() => handleStepClick(step.number)}
            />
          ))}
        </div>
      </div>
      <div className="step-content">{children}</div>
    </div>
  );
};

export default StepLayout;
