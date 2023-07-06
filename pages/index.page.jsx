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



const BackSkipButtons = ({ handleBackClick, handleSkipClick }) => {
    return (
        <div className={styles.buttonContainer}>
            <button type="button" className={styles.button} onClick={handleBackClick}>
                Back
            </button>
            <button type="button" className={styles.button} onClick={handleSkipClick}>
                Skip
            </button>
        </div>
    );
};


const ProgressBar = ({ progress }) => {
  const outerBarStyle = {
      width: '100%',
      backgroundColor: '#E4E4E4',
      borderRadius: '15px',
      padding: '3px',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,.2)',
  };

  const innerBarStyle = {
      backgroundColor:'#BB6192',
      width: `${progress}%`, // width equals to the progress prop
      height: '20px',
      borderRadius: '10px',
  };

  return (
      <div style={outerBarStyle}>
          <div style={innerBarStyle} />
      </div>
  );
};




const RenderQuestionPage_SingleSelect = ({mainQuestion, options, onOptionSelected}) => {
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

  const router = useRouter();



  // Callback for when an option is selected
  const handleOptionSelected = (selectedOption, nextQuestionIndex) => {
    console.log(nextQuestionIndex)
    if (nextQuestionIndex === "articles") {
      
      router.push('/home');
      return; // return from the function after routing
    } else {
  
    setUserData(prevState => ({...prevState, [question]: selectedOption}));
    setUserPath(prevPath => [...prevPath, question]);
    setQuestion(nextQuestionIndex);}
  };

  const handleMultipleOptionSelected = (selectedOption) => {

    if (question == 2) {

      // Handle Logic for routing
   
      if (Object.keys(selectedOption).length > 3){
        setUserPath(prevPath => [...prevPath, question])
        setUserData(prevState => ({...prevState, [question]: selectedOption}));
        setQuestion(4)
        
      } else {
        setUserPath(prevPath => [...prevPath, question])
        setUserData(prevState => ({...prevState, [question]: selectedOption}));
        setQuestion(3)

      };

    }

    if (question==5) {
      setUserPath(prevPath => [...prevPath, question])
      setUserData(prevState => ({...prevState, [question]: selectedOption}));
      setQuestion(6)
    }



  };

  

  const handleBackClick = () => {
    let newPath = [...userPath]; 
    newPath.pop(); 
    setQuestion(userPath[userPath.length - 1]); 
    setUserPath(newPath); 
  };
  
  const handleSkipClick = () => {
    setUserData(prevState => ({...prevState, [question]: "skipped"}));
    setQuestion(skipData[question]);

  };

  const question1Dict = {
    'Yes, I confirmed it with a pregnancy test kit and it is positive': 5,
    'Yes, my doctor confirmed it': 5,
    'No': 2,
  };


  const question2Options = {
    "Symptom1": "Symptom1 Issues",
    "Symptom2": "Symptom2 Issues",
    "Symptom3": "Symptom3 Issues",
    "Symptom4": "Symptom4 Issues",
    "Symptom5": "Symptom5 Issues"
  }

  const question5Options = {
    "I believe my baby deserves a chance despite my circumstances":1,
    "I need to take care of myself first":2,
    "The pregnancy is a great problem":3,
    "I'm worried about what others may think of me":4,
    "I lack resources to keep the baby":5,
    "I want my problem to be resolved quickly":6
  }

  const question6Dict = {
    "I believe there's a life growing inside of me":7,
    "I believe it's just a mass of cells":7,

  }
  
  const question7Dict = {
    "I'm alone": 8,
    "I'm married": 11,
    "Others (not me, my girlfriend/wife/daughter is pregnant)": 18
  };
  
  const question8Dict = {
    "I'm unmarried": 9,
    "My husband is in prison. What are my options?": 21,
    "I’m a divorcee/widow. What are my options?": 21
  };
  
  const question9Dict = {
    "My parents don’t know": 10,
    "My parents are supportive of me having the baby. What are my options?": 21,
    "My parents want me to abort the baby but I want to keep it": 10,
    "The baby’s father is married but not to me and wants me to abort": "chat"
  };
  
  const question10Dict = {
    "My parents": "chat",
    "My school": "chat"
  };
  
  const question11Dict = {
    "I want to keep the baby": 12,
    "I want to abort the baby": 16
  };
  
  const question12Dict = {
    "I can’t afford. I need help with housing/legal/medical support, etc.": "chat",
    "I can’t care for the baby because of my poor health": 13,
    "I need to care for my aged parents/special needs children": 14,
    "I have a hectic job/chosen lifestyle": 15,
    "my husband is not supportive": "chat",
    "I have been told my unborn child has birth defects": "chat"
  };
  
  const question13Dict = {
    "Know more about adoption": "articles",
    "I need help to decide": "chat"
  };
  
  const question14Dict = {
    "Know more about fostering": "articles",
    "I need help to decide": "chat"
  };
  
  const question15Dict = {
    "Know more about childcare support": "articles",
    "I need help to decide": "chat"
  };
  
  const question16Dict = {
    "I don’t want children": 17,
    "My family is complete": 17,
    "I have a new job": 17
  };
  
  const question17Dict = {
    "Know more about abortion": "articles",
    "I need help to decide": "chat"
  };
  
  const question18Dict = {
    "She wants to keep the baby": 21,
    "She wants to abort the baby": 19
  };
  
  const question19Dict = {
    "She doesn’t want children": 20,
    "Her family is complete": 20,
    "She has a new job": 20
  };
  
  const question20Dict = {
    "Know more about abortion": "articles",
    "She needs help to decide": "chat"
  };
  
  const question21Dict = {
    "Parenting": 22,
    "Adoption": 25,
    "Fostering": 26
  };
  
  const question22Dict = {
    "Yes": 23,
    "No": 24
  };
  
  const question23Dict = {
    "How to prepare for parenthood": "articles",
    "What to expect during pregnancy, labour, and delivery": "articles",
    "What help is available?": "chat"
  };
  
  const question24Dict = {
    "Fostering": "articles",
    "Adoption": "articles",
    "I need help to decide": "chat"
  };
  
  const question25Dict = {
    "Know more about adoption": "articles",
    "I need help to decide": "chat"
  };
  
  const question26Dict = {
    "Know more about fostering": "articles",
    "I need help to decide": "chat"
  };

  // Define your options dictionaries somewhere in your component or another file
  const optionsDict = {
    9: question9Dict,
    10: question10Dict,
    11: question11Dict,
    12: question12Dict,
    13: question13Dict,
    14: question14Dict,
    15: question15Dict,
    16: question16Dict,
    17: question17Dict,
    18: question18Dict,
    19: question19Dict,
    20: question20Dict,
    21: question21Dict,
    22: question22Dict,
    23: question23Dict,
    24: question24Dict,
    25: question25Dict,
    26: question26Dict,
  };

  const questionsDict = {
    9:"I'm alone and..",
    10:"I need help for someone with..",
    11:"Do you want to keep the baby?",
    12:"I want to keep the baby but..",
    13:"You are advised to..",
    14:"You are advised to..",
    15:"You are advised to..",
    16:"I want to abort baby because..",
    17:"Are you sure you want to abort the baby?",
    18:"Does she want to keep the baby?",
    19:"She wants to abort the baby because..",
    20:"Is she sure she wants to abort the baby?",
    21:"Options on what to do with the baby",
    22:"Parenting",
    23:"More about Parenting",
    24:"Other options",
    25:"Adoption",
    26:"Fostering"
  }

  const progressDict = {
    9:50,
    10:50,
    11:50,
    12:50,
    13:50,
    14:50,
    15:50,
    16:50,
    17:50,
    18:50,
    19:75,
    20:75,
    21:75,
    22:75,
    23:75,
    24:75,
    25:75,
    26:75,
  }

  const skipData = {
    1:5,
    2:5,
    3:5,
    4:5,
    5:6,
    6:7,
    7:21,
    8:21,
    9:10,
    10:"chat",
    11:"chat",
    12:"chat",
    13:"chat",
    14:"chat",
    15:"chat",
    16:"chat",
    17:"chat",
    18:19,
    19:20,
    20:"chat",
    21:"chat",
    22:"chat",
    23:"chat",
    24:"chat",
    25:"chat",
    26:"chat",
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
                <ProgressBar progress={10} />

                <RenderQuestionPage_SingleSelect
                  mainQuestion={'Are you sure you are pregnant?'}
                  options={question1Dict}
                  onOptionSelected={handleOptionSelected}
                />
    

                       <button type="button" className={styles.button} onClick={handleSkipClick}>
                         Skip
                       </button>
              </div>
            
          )}

          {question === 2 && (
                       <div>
                        <ProgressBar progress={25} />

                       <RenderQuestionPage_MultiSelect
                         mainQuestion={'Do you have the following pregnancy symptoms?'}
                         options={question2Options}
                         onSubmit={handleMultipleOptionSelected}
                       />
         
                       <p>Current Question: {question}</p>
                       <BackSkipButtons handleBackClick={handleBackClick} handleSkipClick={handleSkipClick}/>
                     </div>
          )}



          {question === 5 && (
            <div>
              <ProgressBar progress={25} />

              <RenderQuestionPage_MultiSelect
                mainQuestion={'How do you feel?'}
                options={question5Options}
                onSubmit={handleMultipleOptionSelected}
              />

              <p>Current Question: {question}</p>
              <BackSkipButtons handleBackClick={handleBackClick} handleSkipClick={handleSkipClick}/>
            </div>
          )} 

          {question === 3 && (
            
                <div className = {styles.Start}>
                  <ProgressBar progress={25} />
  
                <h1>You might not be pregnant</h1>

                <button type="button" className={styles.button} onClick={handleBackClick}>
                         Back
                </button>
                <button type="button" className={styles.button} onClick={() => handleOptionSelected("next",5)}>
                         Next
                </button>

              </div>
              
            
          )}

          {question === 4 && (
                <div className={styles.start}>
                  <ProgressBar progress={25} />

                  <h1>You might be pregnant</h1>
               
                <div className={styles.buttonContainer}>
                  <button type="button" className={styles.button} onClick={handleBackClick}>
                          Back
                  </button>
                  <button type="button" className={styles.button} onClick={() => handleOptionSelected("next",5)}>
                          Next
                  </button>
                </div>

              </div>
              
            
          )}

          {question === 6 && (
                
                <div>
                <ProgressBar progress={25} />

                <RenderQuestionPage_SingleSelect
                  mainQuestion={'What is your thought on the baby'}
                  options={question6Dict}
                  onOptionSelected={handleOptionSelected}
                />
              

                <BackSkipButtons handleBackClick={handleBackClick} handleSkipClick={handleSkipClick}/>

                       
              </div>
            
          )}

          {question === 7 && (
                
                <div>
                <ProgressBar progress={25} />

                <RenderQuestionPage_SingleSelect
                  mainQuestion={'What is your marital status?'}
                  options={question7Dict}
                  onOptionSelected={handleOptionSelected}
                />
          

                <BackSkipButtons handleBackClick={handleBackClick} handleSkipClick={handleSkipClick}/>

                       
              </div>
            
          )}

          {question === 8 && (
                
                <div>
                <ProgressBar progress={25} />

                <RenderQuestionPage_SingleSelect
                  mainQuestion={"I'm alone and..."}
                  options={question8Dict}
                  onOptionSelected={handleOptionSelected}
                />
       

                <BackSkipButtons handleBackClick={handleBackClick} handleSkipClick={handleSkipClick}/>

                       
              </div>
            
          )}

          {Object.keys(optionsDict).map((questionKey) => {
            const currentQuestion = Number(questionKey);
            return question === currentQuestion && (
              <div key={`q${currentQuestion}`}>
                <ProgressBar progress={progressDict[currentQuestion]} />
                <RenderQuestionPage_SingleSelect
                  mainQuestion={questionsDict[currentQuestion]}
                  options={optionsDict[questionKey]}
                  onOptionSelected={handleOptionSelected}
                />
      
                <BackSkipButtons handleBackClick={handleBackClick} handleSkipClick={handleSkipClick} />
              </div>
            );
          })}

          



        </div>
      )}
    </div>
  );
}

export default App;