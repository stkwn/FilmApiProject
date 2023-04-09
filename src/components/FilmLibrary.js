import { useState,useEffect } from 'react';
import '../css/FilmLibrary.css'
import FilmDetail from "./FilmDetail";
import {TMDB_API_KEY} from "../TMDB";     
import FilmRow from "./FilmRow";


function FilmLibrary() {
  const [films, setFilms] = useState([]);
  const [page,setPage] = useState(1);
  const [year,setYear] = useState(2022);
  // const [selectedFilm, setSelectedFilm] =useState({});
  const [favesFilm, setFavesFilm] = useState([]);
  const [showFaves,setShowFaves] = useState(false);
  const [showAll, setShowAll] =useState(true);

  useEffect(()=>{
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&sort_by=popularity.desc&page=${page}&primary_release_year=${year}`;
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {console.log(data.results); return setFilms(data.results)})
    .catch(err => console.log(err))
  },[page,year])

  // const handleFilmSelect =(id) =>{
  //   console.log(id);
  //   const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`;
  //   fetch(apiUrl)
  //   .then(res => res.json())
  //   .then(data => setSelectedFilm(data))
  //   .catch(err => console.log(err))
  // }
  

  const handleFavesFilmSelect = (film) => {
    const found = favesFilm.find(item => item.id === film.id);
    if (!found) {setFavesFilm([...favesFilm, film])} 
    else {
      const newFavesFilmList = favesFilm.filter(item => item.id !==film.id);
      setFavesFilm(newFavesFilmList);
    }
  }

  const handleShowAll=() =>{
    if (showAll) {setShowFaves(false)} 
    else {
      setShowAll(true);
      setShowFaves(false);
    }
  }

  const handleShowFaves=()=>{
    if (showFaves) {setShowAll(false)} 
    else {
      setShowFaves(true);
      setShowAll(false);
    }
  }

  const handlePage = (action) => {
  
  if (action === "prev") 
    if (page=== 1) return; 
    else return setPage(page-1);
  if (action === "next") setPage(page+1);
  }

  const handleYear = (e) => {
    setYear(e.target.value);
    setPage(1);
  }

  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <form className="section-year">
          <label for="release_year">Release Year </label>
          <select name="release_year" id="release_year" value={year} onChange={handleYear}>
            <option >2022</option>
            <option >2021</option>
            <option >2020</option>
            <option >2019</option>
            <option >2018</option>
            <option >2017</option>
          </select>
        </form>
        <div className="film-list-filters">
          <button
            className={`film-list-filter ${showAll && "is-active"}`}
            onClick={handleShowAll}
          >
            ALL
            <span className="section-count">{films.length}</span>
          </button>
          <button
            className={`film-list-filter ${showFaves && "is-active"}`}
            onClick={handleShowFaves}
          >
            FAVES
            <span className="section-count">{favesFilm.length}</span>
          </button>
        </div>
        {showAll
          ? films.map((film) => {
              let isFaves = -1;
              if (favesFilm.find((item) => item.id === film.id)) isFaves = 1;
              return (
                <FilmRow
                  key={film.id}
                  film={film}
                  // onFilmSelect={() => handleFilmSelect(film.id)}
                  onFavaesFilmSelect={() => handleFavesFilmSelect(film)}
                  isFaves={isFaves}
                />
              );
            })
          : favesFilm.map((film) => {
              let isFaves = 1;
              return (
                <FilmRow
                  key={film.id}
                  film={film}
                  // onFilmSelect={() => handleFilmSelect(film)}
                  onFavaesFilmSelect={() => handleFavesFilmSelect(film)}
                  isFaves={isFaves}
                />
              );
            })}
        <button className="film-button" onClick={() => handlePage("prev")}>
          Prev Page
        </button>
        <button
          className="film-button is-active"
          onClick={() => handlePage("next")}
        >
          Next Page
        </button>
      </div>
      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        {/* <FilmDetail film={selectedFilm}/> */}
        <FilmDetail />
      </div>
    </div>
  );
}

export default FilmLibrary