import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Order as OrderModel } from '../models/order';
import * as OrdersApi from "../network/orders_api";
import styles from "../styles/Order.module.css";
import styleUtils from "../styles/utils.module.css";
import ViewOrderData from './ViewOrderData';
import Order from './Order';

const OrdersPageLoggedInView = () => {

    const [orders, setOrders] = useState<OrderModel[]>([]);
    const [ordersLoading, OrdersLoading] = useState(true);
    const [showOrdersLoadingError, setOrdersLoadingError] = useState(false);

    const [showAddOrderDialog, setShowAddOrderDialog] = useState(false);
    const [orderToView, setOrderToView] = useState<OrderModel | null>(null);

    useEffect(() => {
        async function Orders() {
            try {
                setOrdersLoadingError(false);
                OrdersLoading(true);
                const orders = await OrdersApi.fetchOrders();
                setOrders(orders);
            } catch (error) {
                console.error(error);
                setOrdersLoadingError(true);
            } finally {
                OrdersLoading(false);
            }
        }
        Orders();
    }, []);
    
    async function deleteOrder(order: OrderModel) {
        try {
            await OrdersApi.deleteOrder(order._id);
            setOrders(orders.filter(existingOrder => existingOrder._id !== order._id));
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    const ordersGrid =
        <Row className={`g-4 ${styles.OrderListGrid}`}>
            {orders.map(order => (
                <div key={order._id}>
                    <Order
                        OrderModel={order}
                        onOrderClicked={() => {
                            setOrderToView(order)
                            setShowAddOrderDialog(true)
                        }}
                        onDeleteOrderClicked={deleteOrder}
                    />
                </div>
            ))}
        </Row>

    return (
        <>
            {ordersLoading && <Spinner animation='border' variant='primary' />}
            {showOrdersLoadingError && <p>Something went wrong. Please refresh the page.</p>}
            {!ordersLoading && !showOrdersLoadingError &&
                <>
                    {orders.length > 0
                        ? ordersGrid
                        : <p>You don't have any orders yet</p>
                    }
                </>
            }
            {showAddOrderDialog &&
                <ViewOrderData
                    orderToView={orderToView}
                    onDismiss={() => setShowAddOrderDialog(false)}
                />
            }
        </>
    );
}

export default OrdersPageLoggedInView;