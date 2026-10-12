import React, {  useContext, useState } from "react";
import vcart_logo from "../assets/vcart_logo.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { AuthDataContext } from "../Context/AuthDataContext.jsx";

const Login = () => {
  // ✅ States
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const serverURL = useContext(AuthDataContext).serverURL;

  // ✅ Admin Login Handler
  const adminlogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(
        `${serverURL}/api/auth/adminlogin`,
        { email, password },
        { withCredentials: true }
      );

      console.log("✅ Login successful:", result.data);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("❌ Login failed:",error.message);
      alert("Login failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-paper lg:grid-cols-[1.02fr_0.98fr]">
      <section className="ops-panel relative flex min-h-[250px] flex-col overflow-hidden bg-forest px-7 py-8 text-white sm:px-12 sm:py-10 lg:min-h-screen lg:px-[8vw] lg:py-14">
        <div className="relative z-10 flex items-center gap-3">
          <img src={vcart_logo} alt="VCart" className="h-11 w-11 rounded-xl object-cover" />
          <div>
            <p className="font-display text-lg font-semibold leading-none">VCart</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.17em] text-leaf">Admin operations</p>
          </div>
        </div>
        <div className="relative z-10 mt-auto max-w-lg pt-10 lg:pb-[7vh]">
          <p className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-leaf">
            <span className="h-px w-7 bg-leaf" /> Store workspace
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-normal sm:text-5xl">Good work starts with a clear view.</h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-white/65">Manage products and keep your catalog moving from one focused workspace.</p>
          <div className="mt-10 flex items-center gap-3 text-xs font-semibold text-white/70">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-leaf">01</span>
            <span>Catalog management</span>
            <span className="h-px w-8 bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-leaf shadow-[0_0_0_5px_rgba(211,243,107,0.12)]" />
          </div>
        </div>
        <p className="relative z-10 mt-8 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40 lg:mt-0">V-CART / COMMERCE OPERATIONS</p>
      </section>

      <section className="flex min-h-[520px] items-center justify-center px-5 py-12 sm:px-10 lg:min-h-screen lg:px-14">
        <div className="animate-reveal w-full max-w-md">
          <div className="mb-9">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-coral">Welcome back</p>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Sign in to your workspace</h2>
            <p className="mt-3 text-sm leading-6 text-ink/55">Use your administrator credentials to continue.</p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={adminlogin}>
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
              Email address
              <input
                type="email"
                placeholder="admin@example.com"
                autoComplete="username"
                className="min-h-12 w-full rounded-lg border border-rule bg-white px-4 text-sm font-normal text-ink placeholder:text-ink/35 transition focus:border-forest focus:ring-4 focus:ring-forest/10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
              Password
              <span className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="min-h-12 w-full rounded-lg border border-rule bg-white px-4 pr-12 text-sm font-normal text-ink placeholder:text-ink/35 transition focus:border-forest focus:ring-4 focus:ring-forest/10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-ink/45 transition hover:text-forest"
                >
                  {showPassword ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
                </button>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-forest px-5 text-sm font-bold text-leaf shadow-[0_10px_22px_rgba(36,73,54,0.15)] transition duration-200 hover:-translate-y-0.5 hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
              {!loading && <span aria-hidden="true">→</span>}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-3 border-t border-rule pt-5">
            <span className="h-2 w-2 rounded-full bg-[#8dbd37]" />
            <p className="text-xs text-ink/50">Private workspace · Authorized administrators only</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
