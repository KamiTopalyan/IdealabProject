import styles from "../styles/Order.module.css";
import styleUtils from "../styles/utils.module.css";
import OrderStyles from "../styles/OrdersPage.module.css"
import { Button, Card } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Order as OrderModel } from "../models/order";
import { MdDelete } from "react-icons/md";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import { formatDate } from "../utils/formatDate";

interface OrderProps {
    OrderModel: OrderModel,
    onOrderClicked: (Order: OrderModel) => void,
    onDeleteOrderClicked: (Order: OrderModel) => void,
}

const Order = ({ OrderModel, onOrderClicked, onDeleteOrderClicked }: OrderProps) => {
    const {
        name,
        price,
        currency,
        countType,
        count,
        reason,
        url,
        notes,
        createdAt,
        updatedAt
    } = OrderModel;
    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(createdAt);
    }

    function viewFull() {

    }

    return (
        <Card
            className={`${styles.OrderCard}`}
            >
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.Row}>
                <Row className={styleUtils.width100}>
                        <Col xs={3}>
                            <div className={styles.OrderText}>
                                User: {name}
                            </div>
                        </Col>
                        <Col xs={3}>
                            <div className={styles.OrderText}>
                                Item Requested: {price.toLocaleString()}
                            </div>
                        </Col>
                        <Col xs={3}>
                            <div className={styles.OrderText}>
                                Total Cost: {(count as number) * (price as number) + " " + currency}
                                </div>
                        </Col>
                </Row>
                    <AiFillEye
                        className="text-muted"
                        onClick={() => onOrderClicked(OrderModel)}
                    />
                    <MdDelete
                        className="text-muted ms-auto"
                        onClick={(e) => {
                            onDeleteOrderClicked(OrderModel);
                            e.stopPropagation();
                        }}
                    />
                    
                </Card.Title>
                
                    
            </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    )
}

export default Order;