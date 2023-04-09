import "../css/FilmRow.css";
import { Link} from "react-router-dom";

export default function FilmRow(props) {
    console.log(props.film);
    const { title, release_date, poster_path} = props.film;
    const baseUrl= "https://image.tmdb.org/t/p/w780";
    const releseDate = new Date(release_date);
    return (
      <>
        <div className="FilmRow">
          <img src={`${baseUrl}${poster_path}`} alt={`${title} film poster`} />
          <div className="film-summary">
            <h3>{title}</h3>
            <p>{releseDate.getFullYear()}</p>
          <Link to={`/films/${props.film.id}`} className="action" >
            <span className="material-icons">read_more</span>
          </Link>
          </div>
          <button className="fave">
            <span className="material-icons" onClick={props.onFavaesFilmSelect}>
              {props.isFaves === 1 ? "remove_from_queue" : "add_to_queue"}
            </span>
          </button>
        </div>
      </>
    );
}
