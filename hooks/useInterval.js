import { useEffect } from "react";

const useInterval = (callback, timeInterval) => {
  useEffect(() => {
    const intervalId = setInterval(callback, timeInterval)
    return function () {
      clearInterval(intervalId);
    }
  }, [timeInterval]);
}

export default useInterval;
