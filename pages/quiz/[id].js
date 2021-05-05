import styles from "./index.module.scss";

import mongoose from "mongoose";
import { useRouter } from "next/router";
import { useState, useContext, useEffect, useRef, useMemo } from "react";

import { LETTER_ENUM } from "consts";
import QuizModel from "models/quiz";
import GameContext from "context/GameContext";

const Quiz = ({ quiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [time, setTime] = useState(null);
  const router = useRouter();
  const parsed = JSON.parse(quiz);
  const { addScore, setSummary } = useContext(GameContext);

  const timeBarRef = useRef(null);

  useEffect(() => {
    const { limit, limitType } = parsed.timeLimit;
    let id;
    // if timelimit is set
    if (limit) {
      // clear previous interval and start new one for each question
      if (limitType === "question" && intervalId) {
        clearInterval(intervalId);
      }

      // do not stop interval if limitType is set to quiz
      if (limitType === "quiz" && intervalId) return;

      setTime(limit);
      id = setInterval(() => {
        setTime(prev => prev - 1);
      }, 1000);

      setIntervalId(id);
    }
  }, [currentQuestion]);

  useEffect(() => {
    const { limitType } = parsed.timeLimit;

    // if time runs out
    if (time === 0) {
      // stop interval
      clearInterval(intervalId);

      // if time limit is assigned to quiz
      if (limitType === "quiz") {
        // get all remaining questions - current question is included
        const remainingQuestions = parsed.questions.slice(currentQuestion);

        // call setSummary for each remaining question
        remainingQuestions.forEach(question => {
          setSummary(
            question.answers[question.correct],
            null,
            question.question,
            false
          );
        });

        // ! repeated code
        // redirect user to quiz summary
        router.replace({
          pathname: "/Summary",
          query: {
            id: router.query.id,
            length: parsed.questions.length,
          },
        });

        return;
      }

      // if time limit is assigned to question

      handleUserAnswer(null);
    }
  }, [time]);

  const handleUserAnswer = index => {
    const { questions } = parsed;

    const quizLength = questions.length;
    const questionObject = questions[currentQuestion];

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
      //clear time interval
      clearInterval(intervalId);

      // quiz length and quiz id are passed as query params
      router.replace({
        pathname: "/Summary",
        query: {
          id: router.query.id,
          length: questions.length,
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

  const currentLength =
    (parsed.timeLimit.limit - (parsed.timeLimit.limit - time)) /
    parsed.timeLimit.limit;

  return (
    <div className={styles.container}>
      {/*do not show timeBar if time limit is not enabled */}
      {!!parsed.timeLimit.limit && (
        <div
          className={styles.timeBar}
          ref={timeBarRef}
          style={{ transform: `scaleX(${currentLength})` }}
        ></div>
      )}

      <div className={styles.questionContainer}>
        {parsed.questions[currentQuestion].question}
      </div>

      <div className={styles.tooltip}>
        <span>Question number: {currentQuestion + 1}</span>
        <span>Quiz length: {parsed.questions.length}</span>
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
