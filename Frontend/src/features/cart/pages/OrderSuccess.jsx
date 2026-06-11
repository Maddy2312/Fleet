import React from "react";
import { useLocation } from "react-router";

const OrderSuccess = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const orderId = queryParams.get("order_id");

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Payment Successful 🎉
        </h1>

        <p className="text-zinc-400 mb-4">
          Your order has been placed successfully.
        </p>

        <p className="font-semibold">
          Order ID:
          <span className="ml-2 text-green-500">
            {orderId}
          </span>
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;