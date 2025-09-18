import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import {
  PlusIcon,
  ListBulletIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to={"/add"} className="sidebar-option">
          <PlusIcon className="icon" />
          <span className="label">Add Item</span>
        </NavLink>
        <NavLink to={"/list"} className="sidebar-option">
          <ListBulletIcon className="icon" />
          <span className="label">List Items</span>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <ClipboardDocumentListIcon className="icon" />
          <span className="label">Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
