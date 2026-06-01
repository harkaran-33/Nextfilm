import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function Recommendation() {

  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(true);

  // Fetch recommendations
  useEffect(() => {

    axios
      .get("http://127.0.0.1:8000/recommend/Harry")
      .then((response) => {

        setMovies(response.data);

        setLoading(false);
      })
      .catch((error) => {

        console.log(error);

        setLoading(false);
      });

  }, []);

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

        <h1
          style={{
            color: "#e50914",
            marginBottom: "30px",
            fontWeight: "bold",
          }}
        >
          AI Recommended Movies
        </h1>

        {/* Loading */}
        {loading ? (

          <div className="text-center mt-5">

            <div
              className="spinner-border text-danger"
              role="status"
              style={{
                width: "4rem",
                height: "4rem",
              }}
            ></div>

            <h3 className="mt-4">
              Generating Recommendations...
            </h3>

          </div>

        ) : (

          <div className="row">

            {movies.map((movie) => (

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

                    <button className="btn btn-danger mt-2">
                      Watch Now
                    </button>

                  </div>
                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default Recommendation;