import { Outlet } from "react-router-dom";
import "./App.css";
import { NavBar, Footer } from "./components";

function App() {
  return (
    <div className="App">
      <NavBar />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
