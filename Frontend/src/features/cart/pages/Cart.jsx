import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Trash2, Minus, Plus } from "lucide-react";
import useCart from "../hook/useCart.js";

const Cart = () => {
  const { handleGetCartItems, handleIncrementCartItemQuantity } = useCart();

  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    handleGetCartItems();
  }, []);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const variant = item.product?.variants?.find(
        (v) => v._id === item.variant
      );

      const price = variant
        ? variant.price.amount
        : item.price.amount;

      return acc + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const shipping = subtotal > 0 ? 20 : 0;

  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black mb-10 uppercase">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-20 text-center">
            <h2 className="text-3xl font-bold mb-3">
              Your Cart Is Empty
            </h2>

            <p className="text-zinc-400">
              Add some products to continue shopping.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* CART ITEMS */}
            <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
              <div className="hidden md:grid grid-cols-12 gap-4 border-b border-zinc-800 pb-4 mb-6 text-sm uppercase tracking-wider text-zinc-400">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">
                  Quantity
                </div>
                <div className="col-span-2 text-center">
                  Total
                </div>
                <div className="col-span-1 text-center">
                  Action
                </div>
              </div>

              {cartItems.map((item) => {
                const variant = item.product?.variants?.find(
                  (v) => v._id === item.variant
                );

                const image =
                  variant?.images?.[0]?.url ||
                  item.product?.images?.[0]?.url;

                const price = variant
                  ? variant.price.amount
                  : item.price.amount;

                const currency = variant
                  ? variant.price.currency
                  : item.price.currency;

                return (
                  <div
                    key={item._id}
                    className="grid md:grid-cols-12 gap-4 items-center border-b border-zinc-800 py-6"
                  >
                    {/* PRODUCT */}
                    <div className="md:col-span-6 flex gap-4">
                      <img
                        src={image}
                        alt={item.product.title}
                        className="w-28 h-28 rounded-xl object-cover"
                      />

                      <div>
                        <h3 className="text-xl font-bold">
                          {item.product.title}
                        </h3>

                        {variant && (
                          <>
                            <p className="text-zinc-400 mt-2">
                              Color:{" "}
                              {variant.attributes?.color}
                            </p>

                            <p className="text-zinc-400">
                              Size:{" "}
                              {variant.attributes?.size}
                            </p>
                          </>
                        )}

                        <p className="mt-2 font-semibold">
                          {currency} {price}
                        </p>
                      </div>
                    </div>

                    {/* QUANTITY */}
                    <div className="md:col-span-3 flex justify-center">
                      <div className="flex items-center border border-zinc-700 rounded-full">
                        <button
                          className="px-4 py-2 hover:bg-zinc-800 rounded-l-full"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="px-5">
                          {item.quantity}
                        </span>

                        <button
                          onClick={()=>handleIncrementCartItemQuantity({productId: item.product._id, variantId: item.variant})}
                          className="px-4 py-2 hover:bg-zinc-800 rounded-r-full"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* TOTAL */}
                    <div className="md:col-span-2 text-center font-bold text-lg">
                      {currency}{" "}
                      {(price * item.quantity).toFixed(2)}
                    </div>

                    {/* DELETE */}
                    <div className="md:col-span-1 flex justify-center">
                      <button className="hover:text-red-500 transition">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 h-fit sticky top-8">
              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Discount code"
                  className="flex-1 bg-black border border-zinc-700 rounded-full px-4 py-3 outline-none"
                />

                <button className="px-5 rounded-full border border-zinc-700 hover:bg-zinc-800">
                  Apply
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-zinc-400">
                    Subtotal
                  </span>

                  <span>
                    USD {subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">
                    Shipping
                  </span>

                  <span>
                    USD {shipping.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-zinc-800 pt-4 flex justify-between text-xl font-bold">
                  <span>Total</span>

                  <span>
                    USD {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="w-full mt-8 bg-white text-black py-4 rounded-full font-bold hover:bg-zinc-200 transition">
                Checkout Now
              </button>

              <div className="mt-6 text-sm text-zinc-500">
                Secure checkout with encrypted payment
                processing.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;