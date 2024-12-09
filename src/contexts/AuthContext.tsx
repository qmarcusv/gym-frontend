import { createContext, useState, useEffect } from "react";
import { User } from "../models";
const backend = import.meta.env.VITE_BACKEND_URL;

// Typescript types declared
interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  authLogIn: (user: User, jwtToken?: string) => void;
  authLogOut: () => void;
}

// Typescript default value
const defaultAuthContext: AuthContextType = {
  currentUser: null,
  isAdmin: false,
  authLogIn: () => {},
  authLogOut: () => {},
};

// Create context
// --------------------------
export const AuthContext = createContext(defaultAuthContext);

// Create Provider
// --------------------------
export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState(null); //

  // Directly define isAdmin as a boolean variable
  // roles is an array of strings
  // const isAdmin = currentUser?.roles?.includes("admin") ?? false;

  // Split the string into an array and check if 'admin' is included
  // @ts-ignore
  const isAdmin = currentUser?.roles
    ?.split(",")
    .map((role) => role.trim())
    .includes("admin");

  const authLogIn = (user: any, jwtToken?: string) => {
    console.log("authLogIn");
    setCurrentUser(user);
    if (jwtToken) {
      console.log("Save jwtToken");
      localStorage.setItem("jwtToken", jwtToken);
    }
  };

  const authLogOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("jwtToken");
  };

  const checkAndRefeshJwt = async (jwtToken: string) => {
    console.warn("checkAndRefeshJwt");
    try {
      const response = await fetch(`${backend}/checkAndRefeshJwt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response JSON
      const data = await response.json();
      authLogIn(data.user);
    } catch (error) {
      console.error((error as Error).message); // Type guard for typescript `unknown` error
    }
  };

  // automatically check and refresh JWT on mount
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken && !currentUser) {
      checkAndRefeshJwt(jwtToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, isAdmin, authLogIn, authLogOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
