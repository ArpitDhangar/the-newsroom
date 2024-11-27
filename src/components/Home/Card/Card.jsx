import React from 'react';
import './Card.scss';

const Card = ({ headlines, onClick, source }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-heading">
        <h1>{source || 'Unknown Source'}</h1> {/* Display newspaper name */}
      </div>
      <div className="news-headlines">
        {headlines.slice(0, 5).map((headline, index) => ( // Show first 5 headlines
          <p key={index} className="headline-item">{headline}</p>
        ))}
      </div>
    </div>
  );
};

export default Card;
