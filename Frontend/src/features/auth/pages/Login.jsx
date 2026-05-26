import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hook/useAuth.js";

const Login = () => {
    
    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        const result = await handleLogin({
            email: formData.email,
            password: formData.password,
        });

        if(result.success){
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center px-4">

            <div className="w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">

                {/* LEFT SECTION */}
                <div className="bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white p-10 flex flex-col justify-center">

                    <h1 className="text-5xl font-bold leading-tight mb-4">
                        Welcome <br /> Back
                    </h1>

                    <p className="text-gray-200 mb-10">
                        Login to continue accessing your account.
                    </p>

                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl">
                        <h3 className="text-xl font-semibold mb-2">
                            Secure Login
                        </h3>

                        <p className="text-sm text-gray-200">
                            Your account is protected with encrypted authentication.
                        </p>
                    </div>

                </div>

                {/* RIGHT SECTION */}
                <div className="p-10 bg-black text-white">

                    <h2 className="text-3xl font-bold text-center mb-2">
                        Login Account
                    </h2>

                    <p className="text-gray-400 text-center mb-8">
                        Enter your credentials to login.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* EMAIL */}
                        <div>

                            <label className="block mb-2 text-sm">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-green-500"
                            />

                        </div>

                        {/* PASSWORD */}
                        <div>

                            <label className="block mb-2 text-sm">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-green-500"
                            />

                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition duration-300"
                        >
                            Login
                        </button>

                    </form>

                    <p className="text-center text-sm text-gray-400 mt-6">
                        Don't have an account?
                        <span className="text-white cursor-pointer hover:underline ml-1">
                            Register
                        </span>
                    </p>

                </div>

            </div>

        </div>
    );
};

export default Login;