import React from 'react';
import '../assets/styles/main.scss';

function NewsCard({ news }) {
  return (
    <div className="news-card">
      <h2>{news.title}</h2>
      <p><strong>Source:</strong> {news.source}</p>
      <a href={news.url} target="_blank" rel="noopener noreferrer">Read more</a>
    </div>
  );
}

export default NewsCard;
