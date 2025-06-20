import React, { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import {Link,useNavigate} from "react-router-dom";
import Input from "../../components/Input/Input";
import {validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();


    // Simple validations
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user); // Update user context with the logged-in user data
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred while logging in. Please try again.");
      }
    }
  
  };

  return (
    <div>
      <AuthLayout>
        <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
          <p className="text-sm text-gray-500 mt-2 mb-6">
            Please enter your credentials to access your account.
          </p>

          <form onSubmit={handleLogin}>
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email"
              placeholder="john@example.com"
              type="text"
            />
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 characters"
              type="password"
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <button type="submit" className="btn-primary mt-4">
              LOGIN
            </button>

            <p className="text-[13px] text-slate-800 mt-3">
              Don&apos;t have an account?{" "}
              <Link className="font-medium text-primary underline" to="/signup">
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
};

export default Login;
