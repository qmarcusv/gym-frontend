import React from "react";
import "./FormInput.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // FontAwesome icons

interface FormInputProps {
  name: string;
  type?: string;
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  label?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  type,
  id,
  value,
  onChange,
  error,
  placeholder,
  label,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="input-container">
      <label htmlFor={id}>{label || placeholder || name}</label>
      <input
        name={name}
        type={type === "password" && showPassword ? "text" : type}
        id={id || name}
        value={value}
        onChange={onChange}
        className={error ? "error-input" : ""}
        placeholder={placeholder || name}
      />

      {type === "password" && (
        <div className="toggle-password" onClick={togglePasswordVisibility}>
          {!showPassword ? <FaEye /> : <FaEyeSlash />}
        </div>
      )}

      {error && <div className="error-client">{error}</div>}
    </div>
  );
};

export default FormInput;
