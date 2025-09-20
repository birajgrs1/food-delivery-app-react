import "./List.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/food/list`);
      if (response.data && Array.isArray(response.data)) {
        setList(response.data);
      } else {
        setList([]);
        toast.info("No food items available.");
      }
    } catch (error) {
      toast.error("Failed to fetch list.");
      console.error("Error fetching list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      await axios.post(`${backendUrl}/api/food/remove`, { id });
      toast.success("Item deleted successfully.");
      fetchList();
    } catch (error) {
      toast.error("Failed to delete item.");
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (loading) {
    return (
      <div className="list add flex-col">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading food items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list add flex-col">
      <div className="list-header">
        <h2>All Foods List</h2>
        <button onClick={fetchList} className="refresh-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="refresh-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          Refresh
        </button>
      </div>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.length === 0 ? (
          <div className="no-items">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="no-items-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
            <p>No food items found.</p>
            <button onClick={fetchList} className="try-again-btn">
              Try Again
            </button>
          </div>
        ) : (
          list.map((item) => (
            <div className="list-table-format" key={item._id}>
              <div className="image-cell">
                <img
                  src={`${backendUrl}/images/${item.image}`}
                  alt={item.name}
                  className="list-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/no-image.png";
                  }}
                />
              </div>

              <span className="item-name">{item.name}</span>
              <span className="item-category">{item.category}</span>
              <span className="item-price">${item.price}</span>

              <div className="action-buttons">
                <button
                  onClick={() => handleDelete(item._id, item.name)}
                  className="delete-btn"
                  title="Delete"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
