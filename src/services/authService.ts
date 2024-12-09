const backend = import.meta.env.VITE_BACKEND_URL;

class AuthService {
  jwtToken: string | null;

  constructor() {
    // Initialize jwtToken from localStorage
    this.jwtToken = localStorage.getItem("jwtToken");
  }

  get headers() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.jwtToken}`,
    };
  }

  async logIn(email: string, password: string) {
    return await fetch(`${backend}/login`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    });
  }

  async forgotPassword(email: string) {
    return await fetch(`${backend}/forgot-password`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email }),
    });
  }
}

// Export an instance of the class
export default new AuthService();
