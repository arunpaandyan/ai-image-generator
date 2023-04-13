import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateplan } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
const Completion = () => {
  useEffect(() => {
    updateStatus();
  }, []);

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateStatus = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/payment/create-payment-intent/${user._id}`,
        config
      );
      console.log(response.data);
      dispatch(updateplan());
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return <div>Completion</div>;
};

export default Completion;
