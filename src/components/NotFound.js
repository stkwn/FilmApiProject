import "../css/Home.css";
// import FilmLibrary from "./components/FilmLibrary";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="home-container">
      <h2>Uh oh, that page doesn't exist.</h2>
      <Link to="/">
          <h3>Click Me to back home</h3>
      </Link>
    </div>
  );
}
