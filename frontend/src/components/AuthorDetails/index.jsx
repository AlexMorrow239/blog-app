import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthorDetails({ onEditProfile }) {
  const [isReading, setIsReading] = useState(false);

  const { authorId } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { author } = useSelector((state) => state.author);

  const path = window.location.pathname;

  return (
    <>
      <h3 className="fst-italic">About</h3>

      <div className="p-4 mb-3 bg-light rounded">
        <div className="d-flex justify-content-between">
          <h4 className="fst-italic">
            {author?.firstName} {author?.lastName}
          </h4>
          {onEditProfile && authorId === user?._id && (
            <button
              className="btn btn-outline-dark d-flex align-items-center"
              onClick={onEditProfile}
            >
              <span className="me-2">EDIT</span>
              <i className="bi bi-pencil-fill" />
            </button>
          )}
        </div>
        <img
          src={author?.image}
          className="avatar"
          alt="profile"
          style={{ aspectRatio: "1/1", objectFit: "cover" }}
        />
        <p>
          {isReading ? author?.bio : author?.bio.substring(0, 100)}
          {author?.bio.length > 100 && !isReading && "..."}
        </p>
        {path.startsWith("/profile") && author?.bio?.length > 100 && (
          <div className="text-center">
            <button
              className="btn btn-outline-dark"
              onClick={() => {
                setIsReading(!isReading);
              }}
            >
              {isReading ? "Close" : "Read More"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
