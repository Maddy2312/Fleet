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
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-black text-white py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">
              Seller Dashboard
            </h1>

            <p className="text-gray-400">
              Manage your products
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/seller/create-product")
            }
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Total Products
            </h3>

            <p className="text-4xl font-bold mt-2">
              {products?.length || 0}
            </p>
          </div>

        </div>
      </div>

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto px-6 pb-10">

        <h2 className="text-3xl font-bold mb-6">
          My Products
        </h2>

        {products?.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center">
            No products found.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">

            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow overflow-hidden"
              >
                <img
                  src={product.images?.[0]?.url}
                  alt={product.title}
                  className="h-60 w-full object-cover"
                />

                <div className="p-5">

                  <h3 className="font-bold text-xl">
                    {product.title}
                  </h3>

                  <p className="text-gray-500 mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <p className="font-bold text-2xl mt-4">
                    {product.price.currency}
                    {" "}
                    {product.price.amount}
                  </p>

                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={() =>
                        navigate(
                          `/seller/product/${product._id}`
                        )
                      }
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteProduct(product._id)
                      }
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg"
                    >
                      Delete
                    </button>

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