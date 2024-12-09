const backend = import.meta.env.VITE_BACKEND_URL;
const api = `${backend}/api/users`;
import { User } from "../models/User";

class UserService {
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

  async getUsers() {
    return await fetch(api, {
      method: "GET",
      headers: this.headers,
      //   body: JSON.stringify({ email, password }),
    });
  }

  async getUser(uuid: string) {
    return await fetch(`${api}/${uuid}`, {
      method: "GET",
      headers: this.headers,
    });
  }

  async createUser(user: User) {
    return await fetch(api, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(user),
    });
  }

  async updateUser(user: User) {
    return await fetch(`${api}/${user.uuid}`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(user),
    });
  }

  async delete(uuid?: string) {
    return await fetch(`${api}/${uuid}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }
}

// Export an instance of the class
export default new UserService();
