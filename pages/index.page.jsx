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

const TellUsMoreAssociate = (props) => {


  const [formDataAssociate, setFormDataAssociate] = useState({
    anonymous: false,
    name: "",
    age: "",
    number: "",
    relationship: "",
  });

  const handleChange2 = (event) => {
    const { name, value } = event.target;
    setFormDataAssociate((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();
    const json = JSON.stringify(formDataAssociate);
    console.log("Form data:", json);
    props.updateUserData(formDataAssociate);


    props.nextPage("IsAssociate", 15, 16);
  };

  return (
    <div className={styles.tellusmore}>
      <form>
        <p className={styles.labelLeftAlign}>
          <label htmlFor="anonymous">
            Would you like to remain anonymous?
          </label>
          <div>
            <input
              type="checkbox"
              id="anonymous"
              name="anonymous"
              onChange={handleChange2}
            />
          </div>
        </p>
        <p className={styles.labelLeftAlign}>
          <label htmlFor="name">What is your name?</label>
          <div>
            <input className={`${styles.roundedBorder}`} type="text" id="name" name="name" onChange={handleChange2} />
          </div>
        </p>
        <p className={styles.labelLeftAlign}>
          <label htmlFor="age">What is your age?</label>
          <div>
            <input className={`${styles.roundedBorder}`} type="number" id="age" name="age" onChange={handleChange2} />
          </div>
        </p>
        <p className={styles.labelLeftAlign}>
          <label htmlFor="relationship">
            What is your relationship to the pregnant individual?
          </label>
          <div>
            <select
              id="relationship"
              name="relationship"
              onChange={handleChange2}
              className={`${styles.roundedBorder}`}
            >
              <option value="friend">Friend</option>
              <option value="relative">Relative</option>
              <option value="spouse_partner">Spouse/Partner</option>
              <option value="parent">Parent</option>
            </select>
          </div>
        </p>
        <p className={styles.labelLeftAlign}>
          <label htmlFor="age">Contact information (optional, for emergency contact only)</label>
          <div>
            <input className={`${styles.roundedBorder}`} type="number" id="age" name="age" onChange={handleChange2} />
          </div>
        </p>
        <input className={styles.submit} type="submit" value="Submit" onClick={handleSubmit2} />
      </form>
    </div>
  );



};

const TellUsMore = (props) => {
  const [formData, setFormData] = useState({
    anonymous: false,
    name: "",
    age: "",
    number: "",
    stage_of_life: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const json = JSON.stringify(formData);
    console.log("Form data:", json);
    props.updateUserData(formData);

    props.nextPage("IsVictim", 10, 17)
  };


  return (
    <div className={styles.tellusmore}>
      <h1>Tell us more!</h1>
      <form>
        <p className={styles.labelLeftAlign}>
          <label htmlFor="anonymous" className={styles.labelLeftAlign}>Would you like to remain anonymous?</label>
          <input type="checkbox" id="anonymous" name="anonymous" onChange={handleChange} />
        </p >
        <p className={styles.labelLeftAlign}>
          <label htmlFor="name" className={styles.labelLeftAlign}>What is your name?</label>
          <input className={styles.ghfield} type="text" id="name" name="name" onChange={handleChange} />
        </p>
        <p className={styles.labelLeftAlign}>
          <label htmlFor="age" className={styles.labelLeftAlign}>What is your age?</label>
          <input className={styles.ghfield} type="number" id="age" name="age" onChange={handleChange} />
        </p>
        <p className={styles.labelLeftAlign}>
          <label htmlFor="number" className={styles.labelLeftAlign}>Your contact number (optional for emergency purposes only)</label>
          <input className={styles.ghfield} type="text" id="number" name="number" onChange={handleChange} />
        </p>

        <p className={styles.labelLeftAlign}>
          <label htmlFor="stage_of_life" className={styles.labelLeftAlign}>What stage of life are you in (ie. student)</label>
          <select className={styles.labelLeftAlignField} id="stage_of_life" name="stage_of_life" onChange={handleChange}>
            <option value="Student_Primary_School">Student (Primary School)</option>
            <option value="Student_Secondary_School">Student (Secondary School)</option>
            <option value="Student_Polytechnic">Student (Polytechnic)</option>
            <option value="Student_Junior_College">Student (Junior College/Similar)</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Working_Full_Time">Working Full-Time</option>
            <option value="Working_Part_Time">Working Part-Time</option>
            <option value="Searching_for_Job">Searching for job</option>
            <option value="Foreign_Worker">Foreign worker</option>
          </select>
        </p>

        <input className={styles.submit} type="submit" value="Submit" onClick={handleSubmit} />
      </form>
    </div>
  );
};

function App() {

  const [formData, setFormData] = useState({
    anonymous: false,
    name: "",
    age: "",
    number: "",
    stage_of_life: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const json = JSON.stringify(formData);

    var temp = userData;
    temp["Tell us more"] = formData;
    setUserData(temp)



    console.log(userData)
    nextPage("IsVictim", 10, 17)
  };





  const [othersInput, setOthersInput] = useState("");

  const handleOthersInputChange = (event) => {
    setOthersInput(event.target.value);
  };

  const updateQuestion = (newQuestion) => {
    setQuestion(newQuestion);
  };

  const updateUserDataTellusMore = (updatedData) => {
    console.log("UodateUserData was called")
    console.log("this is user data", updatedData)

    console.log(userData)
    setUserData({ ...userData, "Tell us more": updatedData });
  };

  const updateUserDataTellusMoreAssociate = (updatedData) => {
    console.log("UodateUserData was called")
    console.log("this is user data", updatedData)

    console.log(userData)

    setUserData({ ...userData, "Tell_us_more_associate": updatedData });
  };


  // Keeping Track of User Position
  const [page, setPage] = useState("onboarding");

  // Questionaire variables
  const [prevQuestion, setprevQuestion] = useState("None")
  const [question, setQuestion] = useState(1);

  // Animation variables
  const [fade, setFade] = useState(false);

  // Set Perspective

  const [persp, setPersp] = useState("your")

  // Output Data in JSON format
  const [userData, setUserData] = useState({
    1: "No Input",// How may we help page
    2: { "Missed Period": false, "Nausea and Vomiting": false, "Breast Changes": false, "Fatigue": false, "Frequent Urination": false },//Currently Removed! changed to would you like to talk to a counsellor

    3: "No Input",// Which describes your situation | attached, attached bnut not married, married


    // Which describes your situation

    // forked from 3 // use perspective propt starting from here
    4: "No Input",// partner left, dk who father is, partner passed away, partner in prison, others
    5: "No Input",// parents do not know.... following 4
    6: "No Input",// following 5, want to keep baby.. want to abort

    // Leads to tell us more

    //forked from 3
    7: "No Input",// want to keep baby, want to abort, give away
    8: "No Input",// financial struggles cant care...
    9: "No Input",// Dont want kids..

    // Leads to tell us more
    10: "No Input",
    11: "No Input",
    12: "No Input",
    13: "No Input",
    14: "No Input",

    15: "No Input",// Currently used us tell us more for associate 
    16: "No Input",// Which describes their situation | same routing as 3, route to either 4 or 7 with different changed perspective propt // NOT DONE


    17: "No Input",// Tell us more about yourself // NOT DONE
    18: "No Input",
    19: "No Input",
    20: "No Input",



    "Tell us more": "",
    "Tell_us_more_associate": ""

  });





  const flipdata = (question, field) => {

    if (userData[question][field] == true) {
      var tempData = userData
      tempData[question][field] = false
      setUserData(tempData)
    } else {
      tempData = userData
      tempData[question][field] = true
      setUserData(tempData)
    }

    console.log(userData)

  }

  // Navigation Buttons
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

  const nextPage = (input, question, nextQuestion) => {

    setFade({ fadeOut: true, translateBack: false });


    setTimeout(() => {
      setprevQuestion(question)
      setQuestion(nextQuestion);

      console.log("InNExtP{age", userData)

      if (input !== "Back" && input !== "IsAssociate" && input !== "isVictim") {
        setUserData({ ...userData, [question]: input });
      }


      setFade({ fadeOut: false, translateBack: true });
      console.log(userData)



    }, 500);

  };

  // Progress Bar Features
  const [progressValue, setProgressValue] = useState(0);

  const handleIncrement = () => {
    setProgressValue((progressValue) => progressValue + 10);
  };

  const handleDecrement = () => {
    if (progressValue > 0) {
      setProgressValue((progressValue) => progressValue - 10)
    };
  };

  const ProgressBar = ({ value }) => {
    return (
      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${value}%` }} />
      </div>
    );
  };



  // Questionaire Functions
  const handleBackClick = () => {
    if (question > 1) {
      handleDecrement()
      nextPage("Back", question, prevQuestion);


    }
  };

  const handleSkipClick = () => {

  };

  // Page 1 Questions
  const page1 = [
    {
      name: "I am expecting",
      onClick: () => {
        handleIncrement();
        nextPage("I am expecting", question, 3);
      },
    },
    {
      name: "I am a new parent",
      onClick: () => {
        handleIncrement();
        nextPage("I am a new parent", question, 3);
      },
    },
    {
      name: "Someone I know is pregnant",
      onClick: () => {
        handleIncrement();
        setPersp("their");
        nextPage("Someone I know is pregnant", question, 15);
      },
    },
  ];

  const page3 = [
    {
      name: "I'm not attached",
      onClick: () => {
        handleIncrement();

        nextPage("I'm not attached", question, 4);
      },
    },
    {
      name: "I'm attached but not married",
      onClick: () => {
        handleIncrement();
        nextPage("I'm attached but not married", question, 5);
      },
    },
    {
      name: "I'm married",
      onClick: () => {
        handleIncrement();
        nextPage("I'm married", question, 7);
      },
    },


  ];

  const page4 = [
    {
      name: "Partner left",
      onClick: () => {
        handleIncrement();

        nextPage("Partner left", question, 5);
      },
    },
    {
      name: "Don't know who the father is",
      onClick: () => {
        handleIncrement();
        nextPage("Don't know who the father is", question, 5);
      },
    },
    {
      name: "Partner passed away",
      onClick: () => {
        handleIncrement();
        nextPage("Partner in prison", question, 5);
      },
    },


  ];


  const page5 = [
    {
      name: "Parrents do not know",
      onClick: () => {
        handleIncrement();

        nextPage("Parents do not know", question, 6);
      },
    },
    {
      name: "Parents are supportive",
      onClick: () => {
        handleIncrement();
        nextPage("Parents are supportive", question, 6);
      },
    },
    {
      name: "Parents want me to abort",
      onClick: () => {
        handleIncrement();
        nextPage("Parents want me to abort", question, 6);
      },
    },
    {
      name: "Parents have shut me out",
      onClick: () => {
        handleIncrement();
        nextPage("Parents have shut me out", question, 6);
      },
    },



  ];

  const page6 = [
    {
      name: "Want to keep baby",
      onClick: () => {
        handleIncrement();

        nextPage("Want to keep baby", question, 10);
      },
    },
    {
      name: "Want to abort/give away",
      onClick: () => {
        handleIncrement();
        nextPage("Want to abort/give away", question, 10);
      },
    },




  ];

  const page7 = [
    {
      name: "Want to keep baby",
      onClick: () => {
        handleIncrement();

        nextPage("Want to keep baby", question, 8);
      },
    },
    {
      name: "Want to abort/give away",
      onClick: () => {
        handleIncrement();
        nextPage("Want to abort/give away", question, 9);
      },
    },




  ];

  const page8 = [
    {
      name: "Financial Struggles",
      onClick: () => {
        handleIncrement();

        nextPage("Financial Struggles", question, 10);
      },
    },
    {
      name: "Can't care for baby",
      onClick: () => {
        handleIncrement();
        nextPage("Want to abort/give away", question, 10);
      },
    },
    {
      name: "Husband is not supportive",
      onClick: () => {
        handleIncrement();
        nextPage("Husnband is not supportive", question, 10);
      },
    },




  ];

  const page16 = [
    {
      name: "Single Mom",
      onClick: () => {
        handleIncrement();
        setPersp('their')
        nextPage("Single Mom", question, 4);
      },
    },
    {
      name: "Unmarried",
      onClick: () => {
        setPersp('their')
        handleIncrement();
        nextPage("Unmarried", question, 5);
      },
    },
    {
      name: "Married",
      onClick: () => {
        setPersp('their')
        handleIncrement();
        nextPage("Married", question, 7);
      },
    },



  ];

  const page9 = [
    {
      name: "Don't want kids",
      onClick: () => {
        handleIncrement();

        if (persp === "your") { nextPage("Don't want kids", question, 10) } else { nextPage("Don't want kids", question, 17) };
      },
    },
    {
      name: "Family is complete",
      onClick: () => {
        handleIncrement();
        if (persp === "your") { nextPage("Don't want kids", question, 10) } else { nextPage("Don't want kids", question, 17) };
      },
    },
    {
      name: "New job/other priorities",
      onClick: () => {
        handleIncrement();
        if (persp === "your") { nextPage("Don't want kids", question, 10) } else { nextPage("Don't want kids", question, 17) };
      },
    },
    {
      name: "Child has special needs",
      onClick: () => {
        handleIncrement();
        if (persp === "your") { nextPage("Don't want kids", question, 10) } else { nextPage("Don't want kids", question, 17) };
      },
    },




  ];


  const [tellUsMore, setTellUsMore] = useState({});
  const router = useRouter();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTellUsMore((prevState) => ({ ...prevState, [name]: value }));
  };


  // MAIN FUNCTION TO LINK TO ARTICLES
  const handleSubmitQuestionnaire2 = (event) => {
    event.preventDefault();

    // Get the form data and store it in an object (dictionary)
    const formOutput = {
      week: event.target.week.value,
      additionalInfo: event.target.additionalInfo.value
    };

    // Handle formOutput object as needed, e.g., updating state or sending to an API
    console.log(formOutput);

    const DataToAPI = {

      user_type: "Tell us more" === "" ? "Associate" : "Victim",
      profile: "string",
      first_name: "Tell us more" === "" ? userData["Tell_us_more_associate"]["name"].split(" ")[0] : userData["Tell us more"]["name"].split(" ")[0],
      second_name: "Tell us more" === "" ? userData["Tell_us_more_associate"]["name"].split(" ")[-1] : userData["Tell us more"]["name"].split(" ")[-1],
      age: "Tell us more" === "" ? userData["Tell_us_more_associate"]["age"] : userData["Tell us more"]["age"],
      occupation: formData["stage_of_life"],
      username: "string",
      phone_number: "Tell us more" === "" ? userData["Tell_us_more_associate"]["number"] : userData["Tell us more"]["number"],
      gender: "string",
      pregnant: userData[1],
      marital_status: userData[3] === "I'm married" ? "Married" : "Single",
      pregnancy_week: formOutput.week,
      is_anonymous_login: userData["Tell us more"] !== "" ? userData["Tell us more"]["anonymous"] : userData["Tell_us_more_associate"]["anonymous"],
      survey_result: userData,
      email: "string",
      password: "string"
    };

    postDataToApi(DataToAPI)
    router.push("/home")




  };




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
          className={`${styles.startQuestionnaire} ${fade ? styles.fadeOut : ""
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
      {page === "questionnaire" && <ProgressBar value={progressValue} />}

      {page === "questionnaire" && (
        <div
          className={`${styles.questionnaire} ${fade.fadeOut ? styles.fadeOut : ""} ${fade.translateBack ? styles.translateBack : ""}`}>


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

              <div className={styles.backSkipButtons} onClick={handleBackClick}>
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

          {question === 2 && <div>
            <div className={styles.Question}>
              <h1>Select any of the following symptoms you are experiencing</h1>



              <div className={styles.checklist}>
                <label className={styles.checklistOption}>
                  <input type="checkbox" class="hidden" name="Missed Period" />
                  <div className={styles.rect} onClick={() => flipdata(question, "Missed Period")}>Missed Period</div>
                </label>

                <label className={styles.checklistOption}>
                  <input type="checkbox" class="hidden" name="Nausea and Vomiting" />
                  <div className={styles.rect} onClick={() => flipdata(question, "Nausea and Vomiting")}>Nausea and Vomiting</div>
                </label>

                <label className={styles.checklistOption}>
                  <input type="checkbox" class="hidden" name="Breast Changes" />
                  <div className={styles.rect} onClick={() => flipdata(question, "Breast Changes")}>Breast Changes</div>
                </label>

                <label className={styles.checklistOption}>
                  <input type="checkbox" class="hidden" name="Fatigue" />
                  <div className={styles.rect} onClick={() => flipdata(question, "Fatigue")}>Fatigue</div>
                </label>

                <label className={styles.checklistOption}>
                  <input type="checkbox" class="hidden" name="Frequent Urination" />
                  <div className={styles.rect} onClick={() => flipdata(question, "Frequent Urination")}>Frequent Urination</div>
                </label>

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
          </div>}

          {question === 3 && (
            <div className={styles.Question}>
              <h1>Which describes {persp} situation?</h1>
              <div className={styles.buttonContainer}>
                {page3.map((buttonData, index) => (
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

              <div className={styles.backSkipButtons} onClick={handleBackClick}>
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


          {question === 4 && (
            <div className={styles.Question}>
              <h1>Which describes {persp} situation?</h1>
              <div className={styles.buttonContainer}>
                {page4.map((buttonData, index) => (
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



              <div className={styles.inputButtonContainer}>
                <input
                  type="text"
                  name="othersInput"
                  value={othersInput}
                  onChange={handleOthersInputChange}
                  placeholder="Enter your option"
                />
                <button
                  onClick={() => {
                    handleIncrement();
                    nextPage(othersInput, question, 5);
                    setOthersInput("");
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {question === 5 && (
            <div className={styles.Question}>
              <h1>Which describes {persp} situation?</h1>
              <div className={styles.buttonContainer}>
                {page5.map((buttonData, index) => (
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

              <div>
                <input
                  type="text"
                  name="othersInput"
                  value={othersInput}
                  onChange={handleOthersInputChange}
                  placeholder="Enter your option"
                />
                <button
                  onClick={() => {
                    handleIncrement();
                    nextPage(othersInput, question, 6);
                    setOthersInput("")
                  }}
                >
                  Submit
                </button>
              </div>

              <div className={styles.backSkipButtons} onClick={handleBackClick}>
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

          {question === 6 && (
            <div className={styles.Question}>
              <h1>Which describes {persp} situation?</h1>
              <div className={styles.buttonContainer}>
                {page6.map((buttonData, index) => (
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

              <div>
                <input
                  type="text"
                  name="othersInput"
                  value={othersInput}
                  onChange={handleOthersInputChange}
                  placeholder="Enter your option"
                />
                <button
                  onClick={() => {
                    handleIncrement();
                    nextPage(othersInput, question, 10);
                    setOthersInput("")
                  }}
                >
                  Submit
                </button>
              </div>

              <div className={styles.backSkipButtons} onClick={handleBackClick}>
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

          {question === 7 && (
            <div className={styles.Question}>
              <h1>Which describes {persp} situation?</h1>
              <div className={styles.buttonContainer}>
                {page7.map((buttonData, index) => (
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
              <div>
                <input
                  type="text"
                  name="othersInput"
                  value={othersInput}
                  onChange={handleOthersInputChange}
                  placeholder="Enter your option"
                />
                <button
                  onClick={() => {
                    handleIncrement();
                    nextPage(othersInput, question, 8);
                    setOthersInput("")
                  }}
                >
                  Submit
                </button>
              </div>

              <div className={styles.backSkipButtons} onClick={handleBackClick}>
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

          {question === 8 && (
            <div className={styles.Question}>
              <h1>Which describes {persp} situation?</h1>
              <div className={styles.buttonContainer}>
                {page8.map((buttonData, index) => (
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

              <div>
                <input
                  type="text"
                  name="othersInput"
                  value={othersInput}
                  onChange={handleOthersInputChange}
                  placeholder="Enter your option"
                />
                <button
                  onClick={() => {
                    handleIncrement();
                    nextPage(othersInput, question, 10);
                    setOthersInput("")
                  }}
                >
                  Submit
                </button>
              </div>

              <div className={styles.backSkipButtons} onClick={handleBackClick}>
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

          {question === 9 && (
            <div className={styles.Question}>
              <h1>Which describes {persp} situation?</h1>
              <div className={styles.buttonContainer}>
                {page9.map((buttonData, index) => (
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

              <div>
                <input
                  type="text"
                  name="othersInput"
                  value={othersInput}
                  onChange={handleOthersInputChange}
                  placeholder="Enter your option"
                />
                <button
                  onClick={() => {
                    handleIncrement();
                    nextPage(othersInput, question, 17);
                    setOthersInput("")
                  }}
                >
                  Submit
                </button>
              </div>

              <div className={styles.backSkipButtons} onClick={handleBackClick}>
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

          {question === 10 && (

            // <TellUsMore updateUserData={updateUserDataTellusMore} nextPage={nextPage} />

            <div className={styles.tellusmore}>
              <h1>Tell us more!</h1>
              <form>
                <p className={styles.labelLeftAlign}>
                  <label htmlFor="anonymous" className={styles.labelLeftAlign}>Would you like to remain anonymous?</label>
                  <input type="checkbox" id="anonymous" name="anonymous" onChange={handleChange} />
                </p >
                <p className={styles.labelLeftAlign}>
                  <label htmlFor="name" className={styles.labelLeftAlign}>What is your name?</label>
                  <input className={styles.ghfield} type="text" id="name" name="name" onChange={handleChange} />
                </p>
                <p className={styles.labelLeftAlign}>
                  <label htmlFor="age" className={styles.labelLeftAlign}>What is your age?</label>
                  <input className={styles.ghfield} type="number" id="age" name="age" onChange={handleChange} />
                </p>
                <p className={styles.labelLeftAlign}>
                  <label htmlFor="number" className={styles.labelLeftAlign}>Your contact number (optional for emergency purposes only)</label>
                  <input className={styles.ghfield} type="text" id="number" name="number" onChange={handleChange} />
                </p>

                <p className={styles.labelLeftAlign}>
                  <label htmlFor="stage_of_life" className={styles.labelLeftAlign}>What stage of life are you in (ie. student)</label>
                  <select className={styles.labelLeftAlignField} id="stage_of_life" name="stage_of_life" onChange={handleChange}>
                    <option value="Student_Primary_School">Student (Primary School)</option>
                    <option value="Student_Secondary_School">Student (Secondary School)</option>
                    <option value="Student_Polytechnic">Student (Polytechnic)</option>
                    <option value="Student_Junior_College">Student (Junior College/Similar)</option>
                    <option value="Unemployed">Unemployed</option>
                    <option value="Working_Full_Time">Working Full-Time</option>
                    <option value="Working_Part_Time">Working Part-Time</option>
                    <option value="Searching_for_Job">Searching for job</option>
                    <option value="Foreign_Worker">Foreign worker</option>
                  </select>
                </p>

                <input className={styles.submit} type="submit" value="Submit" onClick={handleSubmit} />
              </form>
            </div>


          )}

          {question === 15 && (

            <TellUsMoreAssociate updateUserData={updateUserDataTellusMoreAssociate} nextPage={nextPage} />



          )}

          {question === 11 && (
            <div className={styles.Question}>
              <h1>Which describes your situation?</h1>
              <div className={styles.buttonContainer}>
                {page10.map((buttonData, index) => (
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

              <div className={styles.backSkipButtons} onClick={handleBackClick}>
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

          {question === 16 && (
            <div className={styles.Question}>
              <h1>Which describes {persp} situation?</h1>
              <div className={styles.buttonContainer}>
                {page16.map((buttonData, index) => (
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

              <div className={styles.backSkipButtons} onClick={handleBackClick}>
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


          {question === 17 && (
            <div className={styles.Question}>
              <h1>Tell us more about yourself?</h1>

              <form onSubmit={handleSubmitQuestionnaire2}>
                <div className={styles.formElement}>
                  <label htmlFor="week" className={`${styles.label} ${styles.lastQuestion}`}>
                    Which week of pregnancy are you in? (if applicable):
                  </label>

                </div>
                <div className={styles.inputAlignLeft}>
                  <input
                    className={`${styles.roundedBorder} ${styles.fieldWidth}`}
                    type="number"
                    id="week"
                    name="week"
                    onChange={handleInputChange}
                    min="1"
                    max="40"
                  />
                </div>
                <br /><br />
                <label className={styles.tum_question} htmlFor="additionalInfo">Is there anything else you would like us to know?</label>
                <br />
                <textarea id="additionalInfo" onChange={handleInputChange} className={`${styles.textField} ${styles.roundedBorder}`} name="additionalInfo" placeholder="Add additional information here" rows="15" cols="32"></textarea>
                <br /><br />
                <input className={styles.submit} type="submit" value="Submit" />
              </form>

            </div>
          )}




        </div>
      )}
    </div>
  );
}

export default App;