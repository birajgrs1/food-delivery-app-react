import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ArrowPathIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); 

  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.post(`${url}/api/order/update`, {
        status: newStatus,
      });
      if (response.data.success) {
        toast.success("Order status updated!");
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  const renderStatusChip = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="status-chip pending">
            <ClockIcon className="status-icon" /> Pending
          </span>
        );
      case "delivered":
        return (
          <span className="status-chip delivered">
            <CheckCircleIcon className="status-icon" /> Delivered
          </span>
        );
      case "cancelled":
        return (
          <span className="status-chip cancelled">
            <XCircleIcon className="status-icon" /> Cancelled
          </span>
        );
      default:
        return status;
    }
  };

  const statusOptions = [
    { value: "pending", label: "Pending", icon: ClockIcon },
    { value: "delivered", label: "Delivered", icon: CheckCircleIcon },
    { value: "cancelled", label: "Cancelled", icon: XCircleIcon },
  ];

  return (
    <div className="list">
      <div className="list-header">
        <h2>Orders</h2>
        <button className="refresh-btn" onClick={fetchAllOrders}>
          <ArrowPathIcon className="refresh-icon" />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="no-items">
          <TruckIcon className="no-items-icon" />
          <p>No orders found</p>
        </div>
      ) : (
        <div className="list-table">
          <div className="list-table-format title">
            <span>Items</span>
            <span>Customer</span>
            <span>Address</span>
            <span>Total</span>
            <span>Status</span>
          </div>

          {orders.map((order) => (
            <div className="list-table-format" key={order._id}>
              <span className="item-name">
                {order.items
                  .map((item) => `${item.name} x${item.quantity}`)
                  .join(", ")}
              </span>
              <span>
                {order.address.firstName} {order.address.lastName}
                <br />
                {order.address.phone}
              </span>
              <span>
                {order.address.address}, {order.address.city},{" "}
                {order.address.state} - {order.address.zip}
              </span>
              <span className="item-price">${order.amount}</span>
              <span className="status-cell">
                {renderStatusChip(order.status)}

                {/* Custom Dropdown */}
                <div
                  className="dropdown"
                  onClick={() =>
                    setOpenMenu(openMenu === order._id ? null : order._id)
                  }
                >
                  <button className="dropdown-btn">
                    Change Status <ChevronDownIcon className="chevron" />
                  </button>
                  {openMenu === order._id && (
                    <div className="dropdown-menu">
                      {statusOptions.map((opt) => (
                        <div
                          key={opt.value}
                          className="dropdown-item"
                          onClick={() => {
                            handleStatusChange(order._id, opt.value);
                            setOpenMenu(null);
                          }}
                        >
                          <opt.icon className="dropdown-icon" />
                          {opt.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
