import React, { useState } from "react";
import upload from "../../utils/upload";
import createRequest from "../../utils/createRequest";
import { useNavigate } from "react-router-dom";
import "./register.scss";

function Register() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
      await createRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="register">
      <main>
        <form onSubmit={handleSubmit}>
          <div className="form_main">
            <div className="left">
              <h1>Create a new account</h1>
              <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />

              <input
                name="country"
                type="text"
                placeholder="Select your Country"
                onChange={handleChange}
              />

              <label htmlFor="">Profile Picture</label>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className="right">
              <div className="toggle">
                <label htmlFor="">Activate the seller account</label>
                <label className="switch">
                  <input type="checkbox" onChange={handleSeller} />
                  <span className="slider round"></span>
                </label>
              </div>

              <input
                name="phone"
                type="text"
                placeholder="Phone Number"
                onChange={handleChange}
              />

              <textarea
                placeholder="A short description of yourself"
                name="desc"
                id=""
                cols="30"
                rows="10"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <button type="submit">Register</button>
        </form>
      </main>
    </section>
  );
}

export default Register;
