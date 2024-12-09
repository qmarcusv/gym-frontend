import "./UserList.css";
import { useEffect, useState } from "react";
import { User } from "../../../models/User";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    const response = await fetch("http://localhost:3000/api/users");
    const data = await response.json();
    setUsers(data);
  };

  const handleDelete = async (uuid?: string) => {
    const response = await fetch(`http://localhost:3000/api/users/${uuid}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log("User deleted");
      setUsers(users.filter((user) => user.uuid !== uuid));
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="UserList">
      <h2>User List</h2>
      <Link to="/users/new">New User</Link>
      <ul>
        {users.length > 0 &&
          users.map((user) => (
            <li key={user.uuid}>
              <Link to={`/users/${user.uuid}`}>{user.name}</Link>
              <Link
                to={`/users/${user.uuid}/edit`}
                style={{ margin: "0 10px" }}
              >
                Edit
              </Link>
              <button onClick={() => handleDelete(user.uuid)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserList;
