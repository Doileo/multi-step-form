import React from "react";
import StepLayout from "../StepLayout/StepLayout";
import { useNavigate } from "react-router-dom";
import ThankYouIcon from "../../images/icon-thank-you.svg";
import "./Confirmation.css";

const Confirmation = () => {
  const navigate = useNavigate();

  // Handle navigation back to the homepage
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <StepLayout currentStep={5}>
      <div className="confirmation">
        <div className="top-elements">
          <img
            src={ThankYouIcon}
            alt="Thank You Icon"
            className="thank-you-icon"
          />
          <h2>Thank you!</h2>
          <p>
            Thanks for confirming your subscription! We hope you have fun using
            our platform. If you ever need support, please feel free to email us
            at{" "}
            <a href="mailto:support@loremgaming.com">support@loremgaming.com</a>
            .
          </p>
        </div>

        <div className="confirmation__footer">
          <div className="back-to-home">
            <button className="confirmation__go-home" onClick={handleGoHome}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </StepLayout>
  );
};

export default Confirmation;
