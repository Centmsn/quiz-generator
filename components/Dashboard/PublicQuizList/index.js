import styles from "./index.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faRedo } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import Container from "components/Dashboard/Container";
import Button from "components/Button";

const PublicQuizList = ({ publicQuizList }) => {
  const rendersPublicQuizes = () => {
    return publicQuizList.map(
      ({ title, _id, stats: { solved, average } }, index) => {
        const averageResult = solved > 0 ? `${average}%` : "N/A";

        return (
          <div className={styles.listItem} key={index}>
            <h3
              className={[styles.listItemTitle, styles.listItemElement].join(
                " "
              )}
            >
              {title}
            </h3>
            <p className={styles.listItemElement}>
              Solved: <strong>{solved}</strong> times
            </p>
            <p
              className={[
                styles.listItemElement,
                styles.listItemElementImportant,
              ].join(" ")}
            >
              Average result: <strong>{averageResult}</strong>
            </p>
            <Link href={`/Quiz/${_id}`}>
              <a>
                <Button size="large">
                  Play <FontAwesomeIcon icon={faPlay} />
                </Button>
              </a>
            </Link>
          </div>
        );
      }
    );
  };

  return (
    <Container title="Public quizes" light>
      <div className={styles.tooltip}>
        <div>
          <p>Here You can find randomly selected public quizes.</p>
          <p>Mark Your quiz as public so other users can play it!</p>
        </div>
        <Button size="small" style="primary">
          <FontAwesomeIcon icon={faRedo} /> Refresh
        </Button>
      </div>
      <div className={styles.list}>{rendersPublicQuizes()}</div>
    </Container>
  );
};

export default PublicQuizList;
