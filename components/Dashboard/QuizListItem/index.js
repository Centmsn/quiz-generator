import styles from "./index.module.scss";

import copy from "copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrash,
  faLink,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";

import Button from "components/Button";

const QuizListItem = ({ title, _id, isPublic = false, deleteQuiz, index }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [quizLink, setQuizLink] = useState("");

  useEffect(() => {
    setQuizLink(`${window.location.origin}/Quiz/${_id}`);
  }, []);

  const handleCopyLink = () => {
    copy(quizLink);

    setIsTooltipVisible(true);

    setTimeout(() => {
      setIsTooltipVisible(false);
    }, 2000);
  };

  return (
    <div className={styles.container} key={_id}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.link}>{quizLink}</p>

      {isTooltipVisible && (
        <div
          className={[styles.tooltip, styles.tooltipGreen].join(" ")}
          style={{ right: "-1%" }}
        >
          <FontAwesomeIcon icon={faCheck} />
        </div>
      )}

      <div
        className={[styles.tooltip, styles.tooltipBlue].join(" ")}
        style={{ left: "-1%" }}
      >
        {index}
      </div>

      {isPublic && (
        <div
          className={[styles.tooltip, styles.tooltipYellow].join(" ")}
          style={{ left: "8%", width: "10%", cursor: "default" }}
          title="This quiz is visible to other players"
        >
          Public
        </div>
      )}

      <div className={styles.settings}>
        <Link href={`/Quiz/${_id}`}>
          <a>
            <Button size="small">
              Play <FontAwesomeIcon icon={faPlay} />
            </Button>
          </a>
        </Link>
        <Button size="small" onClick={handleCopyLink}>
          Copy link <FontAwesomeIcon icon={faLink} />
        </Button>

        <Button danger size="small" onClick={() => deleteQuiz(_id)}>
          Delete <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    </div>
  );
};

export default QuizListItem;
