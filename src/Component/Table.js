import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Table.css';
import { fetchOrders, fetchOrdersWithNumericPdctNo } from '../Tools/apiUtils'; // 引入不同的API請求函數
import Loading from '../Tools/Loading'; // 引入Loading組件

const Table = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const location = useLocation(); // 獲取當前路徑

  useEffect(() => {
    async function loadOrders() {
      try {
        let data;
        if (location.pathname == '/Table' || location.pathname == '/table') {
          data = await fetchOrders(); // 根據根路徑請求所有訂單
        } else if (location.pathname === '/ChiMei') {
          data = await fetchOrdersWithNumericPdctNo(); // 根據 /ChiMei 路徑請求特定訂單
        }
        
      // 確保 data 為陣列，否則賦予空陣列
      setOrders(Array.isArray(data) ? data : []);
        // setOrders(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, [location.pathname]); // 當路徑變化時重新加載數據

  const getColorByDays = (days) => {
    if (days < -10) return 'table-danger';
    if (days <= 5) return 'table-danger';
    if (days <= 10) return 'table-primary';
    return 'table-success';
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const displayRemainingDays = (days) => {
    if (days < 0) {
      return <span style={{ color: 'red' }}>逾期 {-days} 日</span>;
    }
    return days;
  };

  const filteredOrders = orders.filter(order =>
    order.order.toLowerCase().includes(search) || 
    order.workNo.toLowerCase().includes(search) || 
    order.currentState.toLowerCase().includes(search)
  );

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="App container mt-5">
      <input 
        type="text" 
        className="form-control mb-3" 
        placeholder="搜尋訂單、工單或目前狀態..." 
        onChange={handleSearchChange}
      />
      <div className="tableFixHead">
        <table className="table">
        <thead>
          <tr>
            <th>訂單號</th>
            <th>訂單項次</th>
            <th>工單號</th>
            <th>料號</th>
            <th>色號</th>
            <th>排程起訖</th>
            <th>目前狀態</th>
            <th>訂單初始日</th>
            <th>訂單交貨日</th>
            <th>剩餘天數</th>
            <th>客戶PO</th>
            <th>明細查看</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.map(order => (
            <tr 
              key={order.id}
              className={getColorByDays(order.remainingDays)} 
            >
              <td>{order.order}</td>
              <td>{order.orderLine}</td>
              <td>{order.workNo}</td>
              <td>{order.pdctNo}</td>
              <td>{order.colorNo}</td>
              <td>{order.sded || 'N/A'}</td>
              <td>{order.currentState}</td>
              <td>{order.orderDate}</td>
              <td>{order.deliveryDate}</td>
              <td>{displayRemainingDays(order.remainingDays)}</td>
              <td>{order.custPoNo || 'N/A'}</td> {/* 顯示客戶訂單號，若為 null 則顯示 'N/A' */}
              <td>
                <Link to={{ pathname: `/order/${order.id}`, state: { order } }} className="btn btn-primary mb-2">
                  查看明細
                </Link>
              </td>
            </tr>
          ))}
        </tbody>

        </table>
      </div>
    </div>
  );
}

export default Table;
