import { useState } from "react";
import { useProduct } from "../hooks/useProduct.js";
import { useNavigate } from "react-router";

export default function CreateProduct() {
  const { handleCreateProduct } = useProduct();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "AUD",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("priceAmount", formData.priceAmount);
      payload.append("priceCurrency", formData.priceCurrency);

      images.forEach((img) => {
        payload.append("images", img);
      });

      await handleCreateProduct(payload);

      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-neutral-100">
      <div className="w-full max-w-2xl bg-neutral-900/50 backdrop-blur-xl rounded-[2rem] p-10 shadow-2xl border border-neutral-800/50">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-light tracking-tight mb-3">
            Create Product
          </h1>
          <p className="text-neutral-400 text-sm font-light tracking-wide">
            Add product details and upload images
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs text-neutral-400 uppercase tracking-wider pl-1">
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Product name"
              className="w-full bg-neutral-950/50 border border-neutral-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs text-neutral-400 uppercase tracking-wider pl-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full min-h-[120px] bg-neutral-950/50 border border-neutral-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="priceAmount"
              value={formData.priceAmount}
              onChange={handleChange}
              placeholder="0.00"
              className="bg-neutral-950/50 border border-neutral-800 rounded-2xl px-5 py-4 text-sm"
              required
            />

            <input
              name="priceCurrency"
              value={formData.priceCurrency}
              onChange={handleChange}
              className="bg-neutral-950/50 border border-neutral-800 rounded-2xl px-5 py-4 text-sm"
            />
          </div>

          <div className="space-y-2">
            <div className="border-2 border-dashed border-neutral-800 rounded-2xl p-8 text-center cursor-pointer">
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="imageUpload"
              />
              <label htmlFor="imageUpload">
                Upload Images
              </label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {images.map((file, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(file)}
                    className="h-24 w-full object-cover rounded-xl"
                  />
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 py-4 rounded-2xl text-neutral-950 font-bold"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
