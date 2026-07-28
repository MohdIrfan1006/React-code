import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [mode, setMode] = useState("light");
  const [progress, setProgress] = useState(0);
  const [search, setSearch] = useState("");
  const [searchMode, setSearchMode] = useState(false);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#1a1a1a";
      document.body.style.color = "white";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    setSearchMode(true);
  };

  const clearSearch = () => {
    setSearch("");
    setSearchMode(false);
  };

  return (
    <div>
      <Router>
        <Navbar
          mode={mode}
          toggleMode={toggleMode}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
        />

        <LoadingBar
          color="#f80334"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          height={3}
        />

        <Switch>
          <Route exact path="/">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key={`general-${search}`}
              pageSize={pageSize}
              q={search || "india"}
              category="home"
              mode={mode}
              searchMode={searchMode}
            />
          </Route>

          <Route exact path="/business">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key={`business-${search}`}
              pageSize={pageSize}
              q={search || "business"}
              category="business"
              mode={mode}
              searchMode={searchMode}
            />
          </Route>

          <Route exact path="/science">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key={`science-${search}`}
              pageSize={pageSize}
              q={search || "science"}
              category="science"
              mode={mode}
              searchMode={searchMode}
            />
          </Route>

          <Route exact path="/health">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key={`health-${search}`}
              pageSize={pageSize}
              q={search || "health"}
              category="health"
              mode={mode}
              searchMode={searchMode}
            />
          </Route>

          <Route exact path="/sports">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key={`sports-${search}`}
              pageSize={pageSize}
              q={search || "sports"}
              category="sports"
              mode={mode}
              searchMode={searchMode}
            />
          </Route>

          <Route exact path="/technology">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key={`technology-${search}`}
              pageSize={pageSize}
              q={search || "technology"}
              category="technology"
              mode={mode}
              searchMode={searchMode}
            />
          </Route>

          <Route exact path="/entertainment">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key={`entertainment-${search}`}
              pageSize={pageSize}
              q={search || "entertainment"}
              category="entertainment"
              mode={mode}
              searchMode={searchMode}
            />
          </Route>

          <Route exact path="/general">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key={`general-${search}`}
              pageSize={pageSize}
              q={search || "general"}
              category="general"
              mode={mode}
              searchMode={searchMode}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
