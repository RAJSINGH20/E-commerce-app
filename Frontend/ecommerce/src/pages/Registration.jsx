import React from "react";
import vcart_logo from "../assets/vcart_logo.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthDataContext } from "../context/AuthDataContext.jsx";
import axios from "axios";
import { userdataContext } from "../context/UserDataContext.jsx";
import GoogleAuthButton from "../Components/GoogleAuthButton.jsx";


const Registration = () => {
    const [showPassword, setShowPassword] = React.useState(false);



    let serverURL = React.useContext(AuthDataContext).serverURL;
    const [name, setname] = React.useState("");
    const [email, setemail] = React.useState("");
    const [password, setpassword] = React.useState("");
    const { getcurrentuser } = React.useContext(userdataContext);

    const handleSignup = async (e) => {
        e.preventDefault();
        try{
            const result = await axios.post(`${serverURL}/api/auth/registration`,{
                name,
                email,
                password
            }, {withCredentials:true});
            console.log("Registration successful:", result.data);
            alert("Registration successful! Please login.");
            // getcurrentUser();
            navigate("/");
        }catch(err){
            console.error("Registration failed:", err.response ? err.response.data : err.message);
            alert(`Registration failed: ${err.response ? err.response.data.message : err.message}`);
        }
    }


    const navigate = useNavigate();

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
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-coral">Join OneCart</p>
                    <h2 className="font-display text-3xl font-semibold text-ink">Create your account</h2>
                    <p className="mb-8 mt-2 text-sm leading-6 text-gray-500">A few details and you’re ready to explore.</p>

                    <form className="flex flex-col gap-4" onSubmit={handleSignup}>
                        <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                            Full name
                            <input type="text" placeholder="Your name" autoComplete="name" className="min-h-12 w-full border border-rule bg-white px-4 text-sm font-normal text-ink placeholder:text-gray-400 outline-none transition focus:border-forest focus:ring-4 focus:ring-forest/10" onChange={(e) => setname(e.target.value)} value={name} required />
                        </label>

                        <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                            Email address
                            <input type="email" placeholder="you@example.com" autoComplete="email" className="min-h-12 w-full border border-rule bg-white px-4 text-sm font-normal text-ink placeholder:text-gray-400 outline-none transition focus:border-forest focus:ring-4 focus:ring-forest/10" onChange={(e) => setemail(e.target.value)} value={email} required />
                        </label>

                        <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                            Password
                            <span className="relative">
                                <input type={showPassword ? "text" : "password"} placeholder="Create a password" autoComplete="new-password" className="min-h-12 w-full border border-rule bg-white px-4 pr-12 text-sm font-normal text-ink placeholder:text-gray-400 outline-none transition focus:border-forest focus:ring-4 focus:ring-forest/10" onChange={(e) => setpassword(e.target.value)} value={password} required />
                                <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-500 transition hover:text-forest">
                                    {showPassword ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
                                </button>
                            </span>
                        </label>

                        <button type="submit" className="mt-2 min-h-12 bg-forest px-5 text-xs font-bold uppercase tracking-[0.1em] text-leaf transition hover:bg-ink">Create account</button>
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
                        Already have an account?{" "}
                        <button type="button" onClick={() => navigate("/login")} className="font-bold text-forest underline decoration-coral underline-offset-4">Sign in</button>
                    </p>
                </div>
            </section>
        </main>
    );
};

export default Registration;
