import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
// import Modal from "./Modal";
function App() {
  const {
    loading,
    questions,
    index,
    handleNextQuestion,
    correctAnswerTotal,
    checkCorrectQuestion,
    questionTotal,
    isModalOpen,
    waiting,
    restartQuiz
  } = useGlobalContext();

  console.log(questions);

  // const {question} = questions[0]


  if (loading) {
    return <Loading />;
  }
  if (waiting) {
  return <SetupForm />
  }

  const {question, correct_answer, incorrect_answers } = questions[index]
  console.log(question);

// Generate RandomNumber from 0 to 3 to add the the totalOptions Array
  let randomNumber = Math.floor(Math.random() * 4)
  console.log(randomNumber)
  let totalOptions = [...incorrect_answers]
  // Add the correct answer randomly
  totalOptions.splice(randomNumber, 0, correct_answer)
  console.log(totalOptions)

  return (
    <main>
      (
        <div className={`${isModalOpen ? "modal-container isOpen" : "modal-container"}`}>
          <div className="modal-content">
            <h2>congrats</h2>
            <p>You answered {((correctAnswerTotal/questionTotal) * 100).toFixed(0)}% of questions correctly</p>
            <button className="close-btn" onClick={() => {
              restartQuiz()
            }}>Play Again</button>
          </div>
        </div>
        <section className="quiz">
          <p className="correct-answers">correct answers: {correctAnswerTotal} / {questionTotal}</p>
          <article className="container">
            <h2 dangerouslySetInnerHTML={{__html:question}} />
            <div className="btn-container">

              {
                totalOptions.map((option, index) => {
                  return (
                    <button className="answer-btn" key={index} onClick={() => checkCorrectQuestion(option, correct_answer)}>{option}</button>
                  )
                })
              }
            </div>
          </article>
          <button className="next-question" onClick={() => {
            handleNextQuestion(index)
          }}>next question</button>
        </section>
      )
    </main>
  );
}

export default App;
