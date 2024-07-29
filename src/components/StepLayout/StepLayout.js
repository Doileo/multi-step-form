import React from "react";
import { useNavigate } from "react-router-dom";
import Step from "../Step/Step";
import desktopImage from "../../images/bg-sidebar-desktop.svg";
import mobileImage from "../../images/bg-sidebar-mobile.svg";
import "./StepLayout.css";

const StepLayout = ({ children }) => {
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
            <Step
              number={1}
              text="STEP 1"
              subtext="YOUR INFO"
              isDesktop={isDesktop}
              onClick={() => handleStepClick(1)}
            />
            <Step
              number={2}
              text="STEP 2"
              subtext="SELECT PLAN"
              isDesktop={isDesktop}
              onClick={() => handleStepClick(2)}
            />
            <Step
              number={3}
              text="STEP 3"
              subtext="ADD-ONS"
              isDesktop={isDesktop}
              onClick={() => handleStepClick(3)}
            />
            <Step
              number={4}
              text="STEP 4"
              subtext="SUMMARY"
              isDesktop={isDesktop}
              onClick={() => handleStepClick(4)}
            />
          </div>
        ) : (
          <div className="mobile-steps">
            <Step
              number={1}
              isDesktop={isDesktop}
              onClick={() => handleStepClick(1)}
            />
            <Step
              number={2}
              isDesktop={isDesktop}
              onClick={() => handleStepClick(2)}
            />
            <Step
              number={3}
              isDesktop={isDesktop}
              onClick={() => handleStepClick(3)}
            />
            <Step
              number={4}
              isDesktop={isDesktop}
              onClick={() => handleStepClick(4)}
            />
          </div>
        )}
      </div>

      <div className="step-content">{children}</div>
    </div>
  );
};

export default StepLayout;
