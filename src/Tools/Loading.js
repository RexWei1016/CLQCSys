import React from 'react';
import './Loading.css'; // 引入Loading的樣式

const Loading = () => (
  <div className="loading-overlay">
    <div className="spinner-border" role="status"></div>
    <div className="loading-text">Loading...</div>
  </div>
);

export default Loading;
