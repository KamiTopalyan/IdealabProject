import styles from "../styles/Order.module.css";
import styleUtils from "../styles/utils.module.css";
import OrderStyles from "../styles/OrdersPage.module.css"
import { Card } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Order as OrderModel } from "../models/order";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
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
        count,
        createdAt,
        updatedAt
    } = OrderModel;
    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(createdAt);
    }

    return (
        <Card
            className={`${styles.OrderCard}`}
            >
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.Row}>
                <Row className={styleUtils.width100}>
                <Col xs={4}>
                    <div className={styles.OrderText}>
                        Name: {name}
                    </div>
                </Col>
                <Col xs={4}>
                    <div className={styles.OrderText}>
                        Price: {price.toLocaleString()}
                    </div>
                </Col>
                <Col xs={4}>
                <div className={styles.OrderText}>
                    Count: {count.toLocaleString()}
                    </div>
                </Col>
                </Row>
                    <MdDelete
                        className="text-muted ms-auto"
                        onClick={(e) => {
                            onDeleteOrderClicked(OrderModel);
                            e.stopPropagation();
                        }}
                    />
                    <AiFillEdit
                        className="text-muted"
                        onClick={() => onOrderClicked(OrderModel)}
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