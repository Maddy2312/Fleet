import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useProduct from "../hook/useProduct.js";

const SellerProductDetail = () => {
  const { id } = useParams();

  const { handleGetProductDetails, handleCreateVariant } =
    useProduct();

  const [product, setProduct] = useState(null);

  const [variantImages, setVariantImages] = useState([]);

  const [variantForm, setVariantForm] = useState({
    color: "",
    size: "",
    stock: "",
    priceAmount: "",
    priceCurrency: "USD",
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
    setVariantImages(variantImages.filter((_, i) => i !== index));
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

    formData.append("priceAmount", variantForm.priceAmount);
    formData.append("priceCurrency", variantForm.priceCurrency);

    formData.append("stock", Number(variantForm.stock));

    variantImages.forEach((image) => {
      formData.append("images", image);
    });

    await handleCreateVariant(id, formData);

    await fetchProduct();

    setVariantForm({
      color: "",
      size: "",
      stock: "",
      priceAmount: "",
      priceCurrency: "USD",
    });

    setVariantImages([]);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 transition-colors duration-500">
        <span className="text-xs uppercase tracking-[0.3em] font-light animate-pulse">
          Loading Product Details...
        </span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 transition-colors duration-500">
      {/* HEADER SECTION */}
      <section className="border-b border-zinc-200 dark:border-zinc-900 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 block mb-2 font-light">
            Seller Dashboard / Product File
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-light tracking-wide uppercase leading-tight text-zinc-950 dark:text-white">
            {product.title}
          </h1>
          <p className="text-xs tracking-wider text-zinc-500 dark:text-zinc-400 font-light mt-3 max-w-3xl leading-relaxed uppercase">
            {product.description}
          </p>
          <div className="mt-6 text-2xl font-serif tracking-wider text-zinc-950 dark:text-white">
            {product.price.currency} {product.price.amount}
          </div>
        </div>
      </section>

      {/* PRODUCT IMAGES SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-b border-zinc-200 dark:border-zinc-900">
        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 block mb-6 font-light">
          Base Product Images
        </span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {product.images?.map((img) => (
            <div key={img._id} className="relative aspect-[3/4] bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 overflow-hidden">
              <img
                src={img.url}
                alt=""
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CREATE VARIANT SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-b border-zinc-200 dark:border-zinc-900">
        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 block mb-8 font-light">
          Create Product Variant
        </span>

        <form onSubmit={handleCreate} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {/* Color Input */}
            <div className="flex flex-col">
              <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-1 font-light">Color</label>
              <input
                type="text"
                name="color"
                placeholder="e.g. Nero"
                value={variantForm.color}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:border-black focus:dark:border-white py-2 px-0 outline-none text-xs uppercase tracking-wider text-zinc-950 dark:text-zinc-100 transition-colors duration-300 rounded-none placeholder-zinc-300 dark:placeholder-zinc-700 font-light"
                required
              />
            </div>

            {/* Size Input */}
            <div className="flex flex-col">
              <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-1 font-light">Size</label>
              <input
                type="text"
                name="size"
                placeholder="e.g. EU 42"
                value={variantForm.size}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:border-black focus:dark:border-white py-2 px-0 outline-none text-xs uppercase tracking-wider text-zinc-950 dark:text-zinc-100 transition-colors duration-300 rounded-none placeholder-zinc-300 dark:placeholder-zinc-700 font-light"
                required
              />
            </div>

            {/* Stock Input */}
            <div className="flex flex-col">
              <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-1 font-light">Stock Units</label>
              <input
                type="number"
                name="stock"
                placeholder="Quantity Available"
                value={variantForm.stock}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:border-black focus:dark:border-white py-2 px-0 outline-none text-xs uppercase tracking-wider text-zinc-950 dark:text-zinc-100 transition-colors duration-300 rounded-none placeholder-zinc-300 dark:placeholder-zinc-700 font-light"
                required
              />
            </div>

            {/* Price Input */}
            <div className="flex flex-col">
              <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-1 font-light">Price Amount</label>
              <input
                type="number"
                name="priceAmount"
                placeholder="Variant Price Amount"
                value={variantForm.priceAmount}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:border-black focus:dark:border-white py-2 px-0 outline-none text-xs uppercase tracking-wider text-zinc-950 dark:text-zinc-100 transition-colors duration-300 rounded-none placeholder-zinc-300 dark:placeholder-zinc-700 font-light"
                required
              />
            </div>

            {/* Currency Input */}
            <div className="flex flex-col">
              <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-1 font-light">Currency</label>
              <select
                name="priceCurrency"
                value={variantForm.priceCurrency}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:border-black focus:dark:border-white py-2 px-0 outline-none text-xs uppercase tracking-widest text-zinc-950 dark:text-zinc-100 transition-colors duration-300 rounded-none cursor-pointer"
              >
                <option value="USD" className="bg-white dark:bg-black text-zinc-950 dark:text-white">USD</option>
                <option value="EUR" className="bg-white dark:bg-black text-zinc-950 dark:text-white">EUR</option>
                <option value="GBP" className="bg-white dark:bg-black text-zinc-950 dark:text-white">GBP</option>
              </select>
            </div>
          </div>

          {/* DRAG AND DROP ZONE / FILES */}
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 block mb-3 font-light">
              Variant Images (Max 7)
            </label>

            <div className="relative group border border-dashed border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-colors duration-300 p-8 text-center cursor-pointer bg-zinc-50/50 dark:bg-zinc-950/20">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleVariantImages}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-light block">
                Click or Drag to Upload Images (Max 7)
              </span>
            </div>
          </div>

          {/* IMAGE PREVIEW ZONE */}
          {variantImages.length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {variantImages.map((image, index) => (
                  <div key={index} className="relative aspect-[3/4] bg-zinc-100 dark:bg-zinc-900 overflow-hidden border border-zinc-200 dark:border-zinc-800">
                    <img
                      src={URL.createObjectURL(image)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-black text-white dark:bg-white dark:text-black w-6 h-6 flex items-center justify-center text-xs font-light border border-white dark:border-black cursor-pointer shadow-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {variantImages.length} of 7 Images Selected
              </p>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full md:w-auto bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 py-3.5 px-10 text-xs uppercase tracking-[0.25em] font-medium transition duration-300 rounded-none cursor-pointer"
          >
            Create Variant
          </button>
        </form>
      </section>

      {/* VARIANTS TABLE SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12 pb-24">
        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 block mb-8 font-light">
          Inventory & Variants
        </span>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-900">
                <th className="pb-4 text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-light w-1/3">Images</th>
                <th className="pb-4 text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-light">Color</th>
                <th className="pb-4 text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-light">Size</th>
                <th className="pb-4 text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-light">Stock</th>
                <th className="pb-4 text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-light">Price</th>
                <th className="pb-4 text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-light text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-950">
              {product.variants?.map((variant) => (
                <tr key={variant._id} className="text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20 transition-colors">
                  <td className="py-4">
                    <div className="flex gap-2 flex-wrap">
                      {variant.images?.map((img, i) => (
                        <img
                          key={i}
                          src={img.url}
                          alt=""
                          className="w-10 h-10 object-cover grayscale hover:grayscale-0 transition-all duration-300 border border-zinc-200 dark:border-zinc-800"
                        />
                      ))}
                    </div>
                  </td>

                  <td className="py-4 text-xs uppercase tracking-wider font-light">{variant.attributes?.color}</td>
                  <td className="py-4 text-xs uppercase tracking-wider font-light">{variant.attributes?.size}</td>
                  <td className="py-4 text-xs font-light">{variant.stock}</td>
                  <td className="py-4 text-xs tracking-wider font-serif">
                    {variant.price?.amount} {variant.price?.currency}
                  </td>

                  <td className="py-4 text-right">
                    <button
                      type="button"
                      // onClick={async () => {
                      //   await handleDeleteVariant(variant._id);
                      //   fetchProduct();
                      // }}
                      className="text-[10px] uppercase tracking-[0.15em] border border-red-200 dark:border-red-950/60 hover:border-red-500 dark:hover:border-red-500 text-red-500 px-3.5 py-1.5 transition-all duration-300 rounded-none cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {product.variants?.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-light">
                    No Variants Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SellerProductDetail;
