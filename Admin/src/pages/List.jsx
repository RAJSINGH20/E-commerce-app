import React, { useState, useEffect, useContext, useCallback } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { AuthDataContext } from "../Context/AuthDataContext.jsx";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiPackage, FiRefreshCw, FiTrash2 } from "react-icons/fi";

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { serverURL } = useContext(AuthDataContext); // ✅ destructure correctly

  // ✅ Fetch all products
  const fetchList = useCallback(async () => {
    try {
      const response = await axios.get(`${serverURL}/api/product/GetProducts`, {
        withCredentials: true,
      });

      console.log("Fetched products:", response.data);

      // ✅ Handle both response shapes: { products: [...] } or [...]
      if (Array.isArray(response.data)) {
        setList(response.data);
      } else if (Array.isArray(response.data.products)) {
        setList(response.data.products);
      } else {
        setList([]);
        console.warn("Unexpected response format:", response.data);
      }
    } catch (err) {
      console.error("Error fetching product list:", err);
      setError("Failed to fetch product list.");
    } finally {
      setLoading(false);
    }
  }, [serverURL]);

  // ✅ Remove product
  const removeList = async (id) => {
    try {
      const result = await axios.get(`${serverURL}/api/product/removeproduct/${id}`, {
        withCredentials: true,
      });

      console.log("Remove result:", result.data);

      if (result.data && result.status === 200) {
        fetchList(); // refresh list
      } else {
        setError("Failed to remove product.");
      }
    } catch (err) {
      console.error("Error removing product:", err);
      setError("Failed to remove product.");
    }
  };

  // ✅ Fetch once on mount
  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <div className="min-h-screen text-ink">
      <Nav />
      <Sidebar />

      <main className="min-h-screen pt-[72px] md:pl-64">
        <section className="mx-auto max-w-[1440px] px-4 pb-16 pt-8 sm:px-7 sm:pt-10 lg:px-10">
          <header className="animate-reveal mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-forest/65">
                <span className="h-2 w-2 rounded-sm bg-coral" /> Catalog / Inventory
              </p>
              <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Product list</h1>
              <p className="mt-2 text-sm text-ink/60">Review your catalog and keep every listing current.</p>
            </div>
            <Link to="/" className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-lg bg-forest px-4 text-sm font-bold text-leaf shadow-sm transition hover:-translate-y-0.5 hover:bg-ink sm:self-auto">
              Add product <FiArrowUpRight aria-hidden="true" />
            </Link>
          </header>

          <div className="animate-reveal-late overflow-hidden rounded-lg border border-rule bg-white shadow-[0_18px_50px_rgba(23,37,29,0.05)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-leaf/55 text-forest"><FiPackage aria-hidden="true" /></div>
                <div>
                  <h2 className="font-display text-base font-semibold text-ink">All products</h2>
                  <p className="text-xs text-ink/50">{loading ? "Updating catalog" : `${list.length} ${list.length === 1 ? "item" : "items"}`}</p>
                </div>
              </div>
              <button type="button" onClick={fetchList} className="inline-flex h-9 items-center gap-2 rounded-lg border border-rule px-3 text-xs font-semibold text-ink/65 transition hover:border-forest/35 hover:text-forest">
                <FiRefreshCw className={loading ? "animate-spin" : ""} aria-hidden="true" /> Refresh
              </button>
            </div>

            {loading ? (
              <div className="space-y-3 p-5 sm:p-6" aria-label="Loading products">
                {[0, 1, 2].map((item) => <div key={item} className="h-[72px] animate-pulse rounded-lg bg-paper" />)}
              </div>
            ) : error ? (
              <div className="m-5 rounded-lg border border-coral/25 bg-[#fff7f4] p-5 text-sm text-[#a84832] sm:m-6">{error}</div>
            ) : !Array.isArray(list) || list.length === 0 ? (
              <div className="flex flex-col items-center px-5 py-16 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-paper text-forest"><FiPackage size={22} aria-hidden="true" /></div>
                <h2 className="font-display text-lg font-semibold text-ink">Your catalog is empty</h2>
                <p className="mt-1 max-w-sm text-sm leading-6 text-ink/55">Add your first product to start building the store catalog.</p>
                <Link to="/" className="mt-5 rounded-lg bg-forest px-4 py-2.5 text-sm font-bold text-leaf transition hover:bg-ink">Add first product</Link>
              </div>
            ) : (
              <>
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-paper/75 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/50">
                      <tr>
                        <th className="px-6 py-3.5">Product</th>
                        <th className="px-5 py-3.5">Description</th>
                        <th className="px-5 py-3.5">Price</th>
                        <th className="px-5 py-3.5">Category</th>
                        <th className="px-6 py-3.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rule">
                      {list.map((product) => (
                        <tr key={product._id} className="group transition-colors hover:bg-paper/45">
                          <td className="px-6 py-4">
                            <div className="flex min-w-48 items-center gap-3">
                              <img src={product.image} alt={product.name} className="h-12 w-12 rounded-md border border-rule bg-paper object-cover" />
                              <span className="font-semibold text-ink">{product.name}</span>
                            </div>
                          </td>
                          <td className="max-w-xs px-5 py-4 text-ink/55"><p className="line-clamp-2 leading-5">{product.description}</p></td>
                          <td className="whitespace-nowrap px-5 py-4 font-semibold text-ink">₹{product.price}</td>
                          <td className="px-5 py-4"><span className="rounded-md bg-leaf/45 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-forest">{product.category}</span></td>
                          <td className="px-6 py-4 text-right">
                            <button type="button" aria-label={`Delete ${product.name}`} onClick={() => removeList(product._id)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink/40 transition hover:bg-[#fff0eb] hover:text-coral"><FiTrash2 aria-hidden="true" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="divide-y divide-rule md:hidden">
                  {list.map((product) => (
                    <article key={product._id} className="flex gap-3 p-4">
                      <img src={product.image} alt={product.name} className="h-16 w-16 shrink-0 rounded-md border border-rule bg-paper object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="truncate text-sm font-semibold text-ink">{product.name}</h3>
                          <button type="button" aria-label={`Delete ${product.name}`} onClick={() => removeList(product._id)} className="-mr-2 -mt-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink/40 hover:bg-[#fff0eb] hover:text-coral"><FiTrash2 aria-hidden="true" /></button>
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-ink/55">{product.description}</p>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-ink">₹{product.price}</span>
                          <span className="rounded-md bg-leaf/45 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-forest">{product.category}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default List;
