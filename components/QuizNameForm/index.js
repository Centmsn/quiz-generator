import styles from "./index.module.scss";

import Button from "components/Button";
import { useRef, useState } from "react";

const QuizNameForm = ({ closeModal, addQuiz }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const backdropRef = useRef(null);

  const handleCloseModal = e => {
    if (e.target !== backdropRef.current) return;
    closeModal();
  };

  const handleAddQuiz = () => {
    setIsButtonDisabled(true);
    addQuiz(name);
  };

  const handleNameChange = e => {
    setName(e.target.value);
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleCloseModal}
      ref={backdropRef}
    >
      <div className={styles.container}>
        <h1 className={styles.title}>Enter quiz name</h1>
        <input
          className={styles.input}
          value={name}
          onChange={handleNameChange}
          maxLength="25"
        />
        <Button
          important
          onClick={handleAddQuiz}
          disabled={!name || isButtonDisabled}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default QuizNameForm;
