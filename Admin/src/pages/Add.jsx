
import React, { useContext } from 'react';
import Nav from '../components/Nav.jsx';
import Sidebar from '../components/Sidebar.jsx';
import upload from '../assets/upload.jpg';
import axios from 'axios';
import { AuthDataContext } from '../Context/AuthDataContext.jsx';

const Add = () => {
  // ✅ All useStates at top (Hooks cannot be inside JSX)
  const [image, setImage] = React.useState("");
  const [image1, setImage1] = React.useState("");
  const [image2, setImage2] = React.useState("");
  const [image3, setImage3] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [subcategory, setSubcategory] = React.useState("");
  const [bestseller, setBestseller] = React.useState(false);
  const [size, setSize] = React.useState(""); // ✅ single selected size
  const [stock, setStock] = React.useState("");
  const { serverURL } = useContext(AuthDataContext);

  const toggleSize = (sz) => {
    setSize((prev) =>
      prev.includes(sz) ? prev.filter((s) => s !== sz) : [...prev, sz]
    );
  };
  // ✅ handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formdata = new FormData();
      formdata.append("image", image);
      formdata.append("image1", image1);
      formdata.append("image2", image2);
      formdata.append("image3", image3);
      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("category", category);
      formdata.append("price", price);
      formdata.append("subcategory", subcategory);
      formdata.append("bestseller", bestseller);
      formdata.append("size", JSON.stringify(["S", "L", "XXL"]));
      formdata.append("stock", stock);

      let result = await axios.post(`${serverURL}/api/product/addproduct`, formdata, {
        withCredentials: true,
      });

      if (result.status === 201 || result.status === 200) {
        console.log("✅ Product added successfully:", result.data);

        // reset fields
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setSubcategory("");
        setBestseller(false);
        setSize("");
        setStock("");
        setImage(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
      } else {
        console.log("❌ Failed to add product:", result);
      }
    } catch (error) {
      console.error("⚠️ Error adding product:", error);
    }
  };

  return (
    <div className="min-h-screen text-ink">
      <Nav />
      <Sidebar />

      <main className="min-h-screen pt-[72px] md:pl-64">
        <section className="mx-auto max-w-[1440px] px-4 pb-16 pt-8 sm:px-7 sm:pt-10 lg:px-10">
          <header className="animate-reveal mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-forest/65">
                <span className="h-2 w-2 rounded-sm bg-coral" /> Catalog / New item
              </p>
              <h1 className="font-display text-3xl font-semibold tracking-normal text-ink sm:text-4xl">Add a product</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-ink/60">Create a complete product listing with clear images, sizing, and inventory details.</p>
            </div>
            <div className="flex items-center gap-2 self-start rounded-full border border-rule bg-white px-3 py-2 text-xs font-semibold text-forest sm:self-auto">
              <span className="h-2 w-2 rounded-full bg-[#8dbd37]" /> Changes save on submit
            </div>
          </header>

          <form
            onSubmit={handleSubmit}
            className="animate-reveal-late mx-auto flex w-full max-w-5xl flex-col gap-7 rounded-lg border border-rule bg-white p-5 shadow-[0_18px_50px_rgba(23,37,29,0.06)] sm:p-8 lg:p-10"
          >
            <div className="flex items-start justify-between gap-4 border-b border-rule pb-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-coral">Product details</p>
                <h2 className="mt-1 font-display text-xl font-semibold text-ink">Build your listing</h2>
              </div>
              <span className="rounded-md bg-leaf/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-forest">Required fields</span>
            </div>

            {/* Product Name */}
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
              Product name
              <input
                type="text"
                placeholder="e.g. Relaxed cotton overshirt"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="min-h-12 w-full rounded-lg border border-rule bg-paper/55 px-4 text-sm font-normal text-ink placeholder:text-ink/35 transition focus:border-forest focus:bg-white focus:ring-4 focus:ring-forest/10"
              />
            </label>

            {/* Product Description */}
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
              Description
              <textarea
                placeholder="Describe the fit, fabric, and details customers should know."
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-28 w-full resize-y rounded-lg border border-rule bg-paper/55 px-4 py-3 text-sm font-normal leading-6 text-ink placeholder:text-ink/35 transition focus:border-forest focus:bg-white focus:ring-4 focus:ring-forest/10"
              />
            </label>

            {/* Price + Stock */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                Price <span className="sr-only">in rupees</span>
                <div className="flex min-h-12 items-center rounded-lg border border-rule bg-paper/55 px-4 transition focus-within:border-forest focus-within:bg-white focus-within:ring-4 focus-within:ring-forest/10">
                  <span className="mr-2 text-sm text-ink/40">₹</span>
                  <input type="number" placeholder="0.00" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-transparent text-sm font-normal text-ink outline-none placeholder:text-ink/35" />
                </div>
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                Stock quantity
                <input type="number" placeholder="Available units" required value={stock} onChange={(e) => setStock(e.target.value)} className="min-h-12 w-full rounded-lg border border-rule bg-paper/55 px-4 text-sm font-normal text-ink placeholder:text-ink/35 transition focus:border-forest focus:bg-white focus:ring-4 focus:ring-forest/10" />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                Category
                <select required value={category} onChange={(e) => setCategory(e.target.value)} className="min-h-12 w-full rounded-lg border border-rule bg-paper/55 px-4 text-sm font-normal text-ink transition focus:border-forest focus:bg-white focus:ring-4 focus:ring-forest/10">
                  <option value="" hidden>Select category</option>
                  <option value="MEN">Men</option>
                  <option value="WOMEN">Women</option>
                  <option value="KIDS">Kids</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                Subcategory
                <select required value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="min-h-12 w-full rounded-lg border border-rule bg-paper/55 px-4 text-sm font-normal text-ink transition focus:border-forest focus:bg-white focus:ring-4 focus:ring-forest/10">
                  <option value="" hidden>Select subcategory</option>
                  <option value="TOPWEAR">Topwear</option>
                  <option value="BOTTOMWEAR">Bottomwear</option>
                  <option value="WINTERWEAR">Winterwear</option>
                </select>
              </label>
            </div>

            {/* Size Selector */}
            <div>
              <p className="mb-3 text-sm font-semibold text-ink">Available sizes</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {["S", "M", "L", "XL", "XXL"].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => toggleSize(sz)} // ✅ use toggle instead of setSize
                    className={`min-h-11 rounded-lg border px-4 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${size.includes(sz)
                      ? "border-forest bg-forest text-leaf shadow-[0_6px_14px_rgba(36,73,54,0.18)]"
                      : "border-rule bg-white text-ink/70 hover:border-forest/35 hover:bg-paper"
                      }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Bestseller */}
            <label className="flex w-fit cursor-pointer items-center gap-3 rounded-lg border border-rule bg-paper/55 px-4 py-3 transition hover:border-forest/30">
              <input
                type="checkbox"
                id="bestseller"
                checked={bestseller}
                onChange={(e) => setBestseller(e.target.checked)}
                className="h-4 w-4 accent-[#244936]"
              />
              <span className="text-sm font-semibold text-ink">Mark as bestseller</span>
            </label>

            {/* Image Upload Section */}
            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold text-ink">
                Product images <span className="ml-1 font-normal text-ink/45">(4 required)</span>
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {/* Image 1 */}
                <label htmlFor="image" className="group flex cursor-pointer flex-col items-center rounded-lg border border-dashed border-rule bg-paper/55 p-3 transition hover:border-forest/55 hover:bg-[#f7faef]">
                  <img
                    src={!image ? upload : URL.createObjectURL(image)}
                    alt="upload"
                    className="aspect-square w-full rounded-md border border-rule object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    accept="image/*"
                    required
                    onChange={(event) => setImage(event.target.files[0])}
                  />
                  <span className="mt-2 text-xs font-semibold text-forest">Choose image</span>
                </label>

                {/* Image 2 */}
                <label htmlFor="image1" className="group flex cursor-pointer flex-col items-center rounded-lg border border-dashed border-rule bg-paper/55 p-3 transition hover:border-forest/55 hover:bg-[#f7faef]">
                  <img
                    src={!image1 ? upload : URL.createObjectURL(image1)}
                    alt="upload"
                    className="aspect-square w-full rounded-md border border-rule object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  <input
                    type="file"
                    id="image1"
                    className="hidden"
                    accept="image/*"
                    required
                    onChange={(event) => setImage1(event.target.files[0])}
                  />
                  <span className="mt-2 text-xs font-semibold text-forest">Choose image</span>
                </label>

                {/* Image 3 */}
                <label htmlFor="image2" className="group flex cursor-pointer flex-col items-center rounded-lg border border-dashed border-rule bg-paper/55 p-3 transition hover:border-forest/55 hover:bg-[#f7faef]">
                  <img
                    src={!image2 ? upload : URL.createObjectURL(image2)}
                    alt="upload"
                    className="aspect-square w-full rounded-md border border-rule object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  <input
                    type="file"
                    id="image2"
                    className="hidden"
                    accept="image/*"
                    required
                    onChange={(event) => setImage2(event.target.files[0])}
                  />
                  <span className="mt-2 text-xs font-semibold text-forest">Choose image</span>
                </label>

                {/* Image 4 */}
                <label htmlFor="image3" className="group flex cursor-pointer flex-col items-center rounded-lg border border-dashed border-rule bg-paper/55 p-3 transition hover:border-forest/55 hover:bg-[#f7faef]">
                  <img
                    src={!image3 ? upload : URL.createObjectURL(image3)}
                    alt="upload"
                    className="aspect-square w-full rounded-md border border-rule object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  <input
                    type="file"
                    id="image3"
                    className="hidden"
                    accept="image/*"
                    required
                    onChange={(event) => setImage3(event.target.files[0])}
                  />
                  <span className="mt-2 text-xs font-semibold text-forest">Choose image</span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-forest px-5 text-sm font-bold text-leaf shadow-[0_10px_22px_rgba(36,73,54,0.15)] transition duration-200 hover:-translate-y-0.5 hover:bg-ink sm:w-auto sm:min-w-48"
            >
              Publish product <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Add;