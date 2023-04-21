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
        //`https://dall-e-y8h1.onrender.com/api/v1/payment/create-payment-intent/${user._id}`,
        `/api/v1/payment/create-payment-intent/${user._id}`,
        config
      );
      console.log(response.data);
      dispatch(updateplan());
      navigate("/create-post");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <section className="max-w-7xl mx-auto">
          <div>
            <h1 className="font-extrabold text-[#222328] text-[32px]">
              Thanks for Purchasing !...
            </h1>
          </div>
        </section>
      </main>
    </>
  );
};

export default Completion;
