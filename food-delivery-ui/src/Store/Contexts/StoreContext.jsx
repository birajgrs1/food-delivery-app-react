import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { food_list } from "../../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [food_list, setFoodList] = useState([]);

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      fetchUserData();
      fetchCartFromServer();
    } else {
      localStorage.removeItem("token");
      setUser(null);
      setCartItems({});
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (err) {
      console.error("Fetch user error:", err.message);
      setToken(null);
    }
  };

  const fetchCartFromServer = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/cart/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.cartData) {
        setCartItems(res.data.cartData);
      }
    } catch (err) {
      console.error("Fetch cart error:", err.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/user/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch {
      console.error("Logout failed");
    }
    setToken(null);
    setUser(null);
    setCartItems({});
  };

  // const addToCart = (itemId) => {
  //   setCartItems((prev) => ({
  //     ...prev,
  //     [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
  //   }));
  // };

  // ========================== ADD TO CART ==========================
const addToCart = async (itemId) => {
  // Optimistically update UI
  setCartItems((prev) => ({
    ...prev,
    [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
  }));

  if (!token) return;

  try {
    await axios.post(
      `${backendUrl}/api/cart/add`,
      { itemId }, // only send itemId
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.error("Add to cart error:", err.response?.data?.message || err.message);
  }
};

// ========================== REMOVE FROM CART ==========================
const removeFromCart = async (itemId) => {
  // Optimistically update UI
  setCartItems((prev) => {
    const newCount = (prev[itemId] || 0) - 1;
    if (newCount > 0) {
      return { ...prev, [itemId]: newCount };
    } else {
      const { [itemId]: _, ...rest } = prev;
      return rest;
    }
  });

  if (!token) return;

  try {
    await axios.post(
      `${backendUrl}/api/cart/remove`,
      { itemId }, // only send itemId
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.error("Remove from cart error:", err.response?.data?.message || err.message);
  }
};

// ========================== FETCH CART FROM SERVER ==========================
const loadCartData = async () => {
  if (!token) return;

  try {
    const res = await axios.get(`${backendUrl}/api/cart/get`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.cartData) {
      setCartItems(res.data.cartData);
    }
  } catch (err) {
    console.error("Fetch cart error:", err.response?.data?.message || err.message);
  }
};


  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/food/list`);
      setFoodList(res.data);
    } catch (err) {
      console.error("Fetch food list error:", err.message);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    backendUrl,
    token,
    setToken,
    user,
    logout,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

StoreContextProvider.propTypes = {
  children: PropTypes.node,
};

export default StoreContextProvider;
