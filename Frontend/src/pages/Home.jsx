import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";

function Home() {

  const [movies, setMovies] = useState([]);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // Fetch movies
  useEffect(() => {

    axios
      .get("http://127.0.0.1:8000/movies")
      .then((response) => {

        setMovies(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);

  // Search filter
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  // Rating Function
  const rateMovie = async (movieId) => {

    const userRating = prompt(
      "Enter Rating (1 to 5)"
    );

    if (!userRating) return;

    try {

      await axios.post(
        `http://127.0.0.1:8000/rate?user=Harry&movie_id=${movieId}&rating=${userRating}`
      );

      alert("Rating Submitted Successfully!");

    } catch (error) {

      console.log(error);

      alert("Error submitting rating");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#141414",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* Navbar */}
      <Navbar />

      <div className="container py-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search movies..."
          className="form-control mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <h2 className="mb-4">
          Trending Movies
        </h2>

        {/* Movies */}
        <div className="row">

          {filteredMovies.map((movie) => (

            <div
              className="col-md-3 mb-4"
              key={movie.id}
            >

              <div
                className="card bg-dark text-white h-100"
                style={{
                  border: "none",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >

                <img
                  src={movie.image}
                  alt={movie.title}
                  className="card-img-top"
                  style={{
                    height: "400px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">

                  <h4>{movie.title}</h4>

                  <p>{movie.genre}</p>

                  {/* Buttons */}
                  <div className="d-flex gap-2">

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        navigate(`/movie/${movie.id}`, {
                          state: movie,
                        })
                      }
                    >
                      View Details
                    </button>

                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        rateMovie(movie.id)
                      }
                    >
                      ⭐ Rate
                    </button>

                  </div>

                </div>
              </div>
            </div>
          ))}

        </div>

        {/* No Movies */}
        {filteredMovies.length === 0 && (
          <h3>No Movies Found</h3>
        )}

      </div>
    </div>
  );
}

export default Home;