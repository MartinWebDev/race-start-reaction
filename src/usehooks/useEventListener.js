import { useEffect, useRef } from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

// Window Event based useEventListener interface
// Element Event based useEventListener interface
// Document Event based useEventListener interface

function useEventListener(
    eventName,
    handler,
    element,
    options,
) {
    // Create a ref that stores handler
    const savedHandler = useRef(handler);

    useIsomorphicLayoutEffect(() => {
        savedHandler.current = handler
    }, [handler]);

    useEffect(() => {
        // Define the listening target
        const targetElement = element?.current || window
        if (!(targetElement && targetElement.addEventListener)) {
            return;
        }

        // Create event listener that calls handler function stored in ref
        const eventListener = event => savedHandler.current(event);
        targetElement.addEventListener(eventName, eventListener, options);

        // Remove event listener on cleanup
        return () => {
            targetElement.removeEventListener(eventName, eventListener);
        }
    }, [eventName, element, options]);
}

export default useEventListener;
