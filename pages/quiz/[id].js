import styles from "./index.module.scss";

import mongoose from "mongoose";
import { useRouter } from "next/router";
import { useState } from "react";

import QuizModel from "../../models/quiz";

const Quiz = ({ quiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const router = useRouter();

  const parsed = JSON.parse(quiz);
  return (
    <div>
      <div>{parsed.questions[currentQuestion].question}</div>
      <button>{parsed.questions[currentQuestion].answers[0]}</button>
      <button>{parsed.questions[currentQuestion].answers[1]}</button>
      <button>{parsed.questions[currentQuestion].answers[2]}</button>
      <button>{parsed.questions[currentQuestion].answers[3]}</button>
    </div>
  );
};

export const getServerSideProps = async context => {
  await mongoose.connect(process.env.DB_URI);

  const currentQuiz = await QuizModel.findById(context.params.id);

  return {
    props: {
      quiz: JSON.stringify(currentQuiz),
    },
  };
};

export default Quiz;
