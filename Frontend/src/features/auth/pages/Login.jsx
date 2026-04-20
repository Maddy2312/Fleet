import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { redirect, useNavigate } from "react-router";
import ContinueWithGoogle from "../components/ContinueWithGoogle.jsx";

const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin({
        email: formData.email,
        password: formData.password,
      });
      // Add logic here to redirect or show success message after login
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      // Optional: Handle error display here
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-neutral-100 font-sans">
      <div className="w-full max-w-md bg-neutral-900/50 backdrop-blur-xl rounded-[2rem] p-10 shadow-2xl border border-neutral-800/50">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-light tracking-tight mb-3 text-neutral-100">
            Welcome Back
          </h1>
          <p className="text-neutral-400 text-sm font-light tracking-wide">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className="flex items-center justify-between pl-1 pr-1">
              <label
                className="block text-xs font-medium text-neutral-400 uppercase tracking-wider"
                htmlFor="password"
              >
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-xs font-medium text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                Forgot Password?
              </a>
            </div>
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
<ContinueWithGoogle />
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-neutral-950 font-bold py-4 px-6 rounded-2xl transition-all duration-200 mt-8 shadow-[0_0_20px_rgba(234,179,8,0.15)] hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] hover:-translate-y-0.5 active:translate-y-0"
          >
            Sign In
          </button>
        </form>

        <div className="mt-10 text-center text-sm text-neutral-500">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-yellow-500 hover:text-yellow-400 font-medium ml-1 transition-colors"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
