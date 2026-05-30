import React, { useState } from "react";
import axios from "axios";
import useProduct from "../hook/useProduct.js";
import { useNavigate } from "react-router";

const CreateProducts = () => {
    const { handleCreateProduct } = useProduct();
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "USD",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("priceAmount", formData.priceAmount);
      data.append("priceCurrency", formData.priceCurrency);

      images.forEach((image) => {
        data.append("images", image);
      });
      const response = await handleCreateProduct(data);
      console.log(response)

      setFormData({
        title: "",
        description: "",
        priceAmount: "",
        priceCurrency: "USD",
      });

      setImages([]);
      if(response.success){
        navigate("/")
      }
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center px-6 py-2">
      <div className="w-full bg-black rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">

        {/* LEFT SECTION */}
        <div
          className="
            bg-[radial-gradient(circle_at_top,#f5d0fe_0%,#9333ea_30%,#581c87_60%,#000000_100%)]
            text-white
            p-12
            flex
            flex-col
            justify-center
          "
        >
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold">Fleet</h2>
          </div>

          <div className="max-w-sm mx-auto">
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Create
              <br />
              Product
            </h1>

            <p className="text-gray-200 mb-10">
              Add your product details and publish it to your marketplace.
            </p>

            <div className="space-y-4">
              <div className="bg-white text-black p-4 rounded-xl flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs">
                  1
                </span>

                <p className="text-sm font-medium">
                  Add product details
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
                  2
                </span>

                <p className="text-sm">
                  Upload product images
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
                  3
                </span>

                <p className="text-sm">
                  Publish your product
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="bg-black text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-2">
            Add Product
          </h2>

          <p className="text-gray-400 text-center mb-8">
            Enter product information below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* TITLE */}
            <div>
              <label className="block mb-2 text-sm">
                Product Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="Enter product title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full bg-[#111111] border border-[#222222] rounded-lg px-4 py-3 outline-none focus:border-purple-500"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block mb-2 text-sm">
                Description
              </label>

              <textarea
                rows="4"
                name="description"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full bg-[#111111] border border-[#222222] rounded-lg px-4 py-3 outline-none focus:border-purple-500"
              />
            </div>

            {/* PRICE */}
            <div>
              <label className="block mb-2 text-sm">
                Price Amount
              </label>

              <input
                type="number"
                name="priceAmount"
                placeholder="Enter product price"
                value={formData.priceAmount}
                onChange={handleChange}
                required
                className="w-full bg-[#111111] border border-[#222222] rounded-lg px-4 py-3 outline-none focus:border-purple-500"
              />
            </div>

            {/* CURRENCY */}
            <div>
              <label className="block mb-2 text-sm">
                Currency
              </label>

              <select
                name="priceCurrency"
                value={formData.priceCurrency}
                onChange={handleChange}
                className="w-full bg-[#111111] border border-[#222222] rounded-lg px-4 py-3 outline-none focus:border-purple-500"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            {/* IMAGES */}
            <div>
              <label className="block mb-2 text-sm">
                Product Images
              </label>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                required
                className="w-full bg-[#111111] border border-[#222222] rounded-lg px-4 py-3"
              />
            </div>

            {/* IMAGE PREVIEW */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    className="h-24 w-full object-cover rounded-lg border border-gray-700"
                  />
                ))}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProducts;