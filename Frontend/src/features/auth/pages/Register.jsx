import React, { useState, useEffect } from "react";
import useAuth from "../hook/useAuth.js";
import { useNavigate, Link } from "react-router";
import { Sun, Moon } from "lucide-react";

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

    if (result.success) {
      navigate("/");
    }
    console.log(result);
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 transition-colors duration-500">
      {/* LEFT SECTION - Fashion Image */}
      <div className="w-full md:w-1/2 h-[30vh] md:h-screen relative overflow-hidden bg-zinc-100 dark:bg-zinc-950">
        <img
          src="/register-fashion.png"
          alt="Louis Vuitton-style Fashion Editorial"
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
              ESTABLISHED 2026
            </h2>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION - Registration Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-8 md:p-12 lg:p-16 bg-white dark:bg-zinc-950 transition-colors duration-500">
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
        <div className="max-w-sm w-full mx-auto my-auto py-8">
          <h1 className="text-3xl font-serif font-light tracking-[0.2em] mb-2 uppercase text-zinc-900 dark:text-white">
            Create Account
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-8">
            Complete your details to start the journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* FULL NAME */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="First Last"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:border-black focus:dark:border-white py-2 px-0 outline-none text-sm transition-colors duration-300 text-zinc-900 dark:text-white placeholder-zinc-300 dark:placeholder-zinc-700 font-light rounded-none"
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@domain.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:border-black focus:dark:border-white py-2 px-0 outline-none text-sm transition-colors duration-300 text-zinc-900 dark:text-white placeholder-zinc-300 dark:placeholder-zinc-700 font-light rounded-none"
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 block mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:border-black focus:dark:border-white py-2 px-0 outline-none text-sm transition-colors duration-300 text-zinc-900 dark:text-white placeholder-zinc-300 dark:placeholder-zinc-700 font-light rounded-none"
                required
              />
            </div>

            {/* CONTACT */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 block mb-1">
                Contact Number
              </label>
              <input
                type="text"
                name="contact"
                placeholder="+1 (555) 000-0000"
                value={formData.contact}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:border-black focus:dark:border-white py-2 px-0 outline-none text-sm transition-colors duration-300 text-zinc-900 dark:text-white placeholder-zinc-300 dark:placeholder-zinc-700 font-light rounded-none"
                required
              />
            </div>

            {/* CUSTOM SELLER CHECKBOX */}
            <div className="py-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="isSeller"
                  checked={formData.isSeller}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="w-4 h-4 border border-zinc-300 dark:border-zinc-800 flex items-center justify-center group-hover:border-black dark:group-hover:border-white transition-colors duration-300">
                  {formData.isSeller && (
                    <div className="w-2.5 h-2.5 bg-zinc-900 dark:bg-white" />
                  )}
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 font-light">
                  Register as Seller
                </span>
              </label>
            </div>

            {/* BUTTONS */}
            <div className="space-y-4 pt-4">
              <button
                type="submit"
                className="w-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 py-4.5 text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 rounded-none cursor-pointer shadow-sm"
              >
                Create Account
              </button>

              <a
                href="/api/auth/google"
                className="w-full flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white py-4.5 text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 rounded-none text-center text-zinc-900 dark:text-white"
              >
                Continue with Google
              </a>
            </div>
          </form>
        </div>

        {/* Footer Link */}
        <div className="text-center text-[10px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 pt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-zinc-900 dark:text-white hover:underline underline-offset-4 ml-1 transition-all duration-300 font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

