import styles from "./index.module.scss";

import Button from "../Button";
import { useRef } from "react";

const QuizNameForm = ({ closeModal, addQuiz }) => {
  const backdropRef = useRef(null);

  const handleCloseModal = e => {
    if (e.target !== backdropRef.current) return;
    closeModal();
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleCloseModal}
      ref={backdropRef}
    >
      <div className={styles.container}>
        <h1 className={styles.title}>Enter quiz name</h1>
        <input className={styles.input} />
        <Button important onClick={addQuiz}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default QuizNameForm;
