import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../hooks/useProduct";

const Dashboard = () => {
  const { handleGetSellerProducts } = useProduct();

  const sellerProducts = useSelector(
    (state) => state.product.sellerProducts
  );

  useEffect(() => {
    handleGetSellerProducts();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-light tracking-tight">
            Dashboard
          </h1>
          <p className="text-neutral-500 text-sm mt-2">
            Your product overview
          </p>
        </div>

        {/* TABLE HEADER */}
        <div className="grid grid-cols-3 text-xs text-neutral-500 uppercase tracking-widest px-4">
          <p>Title</p>
          <p>Description</p>
          <p className="text-right">Amount</p>
        </div>

        {/* PRODUCT LIST */}
        <div className="space-y-3">
          {sellerProducts.length === 0 ? (
            <div className="text-neutral-500 text-sm px-4">
              No products found
            </div>
          ) : (
            sellerProducts.map((product) => (
                <div
                key={product._id}
                className="grid grid-cols-3 items-center bg-neutral-900/40 border border-neutral-800 rounded-2xl px-4 py-4 hover:border-yellow-500/30 transition"
                >
                {/* Title */}
                <div className="font-medium">
                  {product.title}
                </div>

                {/* Description */}
                <div className="text-sm text-neutral-500 truncate pr-4">
                  {product.description}
                </div>

                {/* Amount */}
                <div className="text-right font-semibold text-yellow-500">
                  ${product.price.amount}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;