import "./UserDetails.css";
import { User } from "../../../models/User";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const [user, setUser] = useState<User>();
  const { uuid } = useParams();

  const getUser = async () => {
    const response = await fetch(`http://localhost:3000/api/users/${uuid}`);
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="UserDetails">
      <h2>UserDetails</h2>
      {user && (
        <div>
          <p>UUID: {user.uuid}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>roles: {user.roles}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
