import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { register, reset } from "../../features/authSlice";

import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";
import FormImage from "../../components/FormImage";
import Navbar from "../../components/Navbar";

export default function RegisterPage() {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    image: "",
    email: "",
    password: "",
  });
  const [userImage, setUserImage] = useState(null);

  const { firstName, lastName, bio, email, password } = newUser;

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

  const buildFormData = () => {
    const formData = new FormData();
    formData.append("firstName", newUser.firstName);
    formData.append("lastName", newUser.lastName);
    formData.append("bio", newUser.bio);
    formData.append("image", newUser.image);
    formData.append("email", newUser.email);
    formData.append("password", newUser.password);
    return formData;
  };

  const onChange = (e) => {
    setNewUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onImageChange = (e) => {
    e?.preventDefault();
    if (e?.target?.files?.length) {
      const file = e.target.files[0];
      setUserImage(URL.createObjectURL(file));
      setNewUser((prevState) => ({
        ...prevState,
        image: file,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = buildFormData();
    dispatch(register(userData));
  };

  return (
    <>
      <Navbar />
      <div className="html-body">
        <main className="form-signin">
          <form onSubmit={onSubmit}>
            <h1 className="h3 mb-3 fw-normal">Author registration</h1>
            <div className="form-floating">
              <FormImage image={userImage} onChange={onImageChange} />
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="Joe"
                value={firstName}
                onChange={onChange}
              />
              <label htmlFor="firstName">First name</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                placeholder="Soap"
                value={lastName}
                onChange={onChange}
              />
              <label htmlFor="lastName">Last name</label>
            </div>
            <div className="form-floating mb-2">
              <textarea
                type="text"
                className="form-control"
                id="bio"
                name="bio"
                placeholder="bio"
                value={bio}
                maxLength={300}
                onChange={onChange}
              />
              <div
                style={{
                  position: "relative",
                  bottom: "1px",
                  left: "10px",
                  fontSize: "12px",
                  color: "#6c757d",
                }}
              >
                {newUser.bio.length}/300
              </div>
              <label htmlFor="bio">Bio</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={email}
                onChange={onChange}
              />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={onChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Register
            </button>
            <Link to="/login" className="my-5">
              Login
            </Link>
            <p className="mt-3 mb-3 text-muted text-center">
              The Blog App &copy; 2024
            </p>
          </form>
        </main>
      </div>
      <SuccessToast
        show={isSuccess}
        message={message}
        onClose={() => {
          dispatch(reset());
        }}
      />
      <ErrorToast
        show={isError}
        message={message}
        onClose={() => {
          dispatch(reset());
        }}
      />
    </>
  );
}
