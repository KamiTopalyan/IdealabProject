import { Container } from "react-bootstrap";
import OrderInputLoggedInView from "../components/OrderInputLoggedInView";
import OrderInputLoggedOutView from "../components/OrderInputLoggedOutView";
import { User } from "../models/user";
import styles from "../styles/Order.module.css";

interface OrdersInputPageProps {
    loggedInUser: User | null,
}

const OrdersInputPage = ({ loggedInUser }: OrdersInputPageProps) => {
    return (
        <Container className={styles.OrderListPage}>
            <>
                {loggedInUser
                    ? <OrderInputLoggedInView />
                    : <OrderInputLoggedOutView />
                }
            </>
        </Container>
    );
}

export default OrdersInputPage;