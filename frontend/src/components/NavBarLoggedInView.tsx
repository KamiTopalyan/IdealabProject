import { Button, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as OrdersApi from "../network/orders_api";
import style from "../styles/App.module.css"
interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}

const NavBarLoggedInView = ({ user, onLogoutSuccessful }: NavBarLoggedInViewProps) => {

    async function logout() {
        try {
            await OrdersApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
    return (
        <>
            <Navbar.Text className={`me-2 ${style.navbarText}`}>
                Signed in as: {user.username}
            </Navbar.Text>
            <Button onClick={logout}>Log out</Button>
        </>
    );
}

export default NavBarLoggedInView;