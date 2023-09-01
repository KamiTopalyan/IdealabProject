import { Container } from "react-bootstrap";
import OrderDownloadLoggedInView from "../components/OrderDownloadLoggedInView";
import OrderDownloadLoggedOutView from "../components/OrderDownloadLoggedOutView";
import { User } from "../models/user";
import styles from "../styles/Order.module.css";

interface OrdersInputPageProps {
  loggedInUser: User | null;
}

const OrdersInputPage = ({ loggedInUser }: OrdersInputPageProps) => {
  return (
    <Container className={styles.OrderListPage}>
      <>
        {loggedInUser && loggedInUser.isAdmin ? (
          <OrderDownloadLoggedInView />
        ) : (
          <OrderDownloadLoggedOutView />
        )}
      </>
    </Container>
  );
};

export default OrdersInputPage;
