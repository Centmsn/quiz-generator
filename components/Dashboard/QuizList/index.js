import styles from "./index.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSurprise } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState, useEffect } from "react";

import Button from "components/Button";
import Container from "components/Dashboard/Container";
import QuizListItem from "../QuizListItem";
import Spinner from "components/Spinner";
import PopUp from "components/PopUp";
import { useHttpRequest } from "hooks/useHttpRequest";

const QuizList = ({ list }) => {
  const { loading, sendRequest, error, clearError } = useHttpRequest();
  const [localQuizList, setLocalQuizList] = useState([]);

  useEffect(() => {
    setLocalQuizList(list);
  }, []);

  const handleQuizDelete = async id => {
    const response = await sendRequest(`/api/deletequiz/${id}`, "DELETE");

    if (!response) {
      return;
    }

    // update local quiz list to avoid fetching data again
    const newList = localQuizList.filter(el => el._id !== id);
    setLocalQuizList(newList);
  };

  const renderList = () => {
    const quizList = [];

    localQuizList.forEach((listItem, index) => {
      quizList.push(
        <QuizListItem
          {...listItem}
          deleteQuiz={handleQuizDelete}
          key={index}
          index={index + 1}
        />
      );
    });

    if (!quizList.length) {
      return (
        <div className={styles.tooltip}>
          <h3>Your list is empty</h3>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faSurprise} />
          </span>

          <Link href="/Dashboard/newquiz">
            <a>
              <Button fontSize="large">Let's create a quiz!</Button>
            </a>
          </Link>
        </div>
      );
    }

    return quizList;
  };

  return (
    <Container title="Quiz list" light>
      {loading && <Spinner overlay />}

      {error && (
        <PopUp onClose={clearError} error>
          Uuppsss... Something went wrong. Quiz was not deleted, please try
          again later.
        </PopUp>
      )}
      <div className={styles.quizList}>{renderList()}</div>
    </Container>
  );
};

export default QuizList;
