import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const [search, setSearch] = React.useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (search.trim() === "") return;

    props.handleSearch(search);

    setSearch("");
  };

  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode} shadow-sm`}
        style={{
          transition: "0.4s",
          padding: "12px 20px",
        }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand fw-bold fs-3"
            to="/"
            style={{
              color: props.mode === "dark" ? "#0dcaf0" : "#0d6efd",
            }}
          >
            📰 QuickNews
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link fw-semibold"
                  to="/"
                  onClick={props.clearSearch}
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link fw-semibold"
                  to="/business"
                  onClick={props.clearSearch}
                >
                  Business
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link fw-semibold"
                  to="/entertainment"
                  onClick={props.clearSearch}
                >
                  Entertainment
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link fw-semibold"
                  to="/general"
                  onClick={props.clearSearch}
                >
                  General
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link fw-semibold"
                  to="/health"
                  onClick={props.clearSearch}
                >
                  Health
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link fw-semibold"
                  to="/science"
                  onClick={props.clearSearch}
                >
                  Science
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link fw-semibold"
                  to="/sports"
                  onClick={props.clearSearch}
                >
                  Sports
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link fw-semibold"
                  to="/technology"
                  onClick={props.clearSearch}
                >
                  Technology
                </Link>
              </li>
            </ul>

            {/* Search Bar */}
            <form
              className="d-flex align-items-center ms-auto me-3"
              onSubmit={handleSubmit}
            >
              <input
                className="form-control rounded-pill px-3"
                type="search"
                placeholder="Search News..."
                value={search}
                onChange={handleChange}
                style={{
                  width: "280px",
                  height: "30px",
                  border: "2px solid #0d6efd",
                  boxShadow: "none",
                }}
              />

              <button
                className="btn btn-primary rounded-pill ms-2 px-4"
                type="submit"
                style={{
                  height: "30px",
                  fontWeight: "500",
                  fontSize: "13px",
                }}
              >
                Search
              </button>
            </form>

            {/* Dark Mode */}
            <div
              className={`form-check form-switch text-${
                props.mode === "light" ? "dark" : "light"
              } d-flex align-items-center`}
            >
              <input
                className="form-check-input me-2"
                type="checkbox"
                onChange={props.toggleMode}
                checked={props.mode === "dark"}
                style={{
                  cursor: "pointer",
                  transform: "scale(1.4)",
                }}
              />

              <label
                className="form-check-label fw-bold"
                style={{
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                {props.mode === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
              </label>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  mode: PropTypes.string,
  toggleMode: PropTypes.func,
  handleSearch: PropTypes.func,
  clearSearch: PropTypes.func,
};
export default Navbar;
