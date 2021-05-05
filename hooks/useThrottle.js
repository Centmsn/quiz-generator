import { useState } from "react";

export function useThrottle() {
  const [isWaiting, setIsWaiting] = useState(false);

  const throttle = (callback, time = 100) => {
    return function () {
      if (isWaiting) return;

      setIsWaiting(true);
      callback.apply(this, arguments);

      setTimeout(() => {
        setIsWaiting(false);
      }, time);
    };
  };

  return {
    isWaiting,
    throttle,
  };
}
