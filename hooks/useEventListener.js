import { useEffect, useRef } from "react";

export default function useEventListener(eventName, handler, element, options) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement = element?.current || window;

    if (!(targetElement?.addEventListener)) return;

    const listener = (event) => savedHandler.current(event);

    targetElement.addEventListener(eventName, listener, options);

    return function () {
      targetElement.removeEventListener(eventName, listener, options);
    };
  }, [eventName, element, options]);

}
