import React, { useState, useEffect } from "react";
import Step from "./Step";
import desktopImage from "../images/bg-sidebar-desktop.svg";
import mobileImage from "../images/bg-sidebar-mobile.svg";

const StepLayout = ({ currentStep, children }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            />
            <Step
              number={2}
              text="STEP 2"
              subtext="SELECT PLAN"
              isDesktop={isDesktop}
            />
            <Step
              number={3}
              text="STEP 3"
              subtext="ADD-ONS"
              isDesktop={isDesktop}
            />
            <Step
              number={4}
              text="STEP 4"
              subtext="SUMMARY"
              isDesktop={isDesktop}
            />
          </div>
        ) : (
          <div className="mobile-steps">
            <Step number={1} isDesktop={isDesktop} />
            <Step number={2} isDesktop={isDesktop} />
            <Step number={3} isDesktop={isDesktop} />
            <Step number={4} isDesktop={isDesktop} />
          </div>
        )}
      </div>

      <div className="step-content">{children}</div>
    </div>
  );
};

export default StepLayout;
