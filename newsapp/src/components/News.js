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

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    let query;

    if (props.searchMode && props.q !== "") {
      query = props.q;
    } else if (props.category === "general") {
      query = "india";
    } else {
      query = props.category;
    }

    const url = `https://newsapi.org/v2/everything?q=${query}&page=1&pageSize=${props.pageSize}&apiKey=${props.apiKey}`;

    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(60);

    setArticles(parsedData.articles || []);
    setTotalResults(parsedData.totalResults || 0);
    setPage(1);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `QuickNews - ${capitalizeFirstLetter(props.category)}`;
    updateNews();
    //eslint-disable-next-line
  }, [props.q, props.category]);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    let query;

    if (props.searchMode && props.q !== "") {
      query = props.q;
    } else if (props.category === "general") {
      query = "india";
    } else {
      query = props.category;
    }

    const url = `https://newsapi.org/v2/everything?q=${query}&page=${nextPage}&pageSize=${props.pageSize}&apiKey=${props.apiKey}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles || []));
    setTotalResults(parsedData.totalResults || 0);
    setPage(nextPage);
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
        style={{ margin: "20px 0", marginTop: "45px" }}
      >
        {props.category === "search"
          ? `Search Results for "${props.q}"`
          : `QuickNews - Top ${capitalizeFirstLetter(props.category)} Headlines`}
      </h2>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => {
              return (
                <div className="col-md-4" key={`${element.url}-${index}`}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
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
  pageSize: 5,
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
