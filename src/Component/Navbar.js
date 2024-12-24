import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation(); // 獲取當前路徑

  // 根據當前路徑動態決定首頁按鈕的目標路徑
  const getHomeLink = () => {
    if (location.pathname === '/ChiMei') {
      return '/ChiMei';
    }
    return '/'; // 預設為根路徑
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/logo192.png" alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
          奇菱科技 - 實驗室QC系統
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to={getHomeLink()}>
                <i className="fas fa-home" style={{ marginRight: '5px' }}></i>
                首頁
              </Link>
            </li>
            {/* 其他導航項目 */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
