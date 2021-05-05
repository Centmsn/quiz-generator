import styles from "./index.module.scss";

import PropTypes from "prop-types";
import { useRef, useState } from "react";

const DRAGGABLE_WIDTH = 48;

/**
 * Functional react component - renders slider input
 * @param {Object} props - react props
 * @returns {JSX.Element}
 */
const Slider = ({ label = "", min = 0, max = 100, onChange = () => {} }) => {
  const [position, setPosition] = useState(-DRAGGABLE_WIDTH / 2);
  const [value, setValue] = useState(min);
  const sliderRef = useRef(null);

  const handleStartDrag = e => {
    e.preventDefault();

    document.body.addEventListener("mouseup", handleStopDrag);
    document.body.addEventListener("mousemove", handleDraggablePosition);
  };

  const handleStopDrag = e => {
    e.preventDefault();

    document.body.removeEventListener("mouseup", handleStopDrag);
    document.body.removeEventListener("mousemove", handleDraggablePosition);
  };

  const handleDraggablePosition = e => {
    //slider dimension and position
    const {
      x: sliderX,
      width: sliderWidth,
    } = sliderRef.current.getBoundingClientRect();

    // mouse location after removing slider offset
    const mouseX = e.clientX - sliderX;

    // value which is displayed in the draggable
    const newValue = Math.round(((max - min) / sliderWidth) * mouseX + min);

    // if mouseX is smaller than slider width
    if (mouseX - DRAGGABLE_WIDTH / 2 <= -DRAGGABLE_WIDTH / 2) {
      setPosition(-DRAGGABLE_WIDTH / 2);
      return;
    }

    // if mouseX is greater than slider with
    if (mouseX >= sliderWidth) {
      setPosition(sliderWidth - DRAGGABLE_WIDTH / 2);
      return;
    }

    // set current draggable position and current value
    setPosition(mouseX - DRAGGABLE_WIDTH / 2);
    setValue(newValue);

    // trigger callback if value has been changed
    if (newValue !== value) onChange(newValue);
  };

  return (
    <div>
      <span>{label}</span>
      <div className={styles.slider} ref={sliderRef}>
        <div
          className={styles.progressBar}
          style={{
            width: `${position + DRAGGABLE_WIDTH / 2}px`,
          }}
        ></div>
        <div
          className={styles.draggable}
          onMouseDown={handleStartDrag}
          style={{ transform: `translateX(${position}px)` }}
        >
          <span>{value}</span>
        </div>
      </div>
    </div>
  );
};

Slider.propTypes = {
  /**
   * Slider description
   */
  label: PropTypes.string,

  /**
   * Min value
   */
  min: PropTypes.number.isRequired,

  /**
   * Max value - cannot be smaller than min
   */
  max: PropTypes.number.isRequired,

  /**
   * function which is called after the drag is over
   */
  onChange: PropTypes.func.isRequired,
};

export default Slider;
