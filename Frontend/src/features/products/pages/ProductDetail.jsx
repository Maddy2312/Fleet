import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useProduct from "../hook/useProduct";

const ProductDetail = () => {
  const { id } = useParams();
  const { handleGetProductDetails } = useProduct();

  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currency, setCurrency] = useState("USD");

  const rates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
  };

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
    if (!product?.images?.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [product]);

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
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
    product.price.amount * rates[currency]
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
                src={product.images[currentIndex]?.url}
                alt={product.title}
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
              {product.images.map((image, index) => (
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
              {product.images.map((_, index) => (
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

            <h2 className="text-6xl font-black uppercase mt-4">
              {product.title}
            </h2>

            <div className="mt-8">
              <label className="block mb-2 text-zinc-400">
                Currency
              </label>

              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 px-4 py-3 rounded-lg"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            <div className="mt-8">
              <span className="text-5xl font-black">
                {currency} {convertedPrice}
              </span>
            </div>

            <p className="text-zinc-400 text-lg mt-8 leading-relaxed">
              {product.description}
            </p>

            <div className="flex gap-4 mt-10">
              <button className="bg-white text-black px-8 py-4 font-bold uppercase">
                Add To Cart
              </button>

              <button className="border border-white px-8 py-4 uppercase hover:bg-white hover:text-black transition">
                Buy Now
              </button>
            </div>

            <div className="mt-14 border-t border-zinc-800 pt-8 space-y-4">
              <div className="flex justify-between">
                <span className="text-zinc-500">
                  Original Price
                </span>
                <span>
                  {product.price.amount} {product.price.currency}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-500">
                  Converted Price
                </span>
                <span>
                  {currency} {convertedPrice}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-500">
                  Images
                </span>
                <span>{product.images.length}</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ProductDetail;