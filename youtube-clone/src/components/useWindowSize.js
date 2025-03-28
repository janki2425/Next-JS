import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const lgBreakpoint = 1024;
      setWindowSize({
        width: width,
        isLgOrAbove: width >= lgBreakpoint,
      });
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;