import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div>
      <h1>Homepage</h1>

      <Link to={"/todos"}>Todos</Link>
      <Link to={"/login"}>Login</Link>
    </div>
  );
}
