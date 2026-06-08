import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useProduct from "../hook/useProduct";
import { useNavigate } from "react-router";

const Home = () => {
  const { handleGetProducts } = useProduct();
  const navigate = useNavigate();

  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 transition-colors duration-500">
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center py-24 md:py-36 px-6 relative border-b border-zinc-200 dark:border-zinc-900">
        <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500 mb-6 font-light">
          Fleet / Summer 2026
        </span>
        <h1 className="text-4xl md:text-7xl font-serif font-light tracking-[0.15em] uppercase leading-tight max-w-4xl text-zinc-950 dark:text-white">
          THE ART OF MODERN LUXURY
        </h1>
        <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400 mt-6 max-w-md font-light leading-relaxed">
          Curated collections designed for modern lifestyle. Engineered with
          minimalist sophistication.
        </p>
        <div className="mt-10">
          <button
            onClick={() => {
              const inventory = document.getElementById("inventory");
              if (inventory) inventory.scrollIntoView({ behavior: "smooth" });
            }}
            className="border border-zinc-900 dark:border-white px-8 py-3.5 text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 font-medium cursor-pointer"
          >
            Explore Inventory
          </button>
        </div>
      </section>

      {/* FEATURED EDITORIAL GRID */}
      {products?.length > 0 && (
        <section className="border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950/20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-900">
            {/* Column 1: Editorial text */}
            <div className="p-12 md:p-16 flex flex-col justify-between min-h-[400px]">
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">
                Curated Select
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-light tracking-wide uppercase text-zinc-950 dark:text-white my-8 leading-tight">
                NOT FOR THE MANY, <br /> FOR THE FEW
              </h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 font-light">
                Volume I / Editorial
              </p>
            </div>

            {/* Column 2: Large image */}
            <div className="relative overflow-hidden group min-h-[400px]">
              <img
                src={products[0]?.images?.[0]?.url}
                alt={products[0]?.title}
                className="w-full h-full min-h-[400px] object-cover grayscale brightness-95 group-hover:scale-105 transition-all duration-700 cursor-pointer"
                onClick={() => navigate(`/product/${products[0]._id}`)}
              />
            </div>

            {/* Column 3: Secondary Editorial text */}
            <div className="p-12 md:p-16 flex flex-col justify-between min-h-[400px]">
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">
                Design Ethos
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-light tracking-wide uppercase text-zinc-950 dark:text-white my-8 leading-tight">
                ENGINEERED FOR INDIVIDUAL STYLE
              </h2>
              <span
                onClick={() => navigate(`/product/${products[0]._id}`)}
                className="text-[10px] uppercase tracking-[0.25em] text-zinc-950 dark:text-white hover:underline underline-offset-4 cursor-pointer font-medium"
              >
                View Featured Product →
              </span>
            </div>
          </div>
        </section>
      )}

      {/* LARGE BANNER */}
      {products?.length > 1 && (
        <section className="py-20 md:py-28 px-6 md:px-12 border-b border-zinc-200 dark:border-zinc-900 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">
                Craftsmanship
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-light tracking-wide uppercase leading-tight text-zinc-950 dark:text-white">
                WHEN QUALITY MATTERS, EVERYTHING ELSE GOES QUIET.
              </h2>
              <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 font-light leading-relaxed max-w-md">
                Our collection represents absolute precision. Handcrafted
                details, clean silhouettes, and pure materials.
              </p>
              <button
                onClick={() => navigate(`/product/${products[1]._id}`)}
                className="border border-zinc-900 dark:border-white px-8 py-3.5 text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 font-medium cursor-pointer"
              >
                View Details
              </button>
            </div>
            <div className="relative overflow-hidden aspect-[4/5] bg-zinc-100 dark:bg-zinc-900">
              <img
                src={
                  products[1]?.images?.[0]?.url || products[0]?.images?.[0]?.url
                }
                alt="Luxury Editorial"
                className="w-full h-full object-cover grayscale brightness-95 hover:scale-105 transition-all duration-700"
              />
            </div>
          </div>
        </section>
      )}

      {/* INVENTORY / CATALOGUE */}
      <section id="inventory" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 block mb-2 font-light">
              Catalogue
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-light tracking-[0.15em] uppercase text-zinc-950 dark:text-white">
              INVENTORY
            </h2>
          </div>
          <button className="text-[10px] uppercase tracking-[0.2em] border-b border-zinc-950 dark:border-white pb-1 hover:text-zinc-400 dark:hover:text-zinc-500 hover:border-zinc-400 dark:hover:border-zinc-500 transition-all duration-300 font-medium cursor-pointer">
            VIEW ALL
          </button>
        </div>

        {products?.length === 0 ? (
          <div className="text-center py-24 border border-zinc-200 dark:border-zinc-900">
            <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-light">
              No products available at this time
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
            {products?.map((product) => (
              <div
                onClick={() => navigate(`/product/${product._id}`)}
                key={product._id}
                className="group cursor-pointer flex flex-col justify-between h-full"
              >
                <div>
                  <div className="overflow-hidden bg-zinc-100 dark:bg-zinc-900 aspect-[3/4] relative mb-4">
                    <img
                      src={product.images?.[0]?.url}
                      alt={product.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-zinc-950 dark:text-white mb-1.5 truncate group-hover:underline decoration-1 underline-offset-4">
                    {product.title}
                  </h3>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 line-clamp-2 uppercase tracking-wider font-light leading-relaxed mb-4">
                    {product.description}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-serif tracking-wider text-zinc-950 dark:text-white">
                    ${product.price?.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* NEWSLETTER */}
      <section className="border-t border-zinc-200 dark:border-zinc-900 py-24 px-6 md:px-12 bg-zinc-50 dark:bg-zinc-950/20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500 font-light">
            Newsletter
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light tracking-[0.15em] uppercase text-zinc-950 dark:text-white">
            SUBSCRIBE
          </h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 max-w-md mx-auto leading-relaxed font-light">
            Subscribe to receive updates on collections, events, and early
            access.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 max-w-md mx-auto">
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL"
              className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-800 focus:border-black focus:dark:border-white py-3 px-0 outline-none text-xs tracking-widest text-zinc-900 dark:text-white placeholder-zinc-300 dark:placeholder-zinc-700 font-light rounded-none text-center sm:text-left"
            />
            <button className="w-full sm:w-auto bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 py-3.5 px-8 text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-none cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 py-16 px-6 md:px-12 bg-white dark:bg-black transition-colors duration-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
          <div className="font-serif text-xl tracking-[0.3em] text-zinc-950 dark:text-white">
            FLEET
          </div>
          <div>© 2026 Fleet. All Rights Reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
