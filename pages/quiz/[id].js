import styles from "./index.module.scss";

import mongoose from "mongoose";
import { useRouter } from "next/router";
import { useState, useContext } from "react";

import { LETTER_ENUM } from "../../consts";
import QuizModel from "../../models/quiz";
import GameContext from "../../context/GameContext";

const Quiz = ({ quiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const router = useRouter();
  const parsed = JSON.parse(quiz);
  const { addScore, setSummary } = useContext(GameContext);

  const handleUserAnswer = index => {
    const quizLength = parsed.questions.length;
    const questionObject = parsed.questions[currentQuestion];

    //add user answer, correct answer, question and bool if user answer is correct to quiz summary
    const { answers } = questionObject;
    setSummary(
      answers[questionObject.correct],
      answers[index],
      questionObject.question,
      index === questionObject.correct
    );

    // add score if answer is correct
    if (index === questionObject.correct) {
      addScore();
    }

    // display next question or show quiz summary
    if (currentQuestion + 1 > quizLength - 1) {
      // quiz length and quiz id are passed as query params
      router.replace({
        pathname: "/Summary",
        query: {
          id: router.query.id,
          length: parsed.questions.length,
        },
      });
      return;
    }

    // increment current question index
    setCurrentQuestion(prev => prev + 1);
  };

  const renderAnswers = () => {
    const answers = [];
    for (let i = 0; i < 4; i++) {
      answers.push(
        <button className={styles.answer} onClick={() => handleUserAnswer(i)}>
          <span className={styles.answerNumber}>{LETTER_ENUM[i]}</span>
          <span className={styles.answerContent}>
            {parsed.questions[currentQuestion].answers[i]}
          </span>
        </button>
      );
    }

    return answers;
  };

  return (
    <div className={styles.container}>
      <div className={styles.tooltip}>
        <h3>
          Question {currentQuestion + 1} of {parsed.questions.length}
        </h3>
      </div>

      <div className={styles.questionContainer}>
        {parsed.questions[currentQuestion].question}
      </div>

      <div className={styles.answerContainer}>{renderAnswers()}</div>
    </div>
  );
};

export const getServerSideProps = async context => {
  await mongoose.connect(process.env.DB_URI);
  const { id } = context.params;

  // return if id is not a valid type
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return {
      props: {
        quiz: JSON.stringify([]),
      },
    };
  }

  const currentQuiz = await QuizModel.findById(id);

  return {
    props: {
      quiz: JSON.stringify(currentQuiz),
    },
  };
};

export default Quiz;
