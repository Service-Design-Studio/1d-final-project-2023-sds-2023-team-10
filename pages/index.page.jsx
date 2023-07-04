import React, { useState } from "react";
import styles from "./app.module.css";
import { useRouter } from "next/router";
import axios from "axios";


const postDataToApi = async (data) => {

  const response = await axios.post("/api/users", data, {
    headers: {
      accept: "application/json",
    },
  });

  console.log(response);

};

const userData = {
  1:"No Input",
  2:"No Input",
  3:"No Input",
  4:"No Input",
  5:"No Input",
// ... ... ... ... TO BE FINISHED
}

// Will render a page with a submit button depending on what questions and output routes are there

// Input Format:
//
// { "Question A": Route ( next question index ) , "Question B": Route. "Question C",Route }


const RenderQuestionPage_SingleSelect = ({currentIndex, mainQuestion, options, onOptionSelected}) => {
  // Render options
  const renderOptions = () => {
    return Object.entries(options).map(([option, question], index) => {
      return (
        <div className ={styles.questions} key={index} onClick={() => onOptionSelected(option,question)}>
          {option}
        </div>
      );
    });
  };

  return (
    <div>

      <h1 className={styles.questions}>
        {mainQuestion}
      </h1>

      <div className={styles.container}>

        <div className={styles.options}>
          {renderOptions()}
        </div>

      </div>
  </div>
  );
};



// Select Multiple Options, takes in currentIndex, mainQuestion, options, and an onSubmit function
const RenderQuestionPage_MultiSelect = ({
  currentIndex,
  mainQuestion,
  options,
  onSubmit
}) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  // Toggle options on click
  const toggleOption = (option, question) => {
    setSelectedOptions(prevState => {
      const newState = { ...prevState };
      if (newState[option]) {
        delete newState[option];
      } else {
        newState[option] = question;
      }
      return newState;
    });
  };

  // Render options
  const renderOptions = () => {
    return Object.entries(options).map(([option, question], index) => {
      const isSelected = !!selectedOptions[option];

      return (
        <div
          className={`${styles.questions} ${isSelected ? styles.selected : ''}`}
          key={index}
          onClick={() => toggleOption(option, question)}
        >
          {option}
        </div>
      );
    });
  };

  // Handle submit
  const handleSubmit = () => {
    console.log(selectedOptions)
    onSubmit(selectedOptions);
  };

  return (
    <div>
      <h1 className={styles.questions}>{mainQuestion}</h1>

      <div className={styles.container}>
        <div className={styles.options}>{renderOptions()}</div>

        <button className={styles.submitButton} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

function App() {

  const [userData, setUserData] = useState({
    1:"",
    2:"",
    3:"",
    4:"",
    5:"",
    6:"",
    7:"",
    8:"",
    9:"",
    10:"",
    11:"",
    12:"",
    13:"",
    14:"",
    15:"",
    16:"",
    17:"",
    18:"",
    19:"",
    20:"",
    21:"",
    22:"",
    23:"",
    24:"",
    25:"",
    26:""
  })

  const [userPath, setUserPath] = useState([])
  
  const [page,setPage] = useState("onBoarding")

  const [question,setQuestion] = useState(1);

  const [route, setRoute] = useState('');

  // Callback for when an option is selected
  const handleOptionSelected = (selectedOption,nextQuestionIndex) => {


    setUserData(prevState => ({...prevState, [question]: selectedOption}));
    setUserPath(prevPath => [...prevPath, question]);
    setQuestion(nextQuestionIndex);

    console.log(userData)
    console.log(userPath)
  };

  const handleMultipleOptionSelected = (selectedOption) => {

    if (question == 2) {
      setUserData(prevState => ({...prevState, [question]: selectedOption}));
      setQuestion(5)
    }

    if (question==5) {
      setUserData(prevState => ({...prevState, [question]: selectedOption}));
      setQuestion(6)
    }


    console.log(selectedOption);
    console.log(nextQuestionIndex);
    setUserPath(prevPath => [...prevPath, question]);
    setQuestion(nextQuestionIndex);
    console.log(userPath)
  };

  const handleBackClick = () => {
    // Define your logic for the Back button click here
  };
  
  const handleSkipClick = () => {
    // Define your logic for the Skip button click here
  };

  const question1Dict = {
    'Option A': 1,
    'Option B': 2,
    'Option C': 3,
  };

  const question2Dict = {
    'Option A': 1,
    'Option B': 2,
    'Option C': 3,
  };

  const questionOptions = {
    "Symptom1": "Symptom1 Issues",
    "Symptom2": "Symptom2 Issues",
    "Symptom3": "Symptom3 Issues"
}



  return (
    <div className={styles.App}>

      {/* onboarding page // main design and login button */}
      {page === "onBoarding" && (
        <div className = {styles.onBoarding}>
          <h1>Guiding Hand</h1>
          <h2>Clarity with Care and Compassion</h2>

          <div className={styles.guidingHandHeart} />
          <div className={styles.letsgoButtonContainer}>
          <button
              type="button"
              className={styles.letsgoButton}
              onClick={() => setPage("Start")}
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
      {page === "Start" && (
        <div className = {styles.Start}>
          <h1>
            Take short questionaire
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
              onClick={() => {setPage("questionnaire");setUserPath(prevPath => [...prevPath, question])}}
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
        <div>


          {question === 1 && (
                <div>
                <RenderQuestionPage_SingleSelect
                  currentIndex={0}
                  mainQuestion={'First Question'}
                  options={question1Dict}
                  onOptionSelected={handleOptionSelected}
                />
                Current Question: {question}
              </div>
            
          )}

          {question === 2 && (
            <div>
              <RenderQuestionPage_SingleSelect
                currentIndex={0}
                mainQuestion={'Your question here 2'}
                options={question2Dict}
                onOptionSelected={handleOptionSelected}
              />
              <p>Current Question: {question}</p>
              <button type="button" className={styles.button} onClick={handleBackClick}>
                Back
              </button>
              <button type="button" className={styles.button} onClick={handleSkipClick}>
                Skip
              </button>
            </div>
          )}

          {question === 3 && (
            <div>
              <RenderQuestionPage_MultiSelect
                currentIndex={0}
                mainQuestion={'This is question 3, select multiple'}
                options={questionOptions}
                onSubmit={handleMultipleOptionSelected}
              />

              <p>Current Question: {question}</p>
              <button type="button" className={styles.button} onClick={handleBackClick}>
                Back
              </button>
              <button type="button" className={styles.button} onClick={handleSkipClick}>
                Skip
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default App;