import React, { useState } from "react";
import axios from "axios";
import createRequest from "../../utils/createRequest";
import { useNavigate } from "react-router-dom";
import "./login.scss";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameError(false);
    setPasswordError(false);

    if (username === "") return setUsernameError(true);
    if (password === "") return setPasswordError(true);

    try {
      const res = await createRequest.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <section className="login">
      <main>
        <div className="left">
          <form onSubmit={handleSubmit}>
            <h1>Welcome Back</h1>
            <h3>Login to your account & let's get started</h3>

            <span className={`input_error ${usernameError && "show"}`}>
              Please enter your username
            </span>

            <div className="input_area">
              <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <i class="input_icon user fa-solid fa-user"></i>
            </div>

            <span className={`input_error ${passwordError && "show"}`}>
              Please enter your password
            </span>
            <div className="input_area">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <i
                  className={`input_icon fa-solid fa-eye ${
                    showPassword && "show"
                  }`}
                ></i>
                <i
                  className={`input_icon fa-solid fa-eye-slash ${
                    !showPassword && "show"
                  }`}
                ></i>
              </span>
            </div>

            <span className="rememer">
              <input type="checkbox" />
              Remember me
            </span>
            <button
              className={`${username && password ? "active" : ""}`}
              type="submit"
            >
              Login
            </button>

            <span className="forgot">Forgot Password?</span>
          </form>
        </div>
        <div className="right">
          <img src="/images/login-image.png" alt="login-image" />
        </div>
      </main>
    </section>
  );
}

export default Login;
