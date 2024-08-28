import React from "react";
import StepLayout from "../StepLayout/StepLayout";
import { useNavigate } from "react-router-dom";
import ThankYouIcon from "../../images/icon-thank-you.svg";
import "./Confirmation.css";

const Confirmation = () => {
  const navigate = useNavigate();

  // Navigate back to the homepage
  const handleGoHome = () => navigate("/");

  return (
    <StepLayout currentStep={5}>
      <div className="confirmation">
        <div className="top-elements">
          <img src={ThankYouIcon} alt="Thank You" className="thank-you-icon" />
          <h2>Thank you!</h2>
          <p>
            Thanks for confirming your subscription! We hope you enjoy our
            platform. For support, email us at{" "}
            <a href="mailto:support@loremgaming.com">support@loremgaming.com</a>
            .
          </p>
        </div>

        <div className="navigation-buttons">
          <button
            className="confirmation__go-home"
            onClick={handleGoHome}
            aria-label="Back to Home"
          >
            Back to Home
          </button>
        </div>
      </div>
    </StepLayout>
  );
};

export default Confirmation;
