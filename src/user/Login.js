import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import admin from "../images/admin.svg";

const Login = () => {
  const [fields, setFields] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setFields({ ...fields, [name]: value });
  };
  const postData = async (e) => {
    e.preventDefault(); // to pervent reloading issues.
    const { email, password } = fields; // its object decontructuring.
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 422) {
      toast.error(data.message);
    }
    if (res.status === 201) {
      navigate("/user/");
    }
  };
  return (
    <div className="container" style={{ marginTop: "10rem" }}>
      <div className="row">
        <div className="col-md-6">
          <img
            src={admin}
            alt=".."
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="col-md-6">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div style={{ display: "grid", justifyContent: "center" }}>
                {/* <img src={logo} alt=".." style={{ marginLeft: "30%" }} /> */}
                <h3 style={{color:"#0231C9"}}>Welcome Back!</h3>
                <p className="text-center">Sign in to your account</p>
              </div>
              <form onSubmit={postData} style={{ marginTop: "2em" }}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}"
                    value={fields.email}
                    inputMode="email"
                    required
                    onChange={handleInput}
                  />
                  <label style={{ color: "#0231C9" }} htmlFor="floatingInput">
                    Email Address
                  </label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={fields.password}
                    onChange={handleInput}
                    required
                    // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    // title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                  />
                  <label style={{ color: "#0231C9" }} htmlFor="floatingInput">
                    password
                  </label>
                </div>
                <input
                  type="submit"
                  value="Login"
                  className="py-3 w-100 mb-4"
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "#919194",
                    color: "white",
                  }}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
