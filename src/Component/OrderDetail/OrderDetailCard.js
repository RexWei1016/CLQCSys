import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrderDetailCard({ order, id }) {
    const navigate = useNavigate(); // 使用 useNavigate 來進行程式化導航

    return (
        <div className="card">
            <div className="card-header">
                <i className="fas fa-receipt"></i> 訂單明細 ID: {id}
            </div>
            <div className="card-body">
                <div className="order-info">
                    <div className="info-column">
                        <div className="info-item">
                            <i className="fas fa-file-alt"></i> <strong>訂單號:</strong> {order.order}
                        </div>
                        <div className="info-item">
                            <i className="fas fa-briefcase"></i> <strong>工單號:</strong> {order.workNo}
                        </div>
                        <div className="info-item">
                            <i className="fas fa-info-circle"></i> <strong>目前狀態:</strong> {order.currentState}
                        </div>
                        <div className="info-item">
                            <i className="fas fa-calendar-day"></i> <strong>訂單日期:</strong> {order.orderDate}
                        </div>
                    </div>
                    <div className="info-column">
                        <div className="info-item">
                            <i className="fas fa-calendar-alt"></i> <strong>交貨日期:</strong> {order.deliveryDate}
                        </div>
                        <div className="info-item">
                            <i className="fas fa-hourglass-half"></i> <strong>剩餘天數:</strong> {order.remainingDays}
                        </div>
                        <div className="info-item">
                            <i className="fas fa-tag"></i> <strong>料號:</strong> {order.pdctNo}
                        </div>
                        <div className="info-item">
                            <i className="fas fa-palette"></i> <strong>色號:</strong> {order.colorNo}
                        </div>
                    </div>
                </div>
                <button onClick={() => navigate(-1)} className="btn btn-primary">
                    <i className="fas fa-arrow-left"></i> 返回
                </button>
            </div>
        </div>
    );
}

export default OrderDetailCard;
