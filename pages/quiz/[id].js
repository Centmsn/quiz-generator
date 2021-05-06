import styles from "./index.module.scss";

import mongoose from "mongoose";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { useState, useContext, useEffect, useRef } from "react";

import { LETTER_ENUM } from "consts";
import GameContext from "context/GameContext";
import UsernameForm from "components/UsernameForm";
import { connectToDb } from "utils/connectToDb";

const Quiz = ({ quiz, quizOwner }) => {
  const [currentQuestion, setCurrentQuestion] = useState(quizOwner ? 0 : null);
  const [intervalId, setIntervalId] = useState(null);
  const [time, setTime] = useState(null);
  const router = useRouter();
  const parsed = JSON.parse(quiz);
  const {
    addScore,
    setSummary,
    username,
    setUsername,
    resetStore,
  } = useContext(GameContext);

  const timeBarRef = useRef(null);

  // reset game context when the component is mounted
  useEffect(() => {
    resetStore();
  }, []);

  // handle timer interval after question has changed
  useEffect(() => {
    const { limit, limitType } = parsed.timeLimit;
    let id;

    // if timelimit is set
    if ((limit && username) || (limit && quizOwner)) {
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

  //checks if time > 0
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
      // set user answer to null
      handleUserAnswer(null);
    }
  }, [time]);

  // triggered when username is submitted
  const handleStartQuiz = value => {
    setUsername(value);
    setCurrentQuestion(0);
  };

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
            {parsed.questions[currentQuestion || 0].answers[i]}
          </span>
        </button>
      );
    }

    return answers;
  };

  const currentLength =
    (parsed.timeLimit.limit - (parsed.timeLimit.limit - time)) /
    parsed.timeLimit.limit;
  const minutesLeft = Math.floor(time / 60);
  const secondsLeft = time % 60;
  const currentTime = `Time left: ${minutesLeft}
  ${minutesLeft === 1 ? "minute" : "minutes"} ${secondsLeft}
  ${secondsLeft === 1 ? "second" : "seconds"}
`;
  return (
    <>
      {!username && !quizOwner && <UsernameForm startQuiz={handleStartQuiz} />}

      <div
        className={styles.container}
        style={{ filter: username || quizOwner ? "" : "blur(5px)" }}
      >
        {/*do not show timeBar if time limit is not enabled */}
        {!!parsed.timeLimit.limit && (
          <div className={styles.timeBarContainer}>
            <div
              className={styles.timeBar}
              ref={timeBarRef}
              style={{ transform: `scaleX(${currentLength})` }}
            ></div>
          </div>
        )}

        <div className={styles.questionContainer}>
          {/* initial value is null */}
          {parsed.questions[currentQuestion || 0].question}
        </div>

        <div className={styles.tooltip}>
          <span className={styles.info}>
            Question number: {currentQuestion + 1}
          </span>
          {!!parsed.timeLimit.limit && (
            <span className={[styles.info, styles.infoSmall].join(" ")}>
              {currentTime}
            </span>
          )}
          <span className={styles.info}>
            Quiz length: {parsed.questions.length}
          </span>
        </div>

        <div className={styles.answerContainer}>{renderAnswers()}</div>
      </div>
    </>
  );
};

export const getServerSideProps = connectToDb(async context => {
  const session = await getSession({ req: context.req });
  const User = mongoose.model("user");
  const Quiz = mongoose.model("quiz");

  const { id } = context.params;

  // return if id is not a valid type
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return {
      props: {
        quiz: JSON.stringify([]),
      },
    };
  }

  //! add error handling
  const currentQuiz = await Quiz.findById(id);

  let quizOwner;
  if (session) {
    const quizCreator = await User.findOne({ quizes: currentQuiz._id });
    quizOwner = quizCreator.email === session.user.email;
  }

  return {
    props: {
      quiz: JSON.stringify(currentQuiz),
      quizOwner: quizOwner || false,
    },
  };
});

export default Quiz;
