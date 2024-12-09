import "./NewUser.css";

const user = {
  name: "New User",
  email: "newuser@example.com",
  password: "123456",
  confirmPassword: "123456",
};

const NewUser = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    console.log(email, password);
    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
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
      console.log("User created");
    }
  };

  return (
    <div className="NewUser">
      <h1 className="title">Register</h1>

      <form onSubmit={handleSubmit} className="user-form">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />

        <label htmlFor="confirm-password">Confirm Password</label>
        <input type="password" name="confirm-password" id="confirm-password" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewUser;
