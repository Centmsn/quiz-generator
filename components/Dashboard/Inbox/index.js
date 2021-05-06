import styles from "./index.module.scss";

import mongoose from "mongoose";
import { useEffect } from "react";

import { connectToDb } from "utils/connectToDb";
import Container from "components/Dashboard/Container";

const Inbox = ({ messages }) => {
  const parsedMessaged = JSON.parse(messages);

  const renderMessages = () => {
    return parsedMessaged.map(({ username, result, quizName }, index) => (
      <div key={index}>
        <p>{username}</p>
        <p>{quizName}</p>
        <p>Result: {result}</p>
      </div>
    ));
  };

  return <Container title="Inbox">{renderMessages()}</Container>;
};

export default Inbox;
