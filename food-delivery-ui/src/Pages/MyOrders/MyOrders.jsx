import { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../Store/Contexts/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { token, backendUrl } = useContext(StoreContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/order/userorders`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (token) fetchOrders(); 
  }, [token, backendUrl]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {data.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="orders-container">
          {data.map((item) => (
            <div key={item._id} className="order-card">
              <div className="order-left">
                <img src={assets.parcel_icon} alt="Parcel Icon" />
                <div>
                  <p className="order-id">#{item._id.slice(-6)}</p>
                  <p className="order-date">{formatDate(item.date)}</p>
                </div>
              </div>
              <div className="order-right">
                <span className={`status-badge ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
                <p className="order-total">${item.total.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
