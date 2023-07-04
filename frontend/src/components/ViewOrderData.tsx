import { Button, Modal } from "react-bootstrap";
import { Order } from "../models/order";
import OrderStyle from "../styles/Order.module.css"
import * as OrdersApi from "../network/orders_api";
import checkIfAdmin from "../utils/checkIfAdmin";import { User } from "../models/user";
interface orderToViewProps {
    orderToView: Order | null,
    onDismiss: () => void,
    loggedInUser: User | null,
    
}   

const ViewOrderData = ({ orderToView, onDismiss, loggedInUser}: orderToViewProps) => {
    
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

            <Modal.Footer>
                <Button variant="danger"
                        onClick={() => {
                            if(orderToView) {
                                OrdersApi.deleteOrder(orderToView._id)
                                onDismiss();
                        }}}
                >
                    Delete
                </Button>
                {loggedInUser?.isAdmin &&
                    <Button variant="success"
                        onClick={() => {
                            if(orderToView) {
                                OrdersApi.approveOrder(orderToView._id)
                                onDismiss();
                            }}}
                    >
                        Approve
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    );
}

export default ViewOrderData;