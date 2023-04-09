import '../css/FilmDetail.css';
import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { TMDB_API_KEY } from "../TMDB";  

function FilmDetail() {
  
  const [selectedFilm, setSelectedFilm] =useState({});
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setSelectedFilm(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!id) return FilmDetailEmpty();
  
  const backdropbaseUrl = "https://image.tmdb.org/t/p/w1280/";
  const baseUrl = "https://image.tmdb.org/t/p/w780/";

  return (
    <div className="FilmDetail is-hydrated">
      <figure className="film-backdrop">
        <img
          src={`${backdropbaseUrl}${selectedFilm.backdrop_path}`}
          alt={`${selectedFilm.title} backdrop`}
        />
        <h1 className="film-title">{selectedFilm.title}</h1>
      </figure>

      <div className="film-meta">
        {selectedFilm.tagline}
        <p className="film-detail-overview">
          <img
            src={`${baseUrl}${selectedFilm.poster_path}`}
            className="film-detail-poster"
            alt={`${selectedFilm.title} poster`}
          />
          {selectedFilm.title}
        </p>
      </div>
    </div>
  );
}

function FilmDetailEmpty() {
  return (
    <div className="FilmDetail">
    <p>
      <i className="material-icons">subscriptions</i>
      <span>No film selected</span>
    </p>

  </div>
  )
}

export default FilmDetail