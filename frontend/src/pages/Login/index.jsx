import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import Loading from "../../components/Loading";

import "./index.css";

import authService from "../../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await authService.login(formData);
      setMessage(res.message);
      setIsSuccess(true);
      navigate("/home");
      setLoading(false);
    } catch (err) {
      setMessage(err);
      setIsError(true);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="html-body">
        <main className="form-signin">
          <form onSubmit={onSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please login</h1>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={email}
                onChange={onChange}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Sign in
            </button>

            <Link to="/register" className="my-5">
              Register
            </Link>
            <p className="mt-5 mb-3 text-muted text-center">
              The Blog App &copy; 2024
            </p>
          </form>
        </main>
      </div>
      <SuccessToast
        show={isSuccess}
        message={message}
        onClose={() => {
          setIsSuccess(false);
        }}
      />
      <ErrorToast
        show={isError}
        message={message}
        onClose={() => {
          setIsError(false);
        }}
      />
    </>
  );
}
