import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import MyGanttChart from './Component/MyGanttChart';
import Table from './Component/Table';
import Navbar from './Component/Navbar';
import OrderDetails from './Component/OrderDetail/OrderDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from './Component/Login/Login'; // 引入 Login 組件
import QCmain from './Component/QCmain/QCmain'; // 引入 QCmain 組件

function App() {
  return (
    <Router>
      <div className="App">
        <ConditionalNavbar />
        <Routes>
          {/* 如果路徑為根路徑 /，則跳轉到登入頁面 */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          {/* 添加 QCmain 頁面的路由 */}
          <Route path="/QCmain" element={<QCmain />} />
        </Routes>
      </div>
    </Router>
  );
}

// 這個組件負責根據當前路徑來決定是否顯示 Navbar
function ConditionalNavbar() {
  const location = useLocation();

  // 如果當前路徑是 /login，則不顯示 Navbar
  if (location.pathname === '/login') {
    return null;
  }

  // 其他頁面顯示 Navbar
  return <Navbar />;
}

export default App;
