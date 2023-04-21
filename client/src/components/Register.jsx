import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import { Loader } from ".";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, email, password, password2, file } = formData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess || user) {
      navigate("/home");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.files[0],
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      const fData = new FormData();
      fData.append("name", name);
      fData.append("email", email);
      fData.append("password", password);
      fData.append("file", file);

      dispatch(register(fData));
      console.log(fData);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-10">
        <Loader />
      </div>
    );

  return (
    <form className="mt-16" onSubmit={onSubmit}>
      <div className="flex flex-col gap-5">
        <input
          type="name"
          id="name"
          name="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => onChange(e)}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => onChange(e)}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => onChange(e)}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
        />
        <input
          type="password"
          id="password2"
          name="password2"
          placeholder="Confirm your password"
          value={password2}
          onChange={(e) => onChange(e)}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
        />
        <input
          type="file"
          id="file"
          name="file"
          accept=".png, .jpg, .jpeg"
          placeholder="Confirm your file"
          onChange={handleImageChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
        />
        <input
          type="submit"
          id="submit"
          name="submit"
          value="Register"
          required
          className="bg-[#03C988] border border-gray-300 text-white text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
        />
      </div>
    </form>
  );
};
export default Register;
