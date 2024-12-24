// OrderDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HorizontalStepper from './HorizontalStepper';
import './OrderDetails.css'; // 引入CSS文件
import Loading from '../../Tools/Loading'; // 引入Loading組件
import { fetchOrderById } from '../../Tools/apiUtils'; // 引入新的API請求函數
import OrderDetailCard from './OrderDetailCard'; // 引入新元件

function OrderDetails() {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        setLoading(true); // 確保在開始加載時設置loading狀態
        async function loadOrder() {
            try {
                const data = await fetchOrderById(id);
                setOrder(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        loadOrder();
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!order) {
        return <div>訂單未找到</div>;
    }

    return (
        <div className='container'>
        {loading && <Loading />}
            <OrderDetailCard order={order} id={id} />
            <HorizontalStepper nodesData={order.nodesData} dateItems={order.dateItems} />
        </div>
    );
}

export default OrderDetails;
