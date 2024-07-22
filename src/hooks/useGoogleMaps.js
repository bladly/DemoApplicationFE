import { useState, useEffect } from 'react';

const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.google) {
      setIsLoaded(true);
    } else {
      const intervalId = setInterval(() => {
        if (window.google) {
          clearInterval(intervalId);
          setIsLoaded(true);
        }
      }, 100);
    }
  }, []);

  return isLoaded;
};

export default useGoogleMaps;