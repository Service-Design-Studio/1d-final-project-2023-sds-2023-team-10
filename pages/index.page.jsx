import React, { useState } from "react";

import styles from "./app.module.css";

function App() {
  const [page, setPage] = useState("onboarding");
  const [question, setQuestion] = useState(1);
  const [fade, setFade] = useState(false);

  const [userData, setUserData] = useState({
    1: "No Input",
    2: "No Input",
    3: "No Input",
  });

  const handleLetsgoClick = () => {
    setFade(true);
    setTimeout(() => {
      setPage("start-questionnaire");
      setTimeout(() => {
        setFade(false);
      }, 502); // Set the delay to 502 milliseconds
    }, 500); // Delay the page change for 500 milliseconds (adjust as needed)
  };

  const handleIllTryClick = () => {
    setFade(true);
    setTimeout(() => {
      setPage("questionnaire");
      setFade(false);
    }, 500); // Delay the page change for 500 milliseconds (adjust as needed)
  };

  const nextPage = (input) => {
    if (input == "skipped") {
    } else {
      setUserData((userData[question] = input));
      setQuestion(question + 1);
    }
  };

  const [progressValue, setProgressValue] = useState(0);

  const handleIncrement = () => {
    setProgressValue((prevValue) => prevValue + 10);
  };

  const handleDecrement = () => {
    setProgressValue((prevValue) => prevValue - 10);
  };

  const ProgressBar = ({ value }) => {
    return (
      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${value}%` }} />
      </div>
    );
  };

  const handleBackClick = () => {
    if (question > 1) {
      handleDecrement();
      setQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  const handleSkipClick = () => {
    handleIncrement();
    setQuestion(question + 1);
  };

  const page1 = [
    {
      name: "I think I'm pregnant",
      onClick: () => {
        handleIncrement();
        nextPage("I think I'm Pregnant");
      },
    },
    {
      name: "I am expecting",
      onClick: () => {
        handleIncrement();
        nextPage("I am expecting");
      },
    },
    {
      name: "I am a new parent",
      onClick: () => {
        handleIncrement();
        nextPage("I am a new parent");
      },
    },
    {
      name: "My girlfriend is pregnant",
      onClick: () => {
        handleIncrement();
        nextPage("My girlfriend is pregnant");
      },
    },
    {
      name: "Someone I know is pregnant",
      onClick: () => {
        handleIncrement();
        nextPage("My girlfriend is pregnant");
      },
    },
  ];

  return (
    <div className={styles.App}>
      {/* onboarding page // main design and login button */}
      {page === "onboarding" && (
        <div
          className={`${styles.onboardingPage} ${fade ? styles.fadeOut : ""}`}
        >
          <h1>Guiding Hand</h1>
          <h2>Clarity with Care</h2>

          <div className={styles.guidingHandHeart} />
          <div className={styles.letsgoButtonContainer}>
            <button
              type="button"
              className={styles.letsgoButton}
              onClick={handleLetsgoClick}
            >
              Start!
            </button>
          </div>

          <button className={styles.privacyPolicyButton}>
            Terms & Privacy Policy
          </button>
        </div>
      )}

      {/* Start Questionnaire */}
      {page === "start-questionnaire" && (
        <div
          className={`${styles.startQuestionnaire} ${
            fade ? styles.fadeOut : ""
          }`}
        >
          <h1>
            Take short <br /> questionaire
          </h1>

          <h2>
            Would you like to take a quick questionnaire for us to better
            understand your situation? <br />
            <br />
            All questions are optional.
          </h2>

          <div className={styles.letsgoButtonContainer}>
            <button
              type="button"
              className={styles.letsgoButton}
              onClick={handleIllTryClick}
            >
              I'll give it a shot
            </button>
          </div>

          <button type="button" className={styles.privacyPolicyButton}>
            Skip for now
          </button>
        </div>
      )}

      {/* Questonnaire */}
      {page === "questionnaire" && (
        <div className={styles.questions}>
          <ProgressBar value={progressValue} />

          {question === 1 && (
            <div className={styles.Question}>
              <h1>How may we help?</h1>
              <div className={styles.buttonContainer}>
                {page1.map((buttonData, index) => (
                  <button
                    className={styles.button}
                    type="button"
                    key={index}
                    onClick={buttonData.onClick}
                  >
                    {buttonData.name}
                  </button>
                ))}
              </div>

              <div className={styles.backSkipButtons}>
                <button
                  type="button"
                  className={styles.backButton}
                  onClick={handleBackClick}
                >
                  Back
                </button>
                <button
                  type="button"
                  className={styles.skipButton}
                  onClick={handleSkipClick}
                >
                  Skip
                </button>
              </div>
            </div>
          )}

          {question === 2 && <div />}

          {question === 3 && <div />}

          {question === 4 && <div />}
        </div>
      )}
    </div>
  );
}

export default App;
