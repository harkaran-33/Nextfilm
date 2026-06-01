import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: "#141414",
      }}
    >
      <div
        className="p-5 rounded"
        style={{
          backgroundColor: "#1f1f1f",
          width: "350px",
        }}
      >
        <h1
          className="text-center mb-4"
          style={{ color: "#e50914" }}
        >
          NextFlim
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="form-control mb-3"
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="form-control mb-4"
        />

        <button
          className="btn btn-danger w-100"
          onClick={() => navigate("/home")}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;