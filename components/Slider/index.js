import styles from "./index.module.scss";

import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const DRAGGABLE_WIDTH = 48;

/**
 * Functional react component - renders slider input
 * @param {Object} props - react props
 * @returns {JSX.Element}
 */
const Slider = ({
  label = "",
  min = 0,
  max = 100,
  initial = 0,
  onChange = () => {},
}) => {
  const [position, setPosition] = useState(-DRAGGABLE_WIDTH / 2);
  const [value, setValue] = useState(min);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (initial) {
      setValue(initial / 60);
      const { width } = sliderRef.current.getBoundingClientRect();

      // TODO refactor
      setPosition(
        (width / (max - min)) * (initial / 60) -
          DRAGGABLE_WIDTH / 2 -
          width / (max - min)
      );
    }
  }, []);

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
    // !refactor
    if (e.keyCode) {
      if ([37, 39].includes(e.keyCode)) {
        let newValue;
        if (e.keyCode === 39) {
          if (value >= max) return;
          newValue = value + 1;
          setValue(prev => prev + 1);
        }

        if (e.keyCode === 37) {
          if (value <= min) return;
          newValue = value - 1;
          setValue(prev => prev - 1);
        }

        const { width } = sliderRef.current.getBoundingClientRect();

        // TODO refactor
        setPosition(
          (width / (max - min)) * newValue -
            DRAGGABLE_WIDTH / 2 -
            width / (max - min)
        );
      }

      return;
    }

    //slider dimension and position
    const { x: sliderX, width: sliderWidth } =
      sliderRef.current.getBoundingClientRect();

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
      <div
        className={styles.slider}
        ref={sliderRef}
        onClick={handleDraggablePosition}
      >
        <div
          className={styles.progressBar}
          style={{
            width: `${position + DRAGGABLE_WIDTH / 2}px`,
          }}
        ></div>
        <div
          tabIndex="0"
          className={styles.draggable}
          onKeyDown={handleDraggablePosition}
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
