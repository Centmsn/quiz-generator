import styles from "./index.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import Button from "../../Button";

const QuizListItem = ({ title, _id }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.settings}>
        <Link href={`/quiz/${_id}`}>
          <a>
            <Button size="small">
              Play <FontAwesomeIcon icon={faPlay} />
            </Button>
          </a>
        </Link>
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
