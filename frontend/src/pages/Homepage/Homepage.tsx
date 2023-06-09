import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

export default function Homepage() {
  return (
    <div>
      <Navbar />
      <h1>Homepage</h1>

      <Link to={"/todos"}>Todos</Link>
      <Link to={"/login"}>Login</Link>
    </div>
  );
}
