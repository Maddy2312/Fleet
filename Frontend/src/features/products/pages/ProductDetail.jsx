import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router";
import useProduct from "../hook/useProduct.js";
import useCart from "../../cart/hook/useCart.js"


const ProductDetail = () => {
  const { id } = useParams();
  const { handleGetProductDetails } = useProduct();
  const { handleAddItem } = useCart();

  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [quantity, setQuantity] = useState(1);

  const rates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
  };

  // Merge variant data with main product data (variant takes precedence)
  const mergedProduct = useMemo(() => {
    if (!product) return null;
    
    if (!selectedVariant) {
      return product;
    }

    return {
      ...product,
      images: selectedVariant.images || product.images,
      price: selectedVariant.price || product.price,
      stock: selectedVariant.stock,
      attributes: selectedVariant.attributes,
    };
  }, [product, selectedVariant]);

  // Get all unique attribute keys from variants
  const attributeKeys = useMemo(() => {
    if (!product?.variants?.length) return [];
    const keys = new Set();
    product.variants.forEach((variant) => {
      Object.keys(variant.attributes || {}).forEach((key) => keys.add(key));
    });
    return Array.from(keys);
  }, [product]);

  // Get available values for each attribute
  const getAvailableValues = (attributeKey) => {
    if (!product?.variants?.length) return [];
    const values = new Set();

    product.variants.forEach((variant) => {
      // only include this variant's value if it matches other selected attributes
      const matchesOther = Object.entries(selectedAttributes).every(
        ([k, v]) => {
          if (k === attributeKey || !v) return true;
          return variant.attributes?.[k] === v;
        }
      );

      if (matchesOther && variant.attributes?.[attributeKey]) {
        values.add(variant.attributes[attributeKey]);
      }
    });

    return Array.from(values).sort();
  };

  // Find variant matching all selected attributes
  const findMatchingVariant = () => {
    if (!product?.variants?.length) return null;
    if (Object.keys(selectedAttributes).length === 0) return null;

    return product.variants.find((variant) => {
      return Object.entries(selectedAttributes).every(
        ([key, value]) => variant.attributes?.[key] === value
      );
    });
  };

  // Update variant when attributes change
  useEffect(() => {
    const matchingVariant = findMatchingVariant();
    setSelectedVariant(matchingVariant || null);
  }, [selectedAttributes, product]);

  // Prune any selected attribute values that are no longer available
  useEffect(() => {
    if (!product) return;

    setSelectedAttributes((prev) => {
      const next = { ...prev };
      let changed = false;

      Object.keys(prev).forEach((key) => {
        const available = getAvailableValues(key);
        if (prev[key] && !available.includes(prev[key])) {
          delete next[key];
          changed = true;
        }
      });

      return changed ? next : prev;
    });
  }, [selectedAttributes, product]);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await handleGetProductDetails(id);

      if (data) {
        setProduct(data);
      }
    };

    fetchProduct();
  }, [id]);

  // Auto Slider
  useEffect(() => {
    if (!mergedProduct?.images?.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === mergedProduct.images.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [mergedProduct]);

  // Reset image index when variant is selected
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedVariant]);

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === mergedProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? mergedProduct.images.length - 1 : prev - 1
    );
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div
            className="w-3 h-3 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0.15s" }}
          ></div>
          <div
            className="w-3 h-3 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></div>
        </div>
      </div>
    );
  }

  const convertedPrice = (
    mergedProduct.price.amount * rates[currency]
  ).toFixed(2);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-black tracking-widest">
            FLEET
          </h1>
        </div>
      </div>

      {/* Product */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT */}
          <div>
            <div className="relative border border-zinc-800 overflow-hidden">

              <img
                src={mergedProduct.images[currentIndex]?.url}
                alt={mergedProduct.title}
                className="w-full h-[700px] object-cover duration-500"
              />

              {/* Previous */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white w-12 h-12 rounded-full text-xl"
              >
                ❮
              </button>

              {/* Next */}
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white w-12 h-12 rounded-full text-xl"
              >
                ❯
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">
              {mergedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt=""
                  onClick={() => setCurrentIndex(index)}
                  className={`h-24 w-24 object-cover cursor-pointer border transition-all ${
                    currentIndex === index
                      ? "border-white scale-105"
                      : "border-zinc-700"
                  }`}
                />
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-5">
              {mergedProduct.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentIndex === index
                      ? "bg-white"
                      : "bg-zinc-600"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-center">
            <span className="uppercase text-zinc-500 tracking-[0.4em] text-sm">
              Premium Collection
            </span>

            <h2 className="text-5xl font-black uppercase mt-4 mb-2">
              {mergedProduct.title}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="text-sm text-zinc-400">(125 reviews)</span>
            </div>

            {/* PRICE SECTION */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg mb-6">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-4xl font-black">
                  {currency} {convertedPrice}
                </span>
                <span className="text-lg text-zinc-500 line-through">
                  {currency} {(mergedProduct.price.amount * rates[currency] * 1.2).toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-green-400 mb-4">Save 20% on this item</p>
              
              {/* CURRENCY SELECTOR */}
              <div>
                <label className="text-xs text-zinc-400 uppercase tracking-wider block mb-2">
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 hover:border-zinc-600 px-4 py-2 rounded text-white focus:border-white focus:outline-none transition font-medium cursor-pointer"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>
            </div>

            {/* VARIANT OPTIONS */}
            {product.variants && product.variants.length > 0 && attributeKeys.length > 0 && (
              <div className="mb-8">
                <label className="block text-sm font-bold text-white mb-4 uppercase tracking-wider">
                  Choose Your Options
                </label>
                <div className="space-y-4">
                  {attributeKeys.map((key) => (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-semibold text-white capitalize">
                          {key}
                        </label>
                        {selectedAttributes[key] && (
                          <span className="text-sm text-zinc-400">
                            Selected: <span className="font-bold text-white">{selectedAttributes[key]}</span>
                          </span>
                        )}
                      </div>
                      <select
                        value={selectedAttributes[key] || ""}
                        onChange={(e) =>
                          setSelectedAttributes((prev) => ({
                            ...prev,
                            [key]: e.target.value || undefined,
                          }))
                        }
                        className="w-full bg-zinc-800 border-2 border-zinc-700 hover:border-zinc-600 px-4 py-3 rounded-lg text-white focus:border-white focus:outline-none transition font-medium cursor-pointer"
                      >
                        <option value="">Select {key}</option>
                        {getAvailableValues(key).map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STOCK STATUS */}
            {selectedVariant && (
              <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${
                selectedVariant.stock > 0 
                  ? "bg-green-900/30 border border-green-700" 
                  : "bg-red-900/30 border border-red-700"
              }`}>
                <div className={`w-3 h-3 rounded-full ${selectedVariant.stock > 0 ? "bg-green-400" : "bg-red-400"}`}></div>
                <div>
                  <p className={`font-semibold ${selectedVariant.stock > 0 ? "text-green-300" : "text-red-300"}`}>
                    {selectedVariant.stock > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {selectedVariant.stock > 0 
                      ? `${selectedVariant.stock} items available` 
                      : "This variant is currently unavailable"}
                  </p>
                </div>
              </div>
            )}

            {/* QUANTITY SELECTOR */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                Quantity
              </label>
              <div className="flex items-center border-2 border-zinc-700 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-5 py-3 text-white hover:bg-zinc-800 transition font-bold text-lg"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 bg-transparent text-center text-white font-bold outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-5 py-3 text-white hover:bg-zinc-800 transition font-bold text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 mb-8">
              <button onClick={() => {
                  handleAddItem({
                    productId: product._id,
                  variantId: selectedVariant._id,
                  })
                }
              } className="flex-1 bg-white text-black px-8 py-4 font-bold uppercase hover:bg-zinc-100 transition transform hover:scale-105 active:scale-95">
                Add To Cart
              </button>
              <button className="flex-1 border-2 border-white text-white px-8 py-4 uppercase font-bold hover:bg-white hover:text-black transition transform hover:scale-105 active:scale-95">
                Buy Now
              </button>
            </div>

            {/* DESCRIPTION */}
            <div className="mb-8 pb-8 border-b border-zinc-800">
              <p className="text-zinc-400 text-base leading-relaxed">
                {mergedProduct.description}
              </p>
            </div>

            {/* INFO CARDS */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Images</p>
                <p className="text-2xl font-bold">{mergedProduct.images.length}</p>
              </div>
              
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Original Price</p>
                <p className="text-lg font-bold">{mergedProduct.price.currency} {mergedProduct.price.amount}</p>
              </div>

              {selectedVariant && (
                <>
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Stock</p>
                    <p className={`text-2xl font-bold ${selectedVariant.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                      {selectedVariant.stock > 0 ? selectedVariant.stock : "0"}
                    </p>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Currency</p>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full bg-transparent text-white font-bold text-lg focus:outline-none cursor-pointer"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            {Object.keys(selectedAttributes).length > 0 && (
              <button
                onClick={() => setSelectedAttributes({})}
                className="mt-6 w-full text-center text-sm text-zinc-400 hover:text-white transition py-2"
              >
                Clear All Selections
              </button>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default ProductDetail;