import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav
      className="d-flex justify-content-between align-items-center px-4 py-3"
      style={{
        backgroundColor: "#000",
      }}
    >
      {/* Logo */}
      <h1
        style={{
          color: "#e50914",
          fontWeight: "bold",
          cursor: "pointer",
          margin: 0,
        }}
        onClick={() => navigate("/home")}
      >
        NextFlim
      </h1>

      {/* Navigation Buttons */}
      <div className="d-flex gap-3">
        <button
          className="btn btn-outline-light"
          onClick={() => navigate("/home")}
        >
          Home
        </button>

        <button
          className="btn btn-danger"
          onClick={() =>
            navigate("/recommendations")
          }
        >
          Recommendations
        </button>

        <button
          className="btn btn-outline-danger"
          onClick={() => navigate("/")}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;