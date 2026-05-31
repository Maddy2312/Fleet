import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useProduct from "../hook/useProduct";

const Home = () => {
  const { handleGetProducts } = useProduct();

  const products = useSelector(
    (state) => state.product.products
  );

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">

        <div className="flex justify-between text-xs uppercase tracking-[0.3em] text-zinc-600 mb-12">
          <span>[ Fleet Marketplace ]</span>
          <span>[ Premium Collection ]</span>
        </div>

        <h1 className="text-6xl md:text-[11rem] font-black uppercase leading-[0.85] tracking-tight">
          FOR USERS,
          <br />
          NOT VIEWERS
        </h1>

      </section>

      {/* FEATURED SECTION */}
      {products?.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-10">

          <div className="bg-[#0a0a0a] border border-zinc-800 p-6 md:p-10">

            <div className="grid lg:grid-cols-3 gap-10 items-center">

              <div>
                <h2 className="text-4xl md:text-6xl font-black uppercase leading-none">
                  NOT FOR
                  <br />
                  MANY
                  <br />
                  FOR THE
                  <br />
                  FEW
                </h2>
              </div>

              <div>
                <img
                  src={products[0]?.images?.[0]?.url}
                  alt={products[0]?.title}
                  className="w-full h-[650px] object-cover"
                />
              </div>

              <div>
                <h2 className="text-4xl md:text-6xl font-black uppercase leading-none text-right">
                  ENGINEERED
                  <br />
                  FOR STYLE
                  <br />
                  NOT FOR
                  <br />
                  CROWD
                </h2>
              </div>

            </div>

          </div>

        </section>
      )}

      {/* LARGE BANNER */}
      {products?.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-24">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <h2 className="text-5xl md:text-8xl font-black uppercase leading-[0.9]">
                WHEN QUALITY
                <br />
                MATTERS,
                <br />
                EVERYTHING
                <br />
                ELSE GOES
                <br />
                QUIET
              </h2>

              <p className="text-zinc-400 mt-8 max-w-lg text-lg">
                Premium products crafted by verified sellers.
                Built for performance, quality, and modern lifestyle.
              </p>

              <button
                className="
                mt-10
                border
                border-white
                px-10
                py-4
                uppercase
                tracking-widest
                hover:bg-white
                hover:text-black
                transition
              "
              >
                Explore Collection
              </button>

            </div>

            <div>

              <img
                src={
                  products[1]?.images?.[0]?.url ||
                  products[0]?.images?.[0]?.url
                }
                alt=""
                className="w-full h-[750px] object-cover"
              />

            </div>

          </div>

        </section>
      )}

      {/* INVENTORY */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24">

        <div className="flex justify-between items-center mb-14">

          <h2 className="text-5xl md:text-7xl font-black uppercase">
            Inventory
          </h2>

          <button
            className="
            border
            border-zinc-700
            px-6
            py-3
            uppercase
            hover:border-white
            transition
          "
          >
            View All
          </button>

        </div>

        {products?.length === 0 ? (
          <div className="text-center py-20">

            <h3 className="text-3xl font-bold">
              No Products Found
            </h3>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {products?.map((product) => (
              <div
                key={product._id}
                className="
                  bg-[#0a0a0a]
                  border
                  border-zinc-800
                  overflow-hidden
                  group
                  hover:border-white
                  transition-all
                  duration-500
                "
              >

                <div className="overflow-hidden">

                  <img
                    src={product.images?.[0]?.url}
                    alt={product.title}
                    className="
                      h-[420px]
                      w-full
                      object-cover
                      group-hover:scale-105
                      transition
                      duration-700
                    "
                  />

                </div>

                <div className="p-6">

                  <h3 className="text-2xl font-black uppercase">
                    {product.title}
                  </h3>

                  <p className="text-zinc-500 mt-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mt-8">

                    <span className="text-3xl font-black">
                      ${product.price.amount}
                    </span>

                    <button
                      className="
                        w-12
                        h-12
                        border
                        border-white
                        flex
                        items-center
                        justify-center
                        hover:bg-white
                        hover:text-black
                        transition
                      "
                    >
                      →
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>

      {/* NEWSLETTER */}
      <section className="border-t border-zinc-800 py-24">

        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <h2 className="text-5xl md:text-7xl font-black uppercase">
            Stay Updated
          </h2>

          <p className="text-zinc-500 mt-4 text-lg">
            Get notified when new products arrive.
          </p>

          <div className="flex flex-col md:flex-row gap-4 mt-10">

            <input
              type="email"
              placeholder="ENTER YOUR EMAIL"
              className="
                flex-1
                bg-transparent
                border
                border-zinc-800
                px-6
                py-4
                outline-none
                focus:border-white
              "
            />

            <button
              className="
                bg-white
                text-black
                px-10
                py-4
                font-bold
                uppercase
                hover:bg-zinc-200
                transition
              "
            >
              Subscribe
            </button>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-20">

        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <h2 className="text-[5rem] md:text-[10rem] font-black leading-none">
            FLEET
          </h2>

          <div className="flex flex-col md:flex-row justify-between mt-10 text-zinc-500">

            <p>
              Premium Marketplace for Modern Commerce
            </p>

            <p>
              © 2026 Fleet. All Rights Reserved.
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default Home;