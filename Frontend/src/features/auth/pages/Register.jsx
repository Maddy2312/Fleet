import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from "react-router";

const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contact: "",
    password: "",
    isSeller: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({
      email: formData.email,
      password: formData.password,
      contact: formData.contact,
      fullname: formData.fullname,
      isSeller: formData.isSeller,
    });
    // Add logic here to post data to backend
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-neutral-100 font-sans">
      <div className="w-full max-w-md bg-neutral-900/50 backdrop-blur-xl rounded-[2rem] p-10 shadow-2xl border border-neutral-800/50">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-light tracking-tight mb-3 text-neutral-100">
            Create Account
          </h1>
          <p className="text-neutral-400 text-sm font-light tracking-wide">
            Enter your details below to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              className="block text-xs font-medium text-neutral-400 uppercase tracking-wider pl-1"
              htmlFor="fullname"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full bg-neutral-950/50 border border-neutral-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder:text-neutral-600"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-xs font-medium text-neutral-400 uppercase tracking-wider pl-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-neutral-950/50 border border-neutral-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder:text-neutral-600"
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-xs font-medium text-neutral-400 uppercase tracking-wider pl-1"
              htmlFor="contactNumber"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full bg-neutral-950/50 border border-neutral-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder:text-neutral-600"
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-xs font-medium text-neutral-400 uppercase tracking-wider pl-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-neutral-950/50 border border-neutral-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder:text-neutral-600"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="pt-2 flex items-center group">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                id="isSeller"
                name="isSeller"
                checked={formData.isSeller}
                onChange={handleChange}
                className="peer relative appearance-none w-6 h-6 border border-neutral-700 bg-neutral-950/50 rounded-lg cursor-pointer checked:bg-yellow-500 checked:border-yellow-500 focus:outline-none transition-all"
              />
              <svg
                className="absolute w-4 h-4 text-neutral-950 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <label
              className="ml-4 text-sm font-medium text-neutral-300 cursor-pointer select-none group-active:text-neutral-400 transition-colors"
              htmlFor="isSeller"
            >
              Sign up as a Seller
            </label>
          </div>
          <a
            href="api/auth/google"
            className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5"
            />
            Continue with Google
          </a>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-neutral-950 font-bold py-4 px-6 rounded-2xl transition-all duration-200 mt-8 shadow-[0_0_20px_rgba(234,179,8,0.15)] hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] hover:-translate-y-0.5 active:translate-y-0"
          >
            Create Account
          </button>
        </form>

        <div className="mt-10 text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-yellow-500 hover:text-yellow-400 font-medium ml-1 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
