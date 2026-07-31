import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source, mode } =
    props;

  // Safe Date Formatter
  const formatDate = (dateStr) => {
    if (!dateStr) return "Unknown Date";
    try {
      const parsedDate = new Date(dateStr);
      return isNaN(parsedDate.getTime())
        ? "Unknown Date"
        : parsedDate.toUTCString();
    } catch (e) {
      return "Unknown Date";
    }
  };

  // Safe Image Fallback Handler
  const handleImageError = (e) => {
    e.target.onerror = null; // Infinite loop rokne ke liye
    e.target.src = "https://picsum.photos/300/200";
  };

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
          margin: "0 auto",
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
          {source || "News"}
        </span>

        <img
          src={imageUrl ? imageUrl : "https://picsum.photos/300/200"}
          onError={handleImageError}
          className="card-img-top"
          alt="News"
          style={{ height: "200px", objectFit: "cover" }}
        />

        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5
              className="card-title fw-bold"
              style={{ minHeight: "50px", fontSize: "1rem" }}
            >
              {title
                ? title.length > 60
                  ? title.slice(0, 60) + "..."
                  : title
                : "No Title Available"}
            </h5>
            <p
              className="card-text"
              style={{
                color: mode === "dark" ? "#d1d5db" : "#555",
                minHeight: "70px",
                fontSize: "0.875rem",
              }}
            >
              {description
                ? description.length > 90
                  ? description.slice(0, 90) + "..."
                  : description
                : "Click Read More to view details about this news article."}
            </p>
          </div>

          <div>
            <p className="card-text mb-2">
              <small
                style={{
                  color: mode === "dark" ? "#9ca3af" : "#6c757d",
                }}
              >
                By <b>{!author ? "Unknown" : author}</b>
                <br />
                {formatDate(date)}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className={`btn btn-sm ${
                mode === "light" ? "btn-dark" : "btn-primary"
              }`}
            >
              Read More →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
