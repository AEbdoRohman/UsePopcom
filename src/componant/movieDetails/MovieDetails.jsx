import React, { useEffect, useState } from "react";
import "./movieDetails.css";
import Starting from "../Starting";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";
const KEY = "3ea9e662";
const MovieDetails = ({ selectedId, addToWatched, watched }) => {
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isRating, setIsRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const ratingUser = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.isRating;

  function watchedMovie() {
    const newDetails = {
      imdbID: details.imdbID,
      title: details.Title,
      poster: details.Poster,
      year: details.Year,
      imdbrating: Number(details.imdbRating),
      isRating,
      runtime: Number(details.Runtime.split(" ").at(0)),
    };
    addToWatched(newDetails);
  }

  useEffect(() => {
    async function MovieDetails() {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&&i=${selectedId}`
        );
        const data = await res.json();
        setDetails(data);

        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    MovieDetails();
  }, [selectedId]);

  // main title change in app
  useEffect(() => {
    if (!details.Title) return;
    document.title = ` Movie - ${details.Title}`;
    return () => {
      document.title = "usepopcorn";
    };
  }, [details.Title]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="movie-details">
          <div className="image-details">
            <img src={details.Poster} alt="poster" />
          </div>
          <div>
            <h1 className="movie-title">{details.Title}</h1>
            <div className="details">
              <p>
                {details.Released},
                <span className="runtime">{details.Runtime}</span>
              </p>
              <em>
                {details.Genre}
                <span>{details.Type}</span>
              </em>
              <p>{details.Language}</p>
              <p>
                <span>⭐</span>
                {details.imdbRating} IMDb Rating
              </p>
              <p>{details.Plot}</p>
              <p>Starring {details.Actors}</p>
              <p> Directed by {details.Director}</p>
            </div>
            <div className="reating">
              {!isWatched ? (
                <>
                  <Starting maxlength={10} siz={28} onSetRating={setIsRating} />
                  {isRating > 0 && (
                    <Link to="/watched">
                      <button className="btn btn-add" onClick={watchedMovie}>
                        Add to list
                      </button>
                    </Link>
                  )}
                </>
              ) : (
                <p>your rated this movie {ratingUser}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
