import React from "react";
import { useNavigate } from "react-router-dom";
import Step from "../Step/Step";
import desktopImage from "../../images/bg-sidebar-desktop.svg";
import mobileImage from "../../images/bg-sidebar-mobile.svg";
import "./StepLayout.css";

const StepLayout = ({ currentStep, children }) => {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStepClick = (stepNumber) => {
    const routes = [
      "/",
      "/select-plan",
      "/add-ons",
      "/summary",
      "/confirmation",
    ];
    navigate(routes[stepNumber - 1]); // Navigate to the corresponding route
  };

  const isCompleted = (stepNumber) => stepNumber < currentStep;

  return (
    <div
      className={`step-layout ${
        isDesktop ? "desktop-layout" : "mobile-layout"
      }`}
    >
      {/* Image */}
      <div className="info-image">
        <img src={isDesktop ? desktopImage : mobileImage} alt="Sidebar" />

        {/* Steps */}
        {isDesktop ? (
          <div className="desktop-steps">
            {[1, 2, 3, 4].map((step) => (
              <Step
                key={step}
                number={step}
                text={`STEP ${step}`}
                subtext={
                  ["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"][step - 1]
                }
                isDesktop={isDesktop}
                onClick={() => handleStepClick(step)}
                isCompleted={isCompleted(step)}
              />
            ))}
          </div>
        ) : (
          <div className="mobile-steps">
            {[1, 2, 3, 4].map((step) => (
              <Step
                key={step}
                number={step}
                isDesktop={isDesktop}
                onClick={() => handleStepClick(step)}
                isCompleted={isCompleted(step)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="step-content">{children}</div>
    </div>
  );
};

export default StepLayout;
