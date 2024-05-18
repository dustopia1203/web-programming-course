import { useState, useEffect } from "react";
import Context from "./Context";

function Provider({ children }) {
  const [state, setState] = useState("Home page");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          setUser(user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, []);
  return (
    <Context.Provider
      value={{ state, setState, isAuthenticated, setIsAuthenticated, user }}
    >
      {children}
    </Context.Provider>
  );
}

export default Provider;
