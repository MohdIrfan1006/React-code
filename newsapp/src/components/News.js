import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const apiKey = process.env.REACT_APP_GNEWS_API || props.apiKey;

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getQuery = () => {
    if (props.searchMode && props.q && props.q.trim() !== "") {
      return props.q.trim();
    } else if (props.category === "home" || props.category === "general") {
      return "india";
    } else {
      return props.category || "india";
    }
  };

  const removeDuplicates = (articlesList) => {
    return articlesList.filter(
      (item, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.url === item.url ||
            (t.title &&
              item.title &&
              t.title.toLowerCase().trim() === item.title.toLowerCase().trim()),
        ),
    );
  };

  const updateNews = async () => {
    if (props.setProgress) props.setProgress(10);
    const query = encodeURIComponent(getQuery());
    const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&max=${props.pageSize}&page=1&apikey=${apiKey}`;

    setLoading(true);
    setErrorMsg("");

    try {
      let data = await fetch(url);
      if (props.setProgress) props.setProgress(30);

      if (!data.ok) {
        throw new Error(`API Error Status: ${data.status}`);
      }

      let parsedData = await data.json();
      if (props.setProgress) props.setProgress(60);

      if (parsedData.articles) {
        const cleanArticles = removeDuplicates(parsedData.articles);
        setArticles(cleanArticles);
        setTotalResults(
          parsedData.totalArticles || parsedData.totalResults || 0,
        );
        setPage(1);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setErrorMsg();
    } finally {
      setLoading(false);
      if (props.setProgress) props.setProgress(100);
    }
  };

  useEffect(() => {
    document.title = `QuickNews - ${capitalizeFirstLetter(props.category)}`;
    updateNews();
    // eslint-disable-next-line
  }, [props.q, props.category]);

  const fetchMoreData = async () => {
    if (articles.length >= totalResults) return;

    const nextPage = page + 1;
    const query = encodeURIComponent(getQuery());
    const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&max=${props.pageSize}&page=${nextPage}&apikey=${apiKey}`;
    try {
      let data = await fetch(url);
      if (!data.ok) return;

      let parsedData = await data.json();

      if (parsedData.articles && parsedData.articles.length > 0) {
        setArticles((prevArticles) => {
          const combined = [...prevArticles, ...parsedData.articles];
          return removeDuplicates(combined);
        });
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Fetch More Error:", error);
    }
  };

  return (
    <div
      className="container my-3"
      style={{
        color: props.mode === "dark" ? "white" : "black",
      }}
    >
      <h2
        className="text-center"
        style={{ margin: "20px 0", marginTop: "90px" }}
      >
        {props.category === "search"
          ? `Search Results for "${props.q}"`
          : `QuickNews - Top ${capitalizeFirstLetter(props.category)} Headlines`}
      </h2>

      {loading && <Spinner />}

      {errorMsg && !loading && (
        <div className="alert alert-danger text-center my-4" role="alert">
          {errorMsg}
        </div>
      )}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={articles.length < totalResults ? <Spinner /> : null}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => {
              return (
                <div className="col-md-4" key={`${element.url}-${index}`}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.image || element.urlToImage}
                    newsUrl={element.url}
                    author={element.author || element.source?.name}
                    date={element.publishedAt}
                    source={element.source?.name}
                    mode={props.mode}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  q: "india",
  pageSize: 6,
  category: "general",
  mode: "light",
  searchMode: false,
};

News.propTypes = {
  q: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  mode: PropTypes.string,
  apiKey: PropTypes.string,
  setProgress: PropTypes.func,
  searchMode: PropTypes.bool,
};

export default News;
