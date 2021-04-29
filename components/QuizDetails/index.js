import styles from "./index.module.scss";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const QuizDetails = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.to(containerRef.current, { delay: 0.5, y: 0 });
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      Quiz details
    </div>
  );
};

export default QuizDetails;
