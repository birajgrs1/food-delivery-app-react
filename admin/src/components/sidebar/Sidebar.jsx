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
        <div className="sidebar-option">
          <PlusIcon className="icon" />
          <span className="label">Add Item</span>
        </div>
        <div className="sidebar-option">
          <ListBulletIcon className="icon" />
          <span className="label">List Items</span>
        </div>
        <div className="sidebar-option">
          <ClipboardDocumentListIcon className="icon" />
          <span className="label">Orders</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
