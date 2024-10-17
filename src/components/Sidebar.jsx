import "./Sidebar.css";
import crm_logo from './kisspng-customer-relationship-management-application-softw-commit-to-using-your-crm-in-2-17-with-these-4-stra-5b80080f356e02.6268847915351173272189.png';
import { MdBorderColor } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { RxExit } from "react-icons/rx";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">
            <img src={crm_logo} alt="logo" className="logo"/>
            <ul>
                <li>
                    <Link to='/'><MdBorderColor />Дэшборды</Link>
                </li>

                <li>
                    <Link to='/applications'><MdBorderColor />Заявки</Link>
                </li>

                <li>
                    <Link to='/users'><HiUsers />Пользователи</Link>
                </li>

                <li>
                    <Link><RxExit />Выход</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;