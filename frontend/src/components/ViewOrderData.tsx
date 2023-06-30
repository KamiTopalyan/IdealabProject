import { Button, Modal } from "react-bootstrap";
import { Order } from "../models/order";
import OrderStyle from "../styles/Order.module.css"
interface orderToViewProps {
    orderToView: Order | null,
    onDismiss: () => void,
}   

const ViewOrderData = ({ orderToView, onDismiss}: orderToViewProps) => {

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {orderToView?.user}'s request
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className={OrderStyle.OrderText}>
                <p>Item Requested: {orderToView?.name}</p>
                <p>Count: {orderToView?.count.toString()}</p>
                <p>Type of Count: {orderToView?.countType}</p>
                <p>Price: {orderToView?.price.toString()}</p>
                <p>Currency: {orderToView?.currency}</p>
                <p>Reason for request: {orderToView?.reason}</p>
                <p>Extra Notes: {orderToView?.notes}</p>
            </Modal.Body>
        </Modal>
    );
}

export default ViewOrderData;