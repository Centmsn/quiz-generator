import styles from "./index.module.scss";

import gsap from "gsap";
import { useRef, useState } from "react";

import Button from "components/Button";
import Checkbox from "components/Checkbox";
import QuizTimeForm from "components/NewQuiz/QuizTimeForm";
import { useThrottle } from "hooks/useThrottle";

const QuizNameForm = ({ closeModal, addQuiz, isPublic, toggleIsPublic }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timeFormVisibility, setTimeFormVisibility] = useState(false);
  const [name, setName] = useState("");
  const { throttle } = useThrottle();
  const backdropRef = useRef(null);
  const nameFormRef = useRef(null);
  const timeFormRef = useRef(null);

  const handleCloseModal = e => {
    if (e.target !== backdropRef.current) return;
    closeModal();
  };

  const handleAddQuiz = () => {
    setIsButtonDisabled(true);
    addQuiz(name);
  };

  const handleSetPublic = () => {
    toggleIsPublic();
  };

  const handleTimeFormVisibility = throttle(() => {
    // display time control form
    setTimeout(
      () => {
        setTimeFormVisibility(prev => !prev);
      },
      timeFormVisibility ? 350 : 0
    );

    if (!timeFormVisibility) {
      // display form
      gsap.to(nameFormRef.current, { y: "-90%" });
      setTimeout(() => {
        gsap.to(timeFormRef.current, { y: "-50%" });
      }, 350);
      return;
    }

    // remove form from the screen
    gsap.to(timeFormRef.current, { y: "100%" });
    gsap.to(nameFormRef.current, { y: 0, delay: 0.35 });
  }, 400);

  const handleNameChange = e => {
    setName(e.target.value);
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleCloseModal}
      ref={backdropRef}
    >
      <div className={styles.container} ref={nameFormRef}>
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

        <Checkbox
          label="Quiz is visible to other players"
          onClick={handleSetPublic}
          isChecked={isPublic}
        />

        <Checkbox
          label="Add time limit"
          onClick={handleTimeFormVisibility}
          isChecked={timeFormVisibility}
        />
      </div>

      {timeFormVisibility && (
        <div className={styles.timeFormContainer} ref={timeFormRef}>
          <QuizTimeForm />
        </div>
      )}
    </div>
  );
};

export default QuizNameForm;
