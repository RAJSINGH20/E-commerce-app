import React, { useContext } from "react";
import vcart_logo from "../assets/vcart_logo.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { AuthDataContext } from "../context/AuthDataContext.jsx";
import { userdataContext } from "../context/UserDataContext.jsx";
import GoogleAuthButton from "../Components/GoogleAuthButton.jsx";

const Login = () => {
  // States
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  // Contexts
  const { serverURL } = useContext(AuthDataContext)
  const { getcurrentuser } = useContext(userdataContext);
  // const { getcurrentUser } = React.useContext(userdataContext);

  // ✅ Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(`${serverURL}/api/auth/login`, {
        email,
        password
      }, {
        withCredentials: true // ✅ allow cookie-based auth
      });

      console.log("✅ Login successful:", result.data);
      alert("Login successful!");

      // ✅ Update user data
      setTimeout(() => {
        getcurrentuser();
      }, 500);


      // ✅ Redirect to home
      navigate("/");
    } catch (err) {
      console.error("❌ Login failed:", err.response?.data || err.message);
      alert("Login failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-paper lg:grid-cols-[0.9fr_1.1fr]">
      <section className="relative flex min-h-[220px] flex-col justify-between overflow-hidden bg-forest px-6 py-6 text-white sm:px-10 sm:py-8 lg:min-h-screen lg:px-[7vw] lg:py-12">
        <div className="absolute inset-x-[-10%] bottom-[10%] h-36 rotate-[-10deg] border-y border-leaf/20 bg-[repeating-linear-gradient(135deg,rgba(211,243,107,0.12)_0_1px,transparent_1px_18px)]" aria-hidden="true" />
        <button type="button" onClick={() => navigate("/")} className="relative z-10 flex w-fit items-center gap-3 text-left">
          <img src={vcart_logo} alt="" className="h-11 w-11 rounded-xl object-cover" />
          <span className="font-display text-lg font-semibold">OneCart<span className="text-leaf">.</span></span>
        </button>
        <div className="relative z-10 mt-8 max-w-md lg:mb-14">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-leaf">Your everyday edit</p>
          <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">Find the pieces that feel like you.</h1>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">A considered collection for getting dressed, gifting, and everything in between.</p>
        </div>
        <p className="relative z-10 mt-8 text-[9px] font-bold uppercase tracking-[0.16em] text-white/40">ONECART / SINCE 2024</p>
      </section>

      <section className="flex items-center justify-center px-5 py-12 sm:px-10 lg:px-16">
        <div className="animate-enter w-full max-w-md">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-coral">Welcome back</p>
          <h2 className="font-display text-3xl font-semibold text-ink">Sign in</h2>
          <p className="mb-8 mt-2 text-sm leading-6 text-gray-500">Pick up where you left off.</p>

          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
              Email address
              <input type="email" placeholder="you@example.com" autoComplete="username" className="min-h-12 w-full border border-rule bg-white px-4 text-sm font-normal text-ink placeholder:text-gray-400 outline-none transition focus:border-forest focus:ring-4 focus:ring-forest/10" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
              Password
              <span className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Enter your password" autoComplete="current-password" className="min-h-12 w-full border border-rule bg-white px-4 pr-12 text-sm font-normal text-ink placeholder:text-gray-400 outline-none transition focus:border-forest focus:ring-4 focus:ring-forest/10" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-500 transition hover:text-forest">
                  {showPassword ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
                </button>
              </span>
            </label>

            <button type="submit" disabled={loading} className="mt-1 min-h-12 bg-forest px-5 text-xs font-bold uppercase tracking-[0.1em] text-leaf transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-rule" />
            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-gray-500">or continue with</span>
            <span className="h-px flex-1 bg-rule" />
          </div>

          <GoogleAuthButton onAuthenticated={async () => {
            await getcurrentuser();
            navigate("/");
          }} />

          <p className="mt-7 text-center text-sm text-gray-600">
            New to OneCart?{" "}
            <button type="button" onClick={() => navigate("/Registration")} className="font-bold text-forest underline decoration-coral underline-offset-4">Create an account</button>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
