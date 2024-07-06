import React, { useState, useEffect } from "react";
import Step from "./Step";
import desktopImage from "../images/bg-sidebar-desktop.svg";
import mobileImage from "../images/bg-sidebar-mobile.svg";
import { useNavigate } from "react-router-dom";

const PersonalInfo = ({ onNextStep }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNextStep = () => {
    // Add form validation or other logic before moving to the next step
    // For simplicity, directly move to the next step
    onNextStep();
    navigate("/select-plan");
  };

  return (
    <div
      className={`personal-info ${
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

      {/* Content */}
      <div className="info-content">
        <h1 className="info-heading">Personal Info</h1>
        <p className="info-text">
          Please provide your name, email address, and phone number.
        </p>

        <form className="info-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="e.g. Stephen King" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="e.g. stephenking@lorem.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" placeholder="e.g. +1 234 567 890" />
          </div>
        </form>

        {/* Next Step Button */}
        <div className="next-step">
          <button type="button" onClick={handleNextStep}>
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
