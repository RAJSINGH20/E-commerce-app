import React from "react";
import { FaTruck, FaUndo, FaShieldAlt, FaHeadset, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const OurrPolicy = () => {
  return (
    <footer className="bg-gray-100 text-gray-800">
      {/* 🔹 OUR POLICY SECTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-b border-gray-300">
        <div className="flex flex-col items-center text-center space-y-3">
          <FaTruck className="text-3xl text-gray-700" />
          <h3 className="text-lg font-semibold">Free Shipping</h3>
          <p className="text-gray-600 text-sm">Enjoy free delivery on all orders above ₹999.</p>
        </div>

        <div className="flex flex-col items-center text-center space-y-3">
          <FaUndo className="text-3xl text-gray-700" />
          <h3 className="text-lg font-semibold">Easy Returns</h3>
          <p className="text-gray-600 text-sm">Return products within 7 days of delivery hassle-free.</p>
        </div>

        <div className="flex flex-col items-center text-center space-y-3">
          <FaShieldAlt className="text-3xl text-gray-700" />
          <h3 className="text-lg font-semibold">Secure Payment</h3>
          <p className="text-gray-600 text-sm">We offer 100% secure payment options for peace of mind.</p>
        </div>

        <div className="flex flex-col items-center text-center space-y-3">
          <FaHeadset className="text-3xl text-gray-700" />
          <h3 className="text-lg font-semibold">24/7 Support</h3>
          <p className="text-gray-600 text-sm">Our support team is available anytime you need help.</p>
        </div>
      </section>

      {/* 🔹 MAIN FOOTER LINKS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">ShopEase</h2>
          <p className="text-gray-600 text-sm mb-4">
            Bringing you the best fashion, quality, and comfort at unbeatable prices.
          </p>
          <div className="flex space-x-4 text-gray-600 text-lg">
            <FaFacebook className="hover:text-blue-600 cursor-pointer" />
            <FaInstagram className="hover:text-pink-600 cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-gray-900 cursor-pointer">Home</li>
            <li className="hover:text-gray-900 cursor-pointer">Collection</li>
            <li className="hover:text-gray-900 cursor-pointer">Bestsellers</li>
            <li className="hover:text-gray-900 cursor-pointer">Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Policies</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-gray-900 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-gray-900 cursor-pointer">Return Policy</li>
            <li className="hover:text-gray-900 cursor-pointer">Shipping Policy</li>
            <li className="hover:text-gray-900 cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-600 text-sm">Email: support@shopease.com</p>
          <p className="text-gray-600 text-sm">Phone: +91 98765 43210</p>
          <p className="text-gray-600 text-sm mt-2">Address: Kolkata, West Bengal, India</p>
        </div>
      </section>

      {/* 🔹 COPYRIGHT BAR */}
      <div className="bg-gray-200 text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} ShopEase — All rights reserved.
      </div>
    </footer>
  );
};

export default OurrPolicy;
