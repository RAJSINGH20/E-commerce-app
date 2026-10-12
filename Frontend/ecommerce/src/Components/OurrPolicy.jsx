import React from "react";
import { FaTruck, FaUndo, FaShieldAlt, FaHeadset, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import { Link } from "react-router-dom";
const OurrPolicy = () => {
  return (
    <footer className="bg-forest text-white">
      {/* 🔹 OUR POLICY SECTION */}
      <section className="mx-auto grid max-w-[1360px] grid-cols-2 gap-6 border-b border-white/15 px-4 py-10 sm:px-8 lg:grid-cols-4 lg:px-12">
        <div className="flex flex-col items-center text-center space-y-3">
          <FaTruck className="text-2xl text-leaf" aria-hidden="true" />
          <h3 className="font-display text-sm font-semibold">Free Shipping</h3>
          <p className="text-xs leading-5 text-white/60">Enjoy free delivery on all orders above ₹999.</p>
        </div>

        <div className="flex flex-col items-center text-center space-y-3">
          <FaUndo className="text-2xl text-leaf" aria-hidden="true" />
          <h3 className="font-display text-sm font-semibold">Easy Returns</h3>
          <p className="text-xs leading-5 text-white/60">Return products within 7 days of delivery hassle-free.</p>
        </div>

        <div className="flex flex-col items-center text-center space-y-3">
          <FaShieldAlt className="text-2xl text-leaf" aria-hidden="true" />
          <h3 className="font-display text-sm font-semibold">Secure Payment</h3>
          <p className="text-xs leading-5 text-white/60">We offer 100% secure payment options for peace of mind.</p>
        </div>

        <div className="flex flex-col items-center text-center space-y-3">
          <FaHeadset className="text-2xl text-leaf" aria-hidden="true" />
          <h3 className="font-display text-sm font-semibold">24/7 Support</h3>
          <p className="text-xs leading-5 text-white/60">Our support team is available anytime you need help.</p>
        </div>
      </section>

      {/* 🔹 MAIN FOOTER LINKS */}
      <section className="mx-auto grid max-w-[1360px] grid-cols-2 gap-x-6 gap-y-10 px-4 py-12 sm:px-8 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-12 lg:py-16">
        <div>
          <h2 className="font-display text-xl font-semibold">OneCart<span className="text-leaf">.</span></h2>
          <p className="mb-4 mt-3 max-w-xs text-sm leading-6 text-white/60">
            Thoughtful everyday pieces, chosen to make getting dressed feel easy.
          </p>
          <div className="flex gap-4 text-white/60">
            <FaFacebook className="hover:text-blue-600 cursor-pointer" />
            <FaInstagram className="hover:text-pink-600 cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer" />
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-leaf">Explore</h3>
          <ul className="space-y-3 text-sm text-white/65">
            <li><Link className="transition hover:text-white" to="/">Home</Link></li>
            <li><Link className="transition hover:text-white" to="/COLLECTIONS">Collection</Link></li>
            <li><Link className="transition hover:text-white" to="/About">About us</Link></li>
            <li><Link className="transition hover:text-white" to="/Contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-leaf">Customer care</h3>
          <ul className="space-y-3 text-sm text-white/65">
            <li>Shipping information</li>
            <li>Returns & exchanges</li>
            <li>Payment options</li>
            <li>Privacy & terms</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-leaf">Get in touch</h3>
          <p className="text-sm text-white/65">support@onecart.com</p>
          <p className="mt-2 text-sm text-white/65">+91 98765 43210</p>
          <p className="mt-2 text-sm leading-5 text-white/45">Kolkata, West Bengal, India</p>
        </div>
      </section>

      {/* 🔹 COPYRIGHT BAR */}
      <div className="border-t border-white/15 px-4 py-4 text-center text-[10px] font-medium tracking-[0.08em] text-white/45 sm:px-8">
        © {new Date().getFullYear()} OneCart. All rights reserved.
      </div>
    </footer>
  );
};

export default OurrPolicy;
