import React, { useState } from "react";
import useAuth from "../hook/useAuth.js";
import { useNavigate } from "react-router";

const RegisterPage = () => {

    const { handleRegister } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        contact: "",
        isSeller: false,
    });

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await handleRegister({
            email: formData.email,
            name: formData.name,
            password: formData.password,
            contact: formData.contact,
            isSeller: formData.isSeller,
        });
        
        if(result.success){
            navigate("/")
        }
        console.log(result);
    };

    return (
        <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center px-8">

            <div className="w-full bg-black rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">

                {/* LEFT SIDE */}
                <div className="bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white p-10 flex flex-col justify-center">

                    <h1 className="text-5xl font-bold leading-tight mb-4">
                        Get Started <br /> with Us
                    </h1>

                    <p className="text-gray-200 mb-10">
                        Complete these easy steps to register your account.
                    </p>

                    <div className="flex gap-4">

                        <div className="bg-white text-black p-4 rounded-xl w-32 h-28 flex flex-col justify-center">
                            <span className="text-sm font-bold mb-2">1</span>
                            <p className="text-sm font-medium">
                                Sign up your account
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl w-32 h-28 flex flex-col justify-center">
                            <span className="text-sm font-bold mb-2">2</span>
                            <p className="text-sm">
                                Setup your workspace
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl w-32 h-28 flex flex-col justify-center">
                            <span className="text-sm font-bold mb-2">3</span>
                            <p className="text-sm">
                                Complete profile
                            </p>
                        </div>

                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="p-10 bg-black text-white">

                    <h2 className="text-3xl font-bold text-center mb-2">
                        Sign Up Account
                    </h2>

                    <p className="text-gray-400 text-center mb-8">
                        Enter your personal data to create your account.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* NAME */}
                        <div>
                            <label className="block mb-2 text-sm">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-green-500"
                            />
                        </div>

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
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-green-500"
                            />
                        </div>

                        {/* CONTACT */}
                        <div>
                            <label className="block mb-2 text-sm">
                                Contact Number
                            </label>

                            <input
                                type="text"
                                name="contact"
                                placeholder="Enter contact number"
                                value={formData.contact}
                                onChange={handleChange}
                                className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-green-500"
                            />
                        </div>

                        {/* SELLER CHECKBOX */}
                        <div className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                name="isSeller"
                                checked={formData.isSeller}
                                onChange={handleChange}
                                className="w-5 h-5 accent-green-500"
                            />

                            <label className="text-sm">
                                Register as Seller
                            </label>

                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition duration-300"
                        >
                            Sign Up
                        </button>

                    </form>

                    <p className="text-center text-sm text-gray-400 mt-6">
                        Already have an account?
                        <span className="text-white cursor-pointer hover:underline ml-1">
                            Login
                        </span>
                    </p>

                </div>

            </div>

        </div>
    );
};

export default RegisterPage;