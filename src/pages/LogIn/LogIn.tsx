import "./LogIn.css";
import { useState } from "react";
import AuthService from "../../services/authService"; // Import the login function
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import FormInput from "../../components/FormInput/FormInput";

export default function LogIn() {
  const { currentUser, authLogIn } = useAuth<any>();
  const [user, setUser] = useState({ email: "", password: "" });

  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // If the user is already logged in, redirect them to the home page or another page
  if (currentUser) {
    return <Navigate to="/" />;
  }

  // ------------------------------------------------------------
  // Validation rules
  // ------------------------------------------------------------
  const validateForm = () => {
    const errors: { email?: string; password?: string; server?: string } = {};

    if (user.email.trim() === "") {
      errors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = "Invalid";
    }
    if (user.password.trim() === "") {
      errors.password = "Required";
    } else if (user.password.length < 6) {
      errors.password = "Too short";
    }

    setFormErrors(errors);
    return errors;
  };

  // ------------------------------------------------------------
  // On Events
  // ------------------------------------------------------------
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear the errors
    setError(null);
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: "", // Clear the individual field error
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // ------------------------------------------------------------
  // On Submit
  // ------------------------------------------------------------
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Start loading state
    e.preventDefault();
    setLoading(true);
    // setErrors({});

    // Validate the form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length !== 0) {
      setLoading(false);
      return;
    }

    // Submit the form
    try {
      const response = await AuthService.logIn(user.email, user.password);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // Handle successful login (e.g., store tokens, redirect)
      const data = await response.json(); // Parse the JSON response
      console.log("Logged in successfully:", data);
      authLogIn(data.user, data.jwtToken);
      navigate("/");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  // ------------------------------------------------------------
  // HTML
  // ------------------------------------------------------------
  return (
    <div className="login-container">
      <h2 className="title">Login</h2>
      <form onSubmit={onSubmit} className="login-form">
        <div className="error-server">{error && <p>{error}</p>}</div>

        <FormInput
          type="email"
          name="email"
          value={user.email}
          onChange={onChange}
          error={formErrors.email}
          // placeholder="Email"
        />

        <FormInput type="password" name="password" value={user.password} onChange={onChange} error={formErrors.password} placeholder="Password" />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
      <p>
        Forgot your password? <a href="/forgot-password">Forgot Password</a>
      </p>
    </div>
  );
}
