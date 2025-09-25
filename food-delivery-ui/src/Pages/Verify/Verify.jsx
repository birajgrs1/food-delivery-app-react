import { useNavigate, useSearchParams } from "react-router-dom";
import "./Verify.css"
import { useContext } from "react";
import { StoreContext } from "../../Store/Contexts/StoreContext";
import { useEffect } from "react";
import axios from "axios";

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success_url");
    const orderId = searchParams.get("orderId");
    // console.log(success, orderId);
    const {backendUrl} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const res = await axios.post(`${backendUrl}/api/order/verify`, {orderId, success});
            if(res.data.success){
                navigate("/myorders");
            }
            else{
                navigate("/");
            }

        } catch (error) {
            console.error("Verify payment error:", error);
        }
    }
    useEffect(() => {
        verifyPayment();
    }, []);


  return (
    <div className="verify">
        <div className="spinner">

        </div>
    </div>
  )
}

export default Verify