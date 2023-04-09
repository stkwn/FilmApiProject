import "../css/Home.css";
// import FilmLibrary from "./components/FilmLibrary";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
                <h1>Movie Time</h1>
        <Link to="/films">
                <h2>Click Me to Find more...</h2>
        </Link>
    </div>
      )
}
