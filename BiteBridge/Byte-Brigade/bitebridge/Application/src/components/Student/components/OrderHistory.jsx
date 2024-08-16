import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance'; // Adjust the import path as needed
// import '../styles/OrderHistory.css'; // Create a CSS file for styling if needed

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch the order history data from the backend
        const fetchOrderHistory = async () => {
            try {
                const response = await axiosInstance.get('/student/history'); // Adjust endpoint as needed
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching order history:', error);
            }
        };

        fetchOrderHistory();
    }, []);

    return (
        <div className="order-history">
            <h2>Order History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Status</th>
                        <th>Time</th>
                        <th>Total Price</th>
                        <th>Items</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.orderStatus}</td>
                            <td>{new Date(order.timeStamp).toLocaleString()}</td>
                            <td>{order.totalCartPrice}</td>
                            <td>
                                <ul>
                                    {order.cartItemDTO.map(item => (
                                        <li key={item.dishName}>
                                            {item.dishName} - {item.quantity} x ₹{item.price} = ₹{item.totalPrice}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderHistory;
