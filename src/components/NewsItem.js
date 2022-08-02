import React, { Component } from 'react';

export class NewsItem extends Component {




    render() {

        let { title, description, imageUrl, newsUrl, author, publishedAt, source } = this.props;

        return (
            <div className='my-3'>

                <div className="card">
                    <span className="position-absolute top-0 start-90 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: 1}}>
                        {source}
                    </span>
                    <img src={imageUrl} alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className='text-muted'>By {author} on {new Date(publishedAt).toGMTString()}</small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem;