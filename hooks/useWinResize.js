import React, { useEffect, useRef, useState } from 'react';

function useWinResize(timeout = 250) {

    const [winObj, setWinObj] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const timeoutRef = useRef(null);

    useEffect(() => {
        const resizeHandler = () => {
            setWinObj({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        const debouncedResizeHandler = () => {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(resizeHandler, timeout);
        }


        window.addEventListener('resize', debouncedResizeHandler);

        return () => {
            window.removeEventListener('resize', debouncedResizeHandler);
        }
    }, []);

    return winObj;

}

export default useWinResize;