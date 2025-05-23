import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Sahifani yuqoriga chiqaradi
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;