import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, resetSuccessAndError } from "../../features/authSlice";

import ErrorToast from "../../components/ErrorToast";
import Loading from "../../components/Loading";

import "./index.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/home");
    }
  }, [user, isError, isSuccess, isLoading, message, navigate]);

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
    dispatch(login(formData));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="html-body">
        <main className="form-signin">
          <form onSubmit={onSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please login</h1>
            <div className="form-floating mb-2">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={email}
                onChange={onChange}
                autoComplete="email"
              />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating mb-2">
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
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <Link to="/register">Register</Link>
              <Link to="/home">Continue as guest</Link>
            </div>
            <p className="mt-4 mb-3 text-muted text-center">
              Cape Chronicles &copy; 2024
            </p>
          </form>
        </main>
      </div>
      <ErrorToast
        show={isError}
        message={message}
        onClose={() => {
          dispatch(resetSuccessAndError());
        }}
      />
    </>
  );
}
