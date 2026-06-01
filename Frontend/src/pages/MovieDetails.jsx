import { useLocation } from "react-router-dom";

function MovieDetails() {
  const location = useLocation();

  const movie = location.state;

  return (
    <div
      style={{
        backgroundColor: "#141414",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
      }}
    >
      <div className="row">
        <div className="col-md-4">
          <img
            src={movie.image}
            alt={movie.title}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-8">
          <h1>{movie.title}</h1>

          <h4 className="mt-3">
            ⭐ Rating: {movie.rating}
          </h4>

          <h5 className="mt-3">
            🎬 Genre: {movie.genre}
          </h5>

          <p className="mt-4">
            {movie.description}
          </p>

          <button className="btn btn-danger mt-3">
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;