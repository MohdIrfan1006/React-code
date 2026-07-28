import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source, mode } =
    props;

  return (
    <div className="my-4">
      <div
        className="card shadow-lg border-0 h-100"
        style={{
          width: "18rem",
          backgroundColor: mode === "dark" ? "#1f2937" : "#ffffff",
          color: mode === "dark" ? "#ffffff" : "#000000",
          borderRadius: "15px",
          transition: "0.4s",
          overflow: "hidden",
        }}
      >
        <span
          className="position-absolute badge rounded-pill bg-danger"
          style={{
            top: "10px",
            right: "10px",
            zIndex: "10",
            padding: "6px 10px",
            fontSize: "12px",
          }}
        >
          {" "}
          {source}{" "}
        </span>
        <img
          src={imageUrl || "https://picsum.photos/300/200"}
          onError={(e) => {
            e.target.src = "https://picsum.photos/300/200";
          }}
          className="card-img-top"
          alt="News"
          style={{ height: "200px", objectFit: "cover" }}
        />

        <div className="card-body">
          <h5 className="card-title fw-bold" style={{ minHeight: "65px" }}>
            {title}
          </h5>
          <p
            className="card-text"
            style={{
              color: mode === "dark" ? "#d1d5db" : "#555",
              minHeight: "90px",
            }}
          >
            {description}
          </p>

          <p className="card-text">
            {" "}
            <small
              style={{
                color: mode === "dark" ? "#9ca3af" : "#6c757d",
              }}
            >
              {" "}
              By <b>{!author ? "Unknown" : author}</b>
              <br /> {date ? new Date(date).toGMTString() : "Unknown Date"}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className={`btn btn-sm ${mode === "light" ? "btn-dark" : "btn-primary"}`}
          >
            Read More →
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
