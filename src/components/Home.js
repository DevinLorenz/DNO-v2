import React from 'react';
import './styling/Home.css';

const Home = () => {
  return (
    <div className="home-bg">
      <div className="news-box">
        <div className="news-title">News and Updates</div>
        <div className="news-content"></div>
      </div>
      <div className="favorite-box">
        <div className="favorite-title">Favorite NPCs</div>
        <div className="favorite-content"></div>
      </div>
    </div>
  );
};

export default Home;
