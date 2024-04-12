import { Link } from "react-router-dom";
import "./results.css";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

const Results = ({ movieData, err, setSelectedId }) => {
  return (
    <div className="serch-result">
      <h1 className="title">
        Found <span>{movieData.length} Results</span>
      </h1>
      {err ? (
        <h1 className="err">{err}</h1>
      ) : (
        <div className="poster-container">
          {movieData.map((movie) => {
            return (
              <div
                className="poster"
                key={movie.imdbID}
                onClick={() => setSelectedId(movie.imdbID)}
              >
                <Link to={`${movie.imdbID}`}>
                  <div className="movie-image">
                    <img src={movie.Poster} alt="poster" />
                  </div>
                  <h1 className="movie-title">{movie.Title}</h1>
                  <div className="movie-info">
                    <p className="movie-year">{movie.Year}</p>
                    <p className="movie-type">{movie.Type}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Results;
