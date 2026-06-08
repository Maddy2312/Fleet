import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { ShoppingCart, Menu, User, Sun, Moon } from "lucide-react";
import { useSelector } from "react-redux";

const Nav = () => {
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);

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

  return (
    <nav className="bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-900 sticky top-0 z-50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-4.5 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-light tracking-[0.25em] font-serif uppercase text-zinc-950 dark:text-white"
        >
          FLEET
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Seller Dashboard */}
          {user?.role === "seller" && (
            <Link
              to="/seller/dashboard"
              className="hidden md:block bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-medium transition hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-none"
            >
              Seller Dashboard
            </Link>
          )}

          {/* Username */}
          {user && (
            <div className="hidden md:flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-light">
              <User size={12} className="text-zinc-400" />
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                {user.username || user.name}
              </span>
              {user?.role === "seller" && (
                <span className="text-[8px] bg-zinc-200 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 font-semibold tracking-[0.1em]">
                  SELLER
                </span>
              )}
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-950 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-900 transition cursor-pointer text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            title="Toggle dark/white theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-950 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-900 transition text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
          >
            <ShoppingCart size={18} />
            {cartItems?.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-[9px] font-bold h-4.5 w-4.5 flex items-center justify-center border border-white dark:border-zinc-950">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Mobile Seller Dashboard */}
          {user?.role === "seller" && (
            <Link
              to="/seller/dashboard"
              className="md:hidden px-3 py-1.5 text-[9px] bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 uppercase tracking-[0.15em] font-medium"
            >
              Seller
            </Link>
          )}

          {/* Mobile Menu */}
          <button className="md:hidden p-2 text-zinc-500 dark:text-zinc-400">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;