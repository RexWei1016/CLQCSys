import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              訂單列表
            </div>
            <div className="card-body">
              <Link to="/" className="btn btn-primary">查看訂單</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              甘特圖
            </div>
            <div className="card-body">
              <Link to="/gantSample" className="btn btn-primary">查看甘特圖</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
