import {getLoggedInUser} from "../network/orders_api"
export default async function checkIfAdmin(){
    const user = await getLoggedInUser()
    return user["isAdmin"]
}