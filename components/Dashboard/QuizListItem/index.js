import styles from "./index.module.scss";

import copy from "copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrash,
  faLink,
  faPlay,
  faTimes,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";

import Button from "components/Button";

const QuizListItem = ({ title, _id, isPublic, stats, deleteQuiz, index }) => {
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [quizLink, setQuizLink] = useState("");

  useEffect(() => {
    setQuizLink(`${window.location.origin}/Quiz/${_id}`);
  }, []);

  const handleToggleConfirm = () => {
    setShowConfirmButton(prev => !prev);
  };

  const handleCopyLink = () => {
    copy(quizLink);

    setIsTooltipVisible(true);

    setTimeout(() => {
      setIsTooltipVisible(false);
    }, 2000);
  };

  return (
    <div className={styles.container} key={_id}>
      {/* quiz index */}
      <div
        className={[styles.tooltip, styles.tooltipBlue].join(" ")}
        style={{ left: "-1%" }}
        title="Quiz number"
      >
        {index}
      </div>

      {/* information if quiz is public */}
      {isPublic && (
        <div
          className={[styles.tooltip, styles.tooltipYellow].join(" ")}
          style={{ left: "8%" }}
          title="This quiz is visible to other players"
        >
          Public
        </div>
      )}

      {/* quiz name */}
      <h3
        className={[styles.tooltip, styles.title, styles.tooltipBlue].join(" ")}
        title="Quiz name"
      >
        {title}
      </h3>

      {/* feedback after link is copied */}
      {isTooltipVisible && (
        <div
          className={[styles.tooltip, styles.tooltipGreen].join(" ")}
          style={{ right: "-1%" }}
        >
          <FontAwesomeIcon icon={faCheck} />
        </div>
      )}

      {/* quiz stats - link, solved average result */}
      <div className={styles.info}>
        <p className={styles.text}>{quizLink}</p>
        <p className={styles.text}>
          Solved: <strong>{stats.solved}</strong> times
        </p>
        <p className={styles.text}>
          Average result: <strong>{stats.average}%</strong>
        </p>
      </div>

      {/* buttons container */}
      <div className={styles.settings}>
        <Link href={`/Quiz/${_id}`}>
          <a>
            <Button size="small" style="primary">
              Play <FontAwesomeIcon icon={faPlay} />
            </Button>
          </a>
        </Link>

        <Link href={`/Dashboard/newquiz?id=${_id}`}>
          <a>
            <Button size="small">
              Edit <FontAwesomeIcon icon={faEdit} />
            </Button>
          </a>
        </Link>

        <Button size="small" onClick={handleCopyLink}>
          Copy link <FontAwesomeIcon icon={faLink} />
        </Button>

        {showConfirmButton ? (
          <>
            <Button
              size="xsmall"
              onClick={() => deleteQuiz(_id)}
              style="confirm"
            >
              <FontAwesomeIcon icon={faCheck} /> Confirm
            </Button>
            <Button onClick={handleToggleConfirm} size="xsmall" style="danger">
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </Button>
          </>
        ) : (
          <Button style="danger" size="small" onClick={handleToggleConfirm}>
            Delete <FontAwesomeIcon icon={faTrash} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizListItem;
