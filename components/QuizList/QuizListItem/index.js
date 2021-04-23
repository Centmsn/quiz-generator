import styles from "./index.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import Button from "../../Button";

const QuizListItem = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Quiz title</h3>

      <div className={styles.settings}>
        <Button size="small">
          Play <FontAwesomeIcon icon={faPlay} />
        </Button>
        <Button size="small">
          Get link <FontAwesomeIcon icon={faLink} />
        </Button>
        <Button danger size="small">
          Delete <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    </div>
  );
};

export default QuizListItem;
