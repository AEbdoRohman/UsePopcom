import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./componant/navbar/Navbar";
import Results from "./componant/results/Results";
import { Route, Routes } from "react-router-dom";
import MovieDetails from "./componant/movieDetails/MovieDetails";
import Loading from "./componant/loading/Loading";
import WatchedMovie from "./componant/watchedMovies/WatchedMovies";
import { useLocalStorage } from "./Hooks/UseLocalStorage";

const KEY = "3ea9e662";
function App() {
  const [movieData, setMovieData] = useState([]);
  const [search, sitSearch] = useState("");
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Custom Hook useLocalStorage
  const [watched, setWatched] = useLocalStorage([], "watched");

  // const [watched, setWatched] = useState(function () {
  //   const data = localStorage.getItem("watched");
  //   return JSON.parse(data);
  // });

  function addToWatched(movie) {
    setWatched([...watched, movie]);
  }

  // useEffect(() => {
  //   localStorage.setItem("watched", JSON.stringify(watched));
  // }, [watched]);
  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        setIsLoading(true);
        setErro("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&&s=${search}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Movie not found");
        }

        setMovieData(data.Search);
        setErro("");
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        if (err.name === "AbortError") {
          setErro(err.message);
        }
      }
    }

    if (search.length < 3) {
      setMovieData([]);
      setErro("");
      return;
    }
    fetchData();
    return function () {
      controller.abort();
    };
  }, [search]);

  return (
    <div className="App">
      <Navbar search={search} sitSearch={sitSearch} />

      {isLoading ? (
        <Loading />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Results
                movieData={movieData}
                err={erro}
                setSelectedId={setSelectedId}
              />
            }
          />

          <Route
            path="/:imdbID"
            element={
              <MovieDetails
                selectedId={selectedId}
                setWatched={setWatched}
                addToWatched={addToWatched}
                watched={watched}
              />
            }
          />
          <Route
            path="/watched"
            element={<WatchedMovie watched={watched} setWatched={setWatched} />}
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
