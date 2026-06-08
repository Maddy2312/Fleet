import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import useProduct from "../hook/useProduct.js";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { handleGetAllProducts, handleDeleteProduct } = useProduct();
  const navigate = useNavigate();

  const products = useSelector(
    (state) => state.product.sellerProducts
  );

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 transition-colors duration-500">
      
      {/* HEADER SECTION */}
      <div className="border-b border-zinc-200 dark:border-zinc-900 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 block mb-2 font-light">
              Seller Administration
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-light tracking-wide uppercase leading-tight text-zinc-950 dark:text-white">
              Seller Dashboard
            </h1>
            <p className="text-xs tracking-wider text-zinc-500 dark:text-zinc-400 font-light mt-2 uppercase">
              Manage and monitor your product catalogue
            </p>
          </div>

          <button
            onClick={() => navigate("/seller/create-product")}
            className="bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition duration-300 rounded-none cursor-pointer"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-zinc-200 dark:border-zinc-900 p-6 bg-zinc-50/50 dark:bg-zinc-950/20">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-light">
              Total Products Catalogued
            </h3>
            <p className="text-4xl font-serif tracking-wider text-zinc-950 dark:text-white mt-2">
              {products?.length || 0}
            </p>
          </div>
        </div>
      </div>

      {/* PRODUCTS DISPLAY SECTION */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 block mb-8 font-light">
          My Products
        </span>

        {products?.length === 0 ? (
          <div className="border border-dashed border-zinc-200 dark:border-zinc-800 p-16 text-center text-xs uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-light bg-zinc-50/50 dark:bg-zinc-950/20">
            No products catalogued yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/40 hover:border-black dark:hover:border-white transition-all duration-300 flex flex-col justify-between"
              >
                {/* Product Image */}
                <div className="aspect-[4/3] bg-zinc-100 dark:bg-zinc-900 overflow-hidden relative border-b border-zinc-200 dark:border-zinc-900">
                  <img
                    src={product.images?.[0]?.url}
                    alt={product.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Details Form Area */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-950 dark:text-white mb-2 truncate">
                      {product.title}
                    </h3>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500 line-clamp-2 uppercase tracking-wider font-light leading-relaxed mb-4">
                      {product.description}
                    </p>
                  </div>

                  <div>
                    <p className="text-lg font-serif tracking-wider text-zinc-950 dark:text-white mb-6">
                      {product.price.currency} {product.price.amount}
                    </p>

                    {/* Action Triggers */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => navigate(`/seller/product/${product._id}`)}
                        className="flex-1 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 py-2.5 text-[10px] uppercase tracking-[0.2em] font-medium transition duration-300 rounded-none cursor-pointer text-center"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="flex-1 border border-red-200 dark:border-red-950/60 hover:border-red-500 dark:hover:border-red-500 text-red-500 py-2.5 text-[10px] uppercase tracking-[0.2em] font-medium transition duration-300 rounded-none cursor-pointer text-center"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;