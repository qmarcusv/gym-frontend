import "./EditUser.css";
import { User } from "../../../models/User";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const [user, setUser] = useState<User>(); // Initialize as null

  const { uuid } = useParams();

  const getUser = async () => {
    const response = await fetch(`http://localhost:3000/api/users/${uuid}`);
    const data = await response.json();
    setUser(data);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    console.log(name, email, password);

    const response = await fetch(`http://localhost:3000/api/users/${uuid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (response.ok) {
      console.log("User updated");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="EditUser">
      <h2>EditUser</h2>
      {user && (
        <form onSubmit={handleSubmit} className="user-form">
          <label htmlFor="name">Name</label>
          <input
            value={user.name}
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
          />

          <label htmlFor="email">Email</label>
          <input
            value={user.email}
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
          />

          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
          />

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default EditUser;
