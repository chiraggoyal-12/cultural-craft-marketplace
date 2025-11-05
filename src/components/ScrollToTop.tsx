import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediately scroll to top, multiple times to ensure it works
    window.scrollTo(0, 0);
    
    // Also use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
    
    // And a small timeout as fallback
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    
    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

export default ScrollToTop;