import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useProduct from "../hook/useProduct.js";

const SellerProductDetail = () => {
  const { id } = useParams();

  const {
    handleGetProductDetails,
    handleCreateVariant,
    handleDeleteVariant,
  } = useProduct();

  const [product, setProduct] = useState(null);

  const [variantImages, setVariantImages] = useState([]);

  const [variantForm, setVariantForm] = useState({
    color: "",
    size: "",
    stock: "",
    amount: "",
    currency: "USD",
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const data = await handleGetProductDetails(id);

    if (data) {
      setProduct(data);
    }
  };

  const handleChange = (e) => {
    setVariantForm({
      ...variantForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleVariantImages = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 7) {
      alert("Maximum 7 images allowed");
      return;
    }

    setVariantImages(files);
  };

  const removeImage = (index) => {
    setVariantImages(
      variantImages.filter((_, i) => i !== index)
    );
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "attributes",
      JSON.stringify({
        color: variantForm.color,
        size: variantForm.size,
      })
    );

    formData.append(
      "price",
      JSON.stringify({
        amount: Number(variantForm.amount),
        currency: variantForm.currency,
      })
    );

    formData.append(
      "stock",
      Number(variantForm.stock)
    );

    variantImages.forEach((image) => {
      formData.append("images", image);
    });

    await handleCreateVariant(id, formData);

    await fetchProduct();

    setVariantForm({
      color: "",
      size: "",
      stock: "",
      amount: "",
      currency: "USD",
    });

    setVariantImages([]);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading Product...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-5xl font-black">
            {product.title}
          </h1>

          <p className="text-zinc-400 mt-3">
            {product.description}
          </p>

          <div className="mt-4 text-2xl font-bold">
            {product.price.currency}{" "}
            {product.price.amount}
          </div>
        </div>
      </div>

      {/* PRODUCT IMAGES */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-6">
          Product Images
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {product.images?.map((img) => (
            <img
              key={img._id}
              src={img.url}
              alt=""
              className="h-80 w-full object-cover rounded-xl"
            />
          ))}
        </div>
      </div>

      {/* CREATE VARIANT */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-6">
          Create Product Variant
        </h2>

        <form
          onSubmit={handleCreate}
          className="grid md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={variantForm.color}
            onChange={handleChange}
            className="bg-zinc-900 p-4 rounded-lg"
          />

          <input
            type="text"
            name="size"
            placeholder="Size"
            value={variantForm.size}
            onChange={handleChange}
            className="bg-zinc-900 p-4 rounded-lg"
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={variantForm.stock}
            onChange={handleChange}
            className="bg-zinc-900 p-4 rounded-lg"
          />

          <input
            type="number"
            name="amount"
            placeholder="Price"
            value={variantForm.amount}
            onChange={handleChange}
            className="bg-zinc-900 p-4 rounded-lg"
          />

          <select
            name="currency"
            value={variantForm.currency}
            onChange={handleChange}
            className="bg-zinc-900 p-4 rounded-lg"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>

          <div></div>

          {/* IMAGES */}
          <div className="md:col-span-2">
            <label className="block mb-3 font-semibold">
              Variant Images (Max 7)
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleVariantImages}
              className="w-full bg-zinc-900 p-4 rounded-lg"
            />
          </div>

          {/* PREVIEW */}
          {variantImages.length > 0 && (
            <div className="md:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {variantImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt=""
                      className="h-40 w-full object-cover rounded-lg"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeImage(index)
                      }
                      className="absolute top-2 right-2 bg-red-600 w-8 h-8 rounded-full"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <p className="text-zinc-400 mt-4">
                {variantImages.length}/7 Images Selected
              </p>
            </div>
          )}

          <button
            type="submit"
            className="md:col-span-2 bg-white text-black p-4 rounded-lg font-bold hover:bg-zinc-200 transition"
          >
            Create Variant
          </button>
        </form>
      </div>

      {/* VARIANTS TABLE */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-6">
          Inventory Management
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-zinc-800">
            <thead>
              <tr className="bg-zinc-900">
                <th className="p-4 text-left">
                  Images
                </th>

                <th className="p-4 text-left">
                  Color
                </th>

                <th className="p-4 text-left">
                  Size
                </th>

                <th className="p-4 text-left">
                  Stock
                </th>

                <th className="p-4 text-left">
                  Price
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {product.variants?.map(
                (variant) => (
                  <tr
                    key={variant._id}
                    className="border-t border-zinc-800"
                  >
                    <td className="p-4">
                      <div className="flex gap-2">
                        {variant.images?.map(
                          (img, i) => (
                            <img
                              key={i}
                              src={img.url}
                              alt=""
                              className="w-12 h-12 object-cover rounded"
                            />
                          )
                        )}
                      </div>
                    </td>

                    <td className="p-4">
                      {
                        variant.attributes
                          ?.color
                      }
                    </td>

                    <td className="p-4">
                      {
                        variant.attributes
                          ?.size
                      }
                    </td>

                    <td className="p-4">
                      {variant.stock}
                    </td>

                    <td className="p-4">
                      {
                        variant.price
                          ?.amount
                      }{" "}
                      {
                        variant.price
                          ?.currency
                      }
                    </td>

                    <td className="p-4">
                      <button
                        onClick={async () => {
                          await handleDeleteVariant(
                            variant._id
                          );

                          fetchProduct();
                        }}
                        className="bg-red-600 px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}

              {product.variants?.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10"
                  >
                    No Variants Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerProductDetail;