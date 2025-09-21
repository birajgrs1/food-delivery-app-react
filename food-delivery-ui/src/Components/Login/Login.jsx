import { useContext, useState } from "react";
import "./Login.css";
import { RxCross1 } from "react-icons/rx";
import { StoreContext } from "../../Store/Contexts/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";
import validator from "validator";

const Login = ({ setShowLogin }) => {
  const { backendUrl, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login"); // "Login" or "Sign Up"
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // ---------- Frontend validation ----------
    if (!validator.isEmail(data.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (data.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (currentState === "Sign Up" && data.name.trim() === "") {
      toast.error("Name is required");
      return;
    }

    try {
      const endpoint =
        currentState === "Login"
          ? `${backendUrl}/api/user/login`
          : `${backendUrl}/api/user/register`;

      const payload =
        currentState === "Login"
          ? { email: data.email, password: data.password }
          : { name: data.name, email: data.email, password: data.password };

      const response = await axios.post(endpoint, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (currentState === "Login") {
        const token = response.data.accessToken;
        setToken(token); // save token in context
        localStorage.setItem("token", token); // persist token
        toast.success("Login successful");
        setShowLogin(false);
      } else {
        toast.success(response.data.message);
        setCurrentState("Login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Request failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-popup" onSubmit={onSubmit}>
        <div className="login-title">
          <h2>{currentState}</h2>
          <RxCross1 onClick={() => setShowLogin(false)} />
        </div>

        <div className="login-input-fields">
          {currentState === "Sign Up" && (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Your Name"
              required
            />
          )}
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Your Email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Password"
            required
          />
        </div>

        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="login-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
