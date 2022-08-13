import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    const updatePage = async () => {
        props.setProgress(20);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        setLoading(true);

        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json()
        props.setProgress(70);

        // console.log(parsedData);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults)
        setLoading(false)


        props.setProgress(100);

    }


    useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updatePage();
        // eslint-disable-next-line
    }, [])




    // handlePrevClick = async () => {
    //     setPage(page - 1)
    //     updatePage();
    // }

    // handleNextClick = async () => {
    //     setPage(page - 1)
    //     updatePage();
    // }


    const fetchMoreData = async () => {
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;

        setPage(page+1)

        // setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json()
        // console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        console.log(articles.length);
        setTotalResults(parsedData.totalResults)
      
    };

    // console.log("render");
    return (
        <>
            <h1 className="text-center" style={{margin: '35px 0px', marginTop: '90px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>

            {loading && <Spinner />}
            <InfiniteScroll
                dataLength = {articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""}
                                    description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://images.hindustantimes.com/img/2022/08/01/1600x900/Breaking-News-Live-Blog-pic_1659344514055_1659344519527_1659344519527.jpg"}
                                    newsUrl={element.url} author={element.author ? element.author : "Unknown"} publishedAt={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>


            {/* <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>

                    <button disabled={page >= Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}
        </>
    );

}



News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}


export default News;
