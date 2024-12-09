import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// Create hook
// --------------------------
export const useAuth = () => useContext(AuthContext);
