import React, { useContext } from "react";
import vcart_logo from "../assets/vcart_logo.png";
import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthDataContext } from "../context/Authcontext.jsx"
import { userdataContext } from "../context/Usercontext.jsx";

import axios from "axios";


const Login = () => {

    const [showPassword, setShowPassword] = React.useState(false);
        const [email, setemail] = React.useState(false);
        const [password, setpassword] = React.useState(false);
        let serverURL = React.useContext(AuthDataContext).serverURL;
        let {getcurrentUser} = useContext(userdataContext);
    const handlelogin = async (e) => {
        e.preventDefault();
        try{
            const result = await axios.post(`${serverURL}/api/auth/login`,{
                email,
                password
            }, {withCredentials:true});
            console.log("Login successful:", result.data);
            alert("Login successful!");
            getcurrentUser;
            navigate("/");
        }catch(err){
            console.error("Login failed:", err.response ? err.response.data : err.message);
            alert(`Login failed: ${err.response ? err.response.data.message : err.message}`);
        }
    }

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-500 to-indigo-200 p-6">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md relative border border-gray-100">
                {/* Logo Section */}
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

                {/* Registration Form */}
                <form className="flex flex-col gap-4" onSubmit={handlelogin}>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 rounded-lg p-2.5 outline-none transition duration-200"
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 rounded-lg p-2.5 outline-none transition duration-200 pr-10"
                            onChange={(e) => setpassword(e.target.value)}
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
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg py-2.5 mt-3 transition duration-300 shadow-md hover:shadow-lg cursor-pointer"
                    >
                        Login 
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-5">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-gray-500 text-sm">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Google Login */}
                <button className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition duration-200 shadow-sm cursor-pointer">
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
