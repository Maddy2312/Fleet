import React from "react";
import { Link } from "react-router";
import { ShoppingCart, Menu, User } from "lucide-react";
import { useSelector } from "react-redux";

const Nav = () => {
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <nav className="bg-black text-white border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-black tracking-widest"
        >
          FLEET
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          {/* Seller Dashboard */}
          {user?.role === "seller" && (
            <Link
              to="/seller/dashboard"
              className="hidden md:block bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-zinc-200 transition"
            >
              Seller Dashboard
            </Link>
          )}

          {/* Username */}
          {user && (
            <div className="hidden md:flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-full">
              <User size={18} />

              <span className="text-sm font-medium">
                {user.username || user.name}
              </span>

              {user?.role === "seller" && (
                <span className="text-xs bg-green-600 px-2 py-1 rounded-full">
                  Seller
                </span>
              )}
            </div>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 hover:bg-zinc-900 rounded-full transition"
          >
            <ShoppingCart size={22} />

            {cartItems?.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Mobile Seller Dashboard */}
          {user?.role === "seller" && (
            <Link
              to="/seller/dashboard"
              className="md:hidden p-2 text-xs bg-white text-black rounded"
            >
              Seller
            </Link>
          )}

          {/* Mobile Menu */}
          <button className="md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;