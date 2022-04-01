import React, { useState,useEffect } from 'react';
import '../../App.css';
import './NewsSection.css';

import img from "../assets/covid.jpg";
const NewsSection = () => {
    const [newsLists, setNewsLists] = useState([]);

    useEffect(() => {
        const fetchCovidNews = () => {
            fetch(`https://gnews.io/api/v4/search?q=coronavirus&lang=en&token=22297eb9a367614db70ffe887fa4972f`)
            .then( response => response.json() )
            .then( data => {
                const newsDataList = data['articles'].map( newsData => ({
                    author: newsData.source.name,
                    title: newsData.title,
                    description: newsData.content,
                    url: newsData.source.url,
                    imagePath: (newsData.image==null ? img : newsData.image),
                }));
                    
                setNewsLists(newsDataList);
            } );
        };

        fetchCovidNews();
    }, []);

    return ( 
        <div className="card-wrapper news-container">
            <h1>Recent Covid-19 news</h1>
            <div className="recentNews-container">
            {newsLists.map( (news,index) => (
                <div key={index} className="news">
                    <img src={news.imagePath} />
                    <div className="newsText">
                        <p className="newsText-title">
                            {news.title}
                        </p>
                        <p className="newsText-body">
                            {news.description} 
                        </p>
                        <div className="flex-display flex-spaceBetween">
                            <button className="learnMore-btn"><a href={news.url}>Learn More</a></button>
                            <p className="newsText-author">
                                {news.author!=null && "Author: " + news.author}
                            </p>
                        </div>
                    </div>
                </div>
            ))}     
            </div>
        </div>
    );
}
 
export default NewsSection;