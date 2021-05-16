import styles from "./index.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import Container from "components/Dashboard/Container";
import Button from "components/Button";

const PublicQuizList = ({ publicQuizList }) => {
  const rendersPublicQuizes = () => {
    return publicQuizList.map((quiz, index) => (
      <div className={styles.listItem} key={index}>
        <h3 className={styles.listItemTitle}>{quiz.title}</h3>
        <Link href={`/Quiz/${quiz._id}`}>
          <a>
            <Button size="large">
              Play <FontAwesomeIcon icon={faPlay} />
            </Button>
          </a>
        </Link>
      </div>
    ));
  };

  return (
    <Container title="Public quizes" light>
      <div className={styles.tooltip}>
        <p>Here You can find randomly selected public quizes.</p>
        <p>Mark Your quiz as public so other users can play it!</p>
      </div>
      <div className={styles.list}>{rendersPublicQuizes()}</div>
    </Container>
  );
};

export default PublicQuizList;
