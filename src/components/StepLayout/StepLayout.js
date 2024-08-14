import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Step from "../Step/Step";
import desktopImage from "../../images/bg-sidebar-desktop.svg";
import mobileImage from "../../images/bg-sidebar-mobile.svg";
import "./StepLayout.css";

const StepLayout = ({ currentStep, children }) => {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const steps = [
    { number: 1, text: "YOUR INFO" },
    { number: 2, text: "SELECT PLAN" },
    { number: 3, text: "ADD-ONS" },
    { number: 4, text: "SUMMARY" },
  ];

  const handleStepClick = (stepNumber) => {
    if (stepNumber <= currentStep) {
      navigate(steps[stepNumber - 1].route);
    }
  };

  return (
    <div
      className={`step-layout ${
        isDesktop ? "desktop-layout" : "mobile-layout"
      }`}
    >
      <div className="info-image">
        <img src={isDesktop ? desktopImage : mobileImage} alt="Sidebar" />
        <div className={isDesktop ? "desktop-steps" : "mobile-steps"}>
          {steps.map((step) => (
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
