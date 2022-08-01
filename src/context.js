import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url =
  `"https://opentdb.com/api.php?amount=2&category=21&difficulty=medium&type=multiple"`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [questions, setQuestions] = useState([
    {
      question: "",
      correct_answer: "",
      incorrect_answers: "",
    },
  ]);

  const [index, setIndex] = useState(0);

  const [correctAnswerTotal, setCorrectAnswerTotal] = useState(0);
  const [questionTotal, setQuestionTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reloadQuiz, setReloadQuiz] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const response = await axios(`https://opentdb.com/api.php?amount=${quiz.amount}&category=${table[quiz.category]}&difficulty=${quiz.difficulty}&type=multiple`);
                                                                
      const data = response.data.results;
      setQuestions(data);
      console.log(data[0].question);
      // console.log(questions);

      setCorrectAnswerTotal(0);
      setQuestionTotal(1);
      setLoading(false);
      // setWaiting(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const restartQuiz = () => {
    setWaiting(true)
    setReloadQuiz(!reloadQuiz);
  };
  const checkCorrectQuestion = (inputAnswer, actualAnswer) => {
    if (inputAnswer === actualAnswer) {
      setCorrectAnswerTotal((prev) => prev + 1);
    }
    console.log("check correct question");
    handleNextQuestion();
  };

  const handleNextQuestion = (inputIndex) => {
    setIndex((prev) => {
      if (prev === questions.length - 1) {
        setIsModalOpen(true);
        return 0;
      }
      setQuestionTotal(questionTotal + 1);

      return prev + 1;
    });
  };

  const handleQuizChange = (inputName, inputValue) => {
    setQuiz((prev) => {
      return {
        ...prev,
        [inputName]: inputValue,
      };
    });

  };

  const startQuiz = () => {
    setWaiting(false)
    fetchQuestion();
    setReloadQuiz(!reloadQuiz)
  }

  useEffect(() => {

    setIsModalOpen(false);
  }, [reloadQuiz]);

  return (
    <AppContext.Provider
      value={{
        questions,
        index,
        correctAnswerTotal,
        questionTotal,
        loading,
        waiting,
        handleNextQuestion,
        checkCorrectQuestion,
        isModalOpen,
        restartQuiz,
        quiz,
        handleQuizChange,
        startQuiz
        // property
        // question,
        // correct_answer,
        // incorrect_answers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
