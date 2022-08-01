import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, handleQuizChange, startQuiz } = useGlobalContext();
  return (
    <section className="quiz quiz-small">
      <form className="setup-form">
        <h2>quiz setup</h2>
        <div className="form-control">
          <label htmlFor="amount">number of questions</label>
          <input
            type="number"
            name="amount"
            id="amount"
            min={1}
            max={50}
            className="form-input"
            value={quiz.amount}
            onChange={(e) => {
              handleQuizChange(e.target.name, e.target.value);
            }}
          />
        </div>
        <div className="form-control">
          <label htmlFor="category">category</label>
          <select
            name="category"
            id="category"
            className="form-input"
            value={quiz.category}
            onChange={(e) => {
              handleQuizChange(e.target.name, e.target.value);
            }}
          >
            <option value="sports">sports</option>
            <option value="history">history</option>
            <option value="politics">politics</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="difficulty">select difficulty</label>
          <select
            name="difficulty"
            id="difficulty"
            className="form-input"
            value={quiz.difficulty}
            onChange={(e) => {
              handleQuizChange(e.target.name, e.target.value);
            }}
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>
        <button className="submit-btn" type="submit" onClick={startQuiz}>
          start
        </button>
      </form>
    </section>
  );
};

export default SetupForm;
