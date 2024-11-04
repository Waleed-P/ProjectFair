import React, { createContext, useEffect, useState } from "react";

export const tokenAuthContext = createContext();

function TokenAuth({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if token exists in sessionStorage
    if (sessionStorage.getItem("token")) {
      setIsAuthorized(true); // User is authorized if token exists
    } else {
      setIsAuthorized(false); // No token means user is not authorized
    }
  }, []); // Empty dependency array to run only once on initial render

  return (
    <tokenAuthContext.Provider value={{ isAuthorized, setIsAuthorized }}>
      {children}
    </tokenAuthContext.Provider>
  );
}

export default TokenAuth;
