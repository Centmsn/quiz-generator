import styles from "./index.module.scss";

import gsap from "gsap";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

/**
 * Functional React component - renders loading spinner
 * @returns {JSX.Element}
 */
const Spinner = ({ text = "", overlay = false }) => {
  const spinnerRef = useRef(null);

  useEffect(() => {
    const boxes = spinnerRef.current.children;

    const tl = gsap.timeline({ defaults: { duration: 0.3 } });

    tl.to(boxes[0], { x: "4rem", y: "4rem" })
      .to(boxes[3], {
        x: "-4rem",
        y: "-4rem",
      })
      .to(boxes[1], { x: "-4rem", y: "4rem" })
      .to(boxes[2], { x: "4rem", y: "-4rem" })
      .to(boxes[0], { x: 0, y: 0 })
      .to(boxes[3], { x: 0, y: 0 })
      .to(boxes[2], { x: 0, y: 0 })
      .to(boxes[1], { x: 0, y: 0 });
    tl.repeat(-1);
  }, []);

  return (
    <>
      {overlay && <div className={styles.overlay}></div>}
      <div ref={spinnerRef} className={styles.spinner}>
        <div className={[styles.box, styles.box1].join(" ")}></div>
        <div className={[styles.box, styles.box2].join(" ")}></div>
        <div className={[styles.box, styles.box3].join(" ")}></div>
        <div className={[styles.box, styles.box4].join(" ")}></div>
      </div>

      {text && <p className={styles.tooltip}>{text}</p>}
    </>
  );
};

Spinner.propTypes = {
  /**
   * Text wich is display below the spinner
   */
  text: PropTypes.string,

  /**
   * Overylay
   */
  overlay: PropTypes.bool,
};

export default Spinner;
