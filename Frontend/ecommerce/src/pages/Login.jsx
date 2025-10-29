import React from "react";
import vcart_logo from "../assets/vcart_logo.png";
import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { AuthDataContext } from "../context/Authcontext.jsx";

const Login = () => {
  // States
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  // Contexts
  const { serverURL } = React.useContext(AuthDataContext);
  // const { getcurrentUser } = React.useContext(userdataContext);

  // ✅ Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(`${serverURL}/api/auth/login/`, {
        email,
        password
      }, {
        withCredentials: true // ✅ allow cookie-based auth
      });

      console.log("✅ Login successful:", result.data);
      alert("Login successful!");
      
      // ✅ Update user data
      // getcurrentUser();

      // ✅ Redirect to home
      navigate("/");
    } catch (err) {
      console.error("❌ Login failed:", err.response?.data || err.message);
      alert("Login failed:",  err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-500 to-indigo-200 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md relative border border-gray-100">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={vcart_logo}
            alt="Logo"
            className="w-16 h-16 mb-3 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate("/")}
          />
          <h1 className="text-3xl font-bold text-indigo-700 tracking-wide">
            Login Account
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Join VCart and start your shopping journey today
          </p>
        </div>

        {/* Login Form */}
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 rounded-lg p-2.5 outline-none transition duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 rounded-lg p-2.5 outline-none transition duration-200 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {showPassword ? (
              <FaEyeSlash
                className="absolute right-3 top-9 text-gray-400 cursor-pointer hover:text-gray-600 transition"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEye
                className="absolute right-3 top-9 text-gray-400 cursor-pointer hover:text-gray-600 transition"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-indigo-600 text-white font-semibold rounded-lg py-2.5 mt-3 transition duration-300 shadow-md ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-indigo-700 hover:shadow-lg"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition duration-200 shadow-sm cursor-pointer"
        >
          <img src={google} alt="Google" className="w-5 h-5" />
          <span className="text-gray-700 font-medium">Login with Google</span>
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Add a new account?{" "}
          <button
            onClick={() => navigate("/Registration")}
            className="text-indigo-600 hover:underline font-medium"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
