import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import useAuth from "../hook/useAuth.js";
import { Sun, Moon } from "lucide-react";

const Login = () => {
    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [isDark, setIsDark] = useState(() => {
        return (
            localStorage.getItem("theme") === "dark" ||
            (!localStorage.getItem("theme") &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        );
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

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

        if (result.success && result.user.role === "seller") {
            navigate("/seller/dashboard");
        } else if (result.success && result.user.role === "buyer") {
            navigate("/");
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col md:flex-row bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 transition-colors duration-500">
            {/* LEFT SECTION - Fashion Image */}
            <div className="w-full md:w-1/2 h-[40vh] md:h-screen relative overflow-hidden bg-zinc-100 dark:bg-zinc-950">
                <img
                    src="/login-fashion.png"
                    alt="Zara-style Fashion Editorial"
                    className="w-full h-full object-cover grayscale contrast-[1.05] brightness-95 transition-all duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 dark:bg-black/20 flex flex-col justify-between p-8 md:p-12">
                    <div>
                        <span className="text-white text-3xl font-extralight tracking-[0.3em] font-serif uppercase">
                            Fleet
                        </span>
                    </div>
                    <div className="text-white space-y-1">
                        <p className="text-[10px] uppercase tracking-[0.4em] font-light text-zinc-300">
                            Volume I
                        </p>
                        <h2 className="text-3xl md:text-4xl font-serif font-light tracking-wider leading-tight">
                            COLLECTION 2026
                        </h2>
                    </div>
                </div>
            </div>

            {/* RIGHT SECTION - Login Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-between p-8 md:p-16 lg:p-24 bg-white dark:bg-zinc-950 transition-colors duration-500">
                {/* Header Actions */}
                <div className="flex justify-between items-center w-full">
                    {/* Mobile Logo */}
                    <span className="block md:hidden text-xl font-light tracking-[0.2em] font-serif uppercase">
                        Fleet
                    </span>

                    {/* Minimalist Theme Toggle */}
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="ml-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] border border-zinc-300 dark:border-zinc-800 px-4 py-2 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-pointer"
                        title="Toggle dark/white mode"
                    >
                        {isDark ? (
                            <>
                                <Sun size={12} />
                                <span>Light</span>
                            </>
                        ) : (
                            <>
                                <Moon size={12} />
                                <span>Dark</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Form Container */}
                <div className="max-w-sm w-full mx-auto my-auto py-12">
                    <h1 className="text-3xl font-serif font-light tracking-[0.2em] mb-2 uppercase text-zinc-900 dark:text-white">
                        Sign In
                    </h1>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-12">
                        Enter your details to access your account
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* EMAIL */}
                        <div className="relative group">
                            <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 block mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="name@domain.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:border-black focus:dark:border-white py-2.5 px-0 outline-none text-sm transition-colors duration-300 text-zinc-900 dark:text-white placeholder-zinc-300 dark:placeholder-zinc-700 font-light rounded-none"
                                required
                            />
                        </div>

                        {/* PASSWORD */}
                        <div className="relative group">
                            <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 block mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:border-black focus:dark:border-white py-2.5 px-0 outline-none text-sm transition-colors duration-300 text-zinc-900 dark:text-white placeholder-zinc-300 dark:placeholder-zinc-700 font-light rounded-none"
                                required
                            />
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="w-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 py-4.5 text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 rounded-none cursor-pointer mt-10 shadow-sm"
                        >
                            Sign In
                        </button>
                    </form>
                </div>

                {/* Footer Link */}
                <div className="text-center text-[10px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
                    New client?{" "}
                    <Link
                        to="/register"
                        className="text-zinc-900 dark:text-white hover:underline underline-offset-4 ml-1 transition-all duration-300 font-medium"
                    >
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;