import React from "react";
import "./watchedMovies.css";
import { Link } from "react-router-dom";
const WatchedMovies = ({ watched, setWatched }) => {
  function deleteMovie(id) {
    setWatched(watched.filter((movie) => movie.imdbID !== id));
  }
  return (
    <div>
      <h1 className="main-title">Movies Watched</h1>
      <Movie watched={watched} deleteMovie={deleteMovie} />
    </div>
  );
};

export default WatchedMovies;

function Movie({ watched, deleteMovie }) {
  return (
    <>
      {watched.map((movie) => (
        <div className="movie" key={movie.imdbID}>
          <header className="watched-head">
            <h1>{movie.title}</h1>
            <button
              className="btn-delete"
              onClick={() => deleteMovie(movie.imdbID)}
            >
              X
            </button>
          </header>
          <div className="mov-info">
            <img src={movie.poster} alt="poster" style={{ width: "60px" }} />
            <p>{movie.year}</p>
            <p>⭐{movie.imdbrating}</p>
            <p>🌟{movie.isRating}</p>
            <p>⌛{movie.runtime} min</p>
            <Link to={`/${movie.imdbID}`}>
              <button className="btn btn-details">Details</button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
