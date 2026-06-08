import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router";
import useProduct from "../hook/useProduct.js";
import useCart from "../../cart/hook/useCart.js";
import { Sun, Moon } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 transition-colors duration-500">
        <span className="text-xs uppercase tracking-[0.3em] font-light animate-pulse">
          Loading Details...
        </span>
      </div>
    );
  }

  const convertedPrice = (
    mergedProduct.price.amount * rates[currency]
  ).toFixed(2);

  return (
    <div className="w-full min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 transition-colors duration-500">
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT COLUMN - GALLERY */}
          <div className="space-y-6">
            <div className="relative border border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950 aspect-[3/4] overflow-hidden group">
              <img
                src={mergedProduct.images[currentIndex]?.url}
                alt={mergedProduct.title}
                className="w-full h-full object-cover brightness-[0.98] transition-all duration-500"
              />

              {/* Navigation Arrows */}
              {mergedProduct.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-950 dark:text-white text-lg font-light hover:opacity-75 bg-white/40 dark:bg-black/40 hover:bg-white/75 dark:hover:bg-black/75 h-10 w-10 flex items-center justify-center transition cursor-pointer"
                  >
                    ❮
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-950 dark:text-white text-lg font-light hover:opacity-75 bg-white/40 dark:bg-black/40 hover:bg-white/75 dark:hover:bg-black/75 h-10 w-10 flex items-center justify-center transition cursor-pointer"
                  >
                    ❯
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {mergedProduct.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                {mergedProduct.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt=""
                    onClick={() => setCurrentIndex(index)}
                    className={`h-20 w-20 object-cover cursor-pointer transition-all duration-300 ${
                      currentIndex === index
                        ? "border border-zinc-950 dark:border-white scale-102"
                        : "border border-transparent opacity-60 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - PRODUCT INFO */}
          <div className="flex flex-col justify-start">
            <span className="uppercase text-zinc-400 dark:text-zinc-500 tracking-[0.4em] text-[10px] font-light">
              Premium Collection
            </span>

            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-wide uppercase text-zinc-950 dark:text-white mt-4 mb-2 leading-tight">
              {mergedProduct.title}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2 mb-6">
              <div className="flex text-zinc-950 dark:text-white text-xs tracking-wider">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-light">
                (125 reviews)
              </span>
            </div>

            {/* Price Presentation */}
            <div className="my-6 space-y-4">
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-serif tracking-wider text-zinc-950 dark:text-white">
                  {currency} {convertedPrice}
                </span>
                <span className="text-sm text-zinc-400 dark:text-zinc-600 line-through font-light">
                  {currency} {(mergedProduct.price.amount * rates[currency] * 1.2).toFixed(2)}
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 font-light">
                Save 20% on this item
              </p>
            </div>

            {/* Currency Selector */}
            <div className="max-w-xs mb-8">
              <label className="text-[9px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 block mb-2 font-light">
                Select Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:border-black focus:dark:border-white py-2 px-0 outline-none text-xs uppercase tracking-widest text-zinc-950 dark:text-zinc-100 transition-colors duration-300 rounded-none cursor-pointer"
              >
                <option value="USD" className="bg-white dark:bg-black text-zinc-950 dark:text-white">USD - US Dollar</option>
                <option value="EUR" className="bg-white dark:bg-black text-zinc-950 dark:text-white">EUR - Euro</option>
                <option value="GBP" className="bg-white dark:bg-black text-zinc-950 dark:text-white">GBP - British Pound</option>
              </select>
            </div>

            {/* Variant options */}
            {product.variants && product.variants.length > 0 && attributeKeys.length > 0 && (
              <div className="mb-8">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-950 dark:text-white mb-4 font-medium">
                  Choose Your Options
                </label>
                <div className="space-y-6">
                  {attributeKeys.map((key) => (
                    <div key={key} className="max-w-xs">
                      <div className="flex justify-between items-center mb-2 text-[10px] uppercase tracking-[0.2em]">
                        <label className="text-zinc-400 dark:text-zinc-500 font-light capitalize">{key}</label>
                        {selectedAttributes[key] && (
                          <span className="text-zinc-950 dark:text-white font-medium">
                            {selectedAttributes[key]}
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
                        className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:border-black focus:dark:border-white py-2 px-0 outline-none text-xs uppercase tracking-widest text-zinc-950 dark:text-zinc-100 transition-colors duration-300 rounded-none cursor-pointer"
                      >
                        <option value="" className="bg-white dark:bg-black text-zinc-950 dark:text-white">Select {key}</option>
                        {getAvailableValues(key).map((value) => (
                          <option key={value} value={value} className="bg-white dark:bg-black text-zinc-950 dark:text-white">
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stock status */}
            {selectedVariant && (
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider mb-8">
                <div className={`w-1.5 h-1.5 rounded-full ${selectedVariant.stock > 0 ? "bg-zinc-950 dark:bg-white animate-pulse" : "bg-red-500"}`}></div>
                <span className="text-zinc-500 dark:text-zinc-400 font-light">
                  {selectedVariant.stock > 0 
                    ? `In Stock (${selectedVariant.stock} items available)` 
                    : "Out of Stock - Variant Unavailable"}
                </span>
              </div>
            )}

            {/* Quantity selection */}
            <div className="mb-8">
              <label className="block text-[10px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 mb-3 font-light">
                Quantity
              </label>
              <div className="flex items-center border border-zinc-200 dark:border-zinc-800 w-fit bg-transparent">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition text-zinc-500 hover:text-black dark:hover:text-white font-light text-sm cursor-pointer"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 bg-transparent text-center text-xs font-light text-zinc-950 dark:text-white outline-none rounded-none border-none focus:ring-0"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition text-zinc-500 hover:text-black dark:hover:text-white font-light text-sm cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                type="button"
                onClick={() => {
                  handleAddItem({
                    productId: product._id,
                    variantId: selectedVariant?._id,
                  });
                }}
                className="flex-1 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 py-4 text-xs uppercase tracking-[0.25em] font-medium transition duration-300 rounded-none cursor-pointer"
              >
                Add To Cart
              </button>
              <button
                type="button"
                className="flex-1 border border-zinc-950 dark:border-white hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-black py-4 text-xs uppercase tracking-[0.25em] font-medium transition duration-300 rounded-none cursor-pointer text-zinc-950 dark:text-white"
              >
                Buy Now
              </button>
            </div>

            {/* DESCRIPTION */}
            <div className="mb-8 pt-6 border-t border-zinc-200 dark:border-zinc-900">
              <p className="text-zinc-500 dark:text-zinc-400 text-xs tracking-wider leading-relaxed font-light uppercase">
                {mergedProduct.description}
              </p>
            </div>

            {/* Technical stats display */}
            <div className="divide-y divide-zinc-200 dark:divide-zinc-900 text-[9px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-light pt-4 border-t border-zinc-200 dark:border-zinc-900">
              <div className="flex justify-between py-3">
                <span>Images in Gallery</span>
                <span className="text-zinc-950 dark:text-white font-medium">{mergedProduct.images.length}</span>
              </div>
              <div className="flex justify-between py-3">
                <span>Base Unit Price</span>
                <span className="text-zinc-950 dark:text-white font-medium">{mergedProduct.price.currency} {mergedProduct.price.amount}</span>
              </div>
              {selectedVariant && (
                <div className="flex justify-between py-3">
                  <span>Available Stock</span>
                  <span className="text-zinc-950 dark:text-white font-medium">{selectedVariant.stock}</span>
                </div>
              )}
            </div>

            {Object.keys(selectedAttributes).length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedAttributes({})}
                className="mt-6 w-full text-center text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition py-2 underline underline-offset-4 cursor-pointer"
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