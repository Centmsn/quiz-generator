import { useState } from "react";

export const useThrottle = () => {
  const [isWaiting, setIsWaiting] = useState(false);

  const throttle = (callback, time = 100) => {
    return () => {
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
};
