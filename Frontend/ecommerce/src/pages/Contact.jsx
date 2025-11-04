import React from "react";
import Title from "../Components/Tittle";
import contactImg from "../assets/contact.webp"; // 🖼️ use your own image (replace if needed)
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-50 py-16 px-5 sm:px-10 lg:px-20">
      {/* 🏷️ Title */}
      <div className="text-center mb-10">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* 🧭 Top Section: Image + Info */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8">
        {/* Left: Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={contactImg}
            alt="Contact us"
            className="w-full h-80 sm:h-96 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Right: Info Text */}
        <div className="w-full lg:w-1/2 text-gray-700">
          <h3 className="text-2xl font-semibold mb-4">Get In Touch</h3>
          <p className="leading-relaxed mb-4">
            Have a question, feedback, or need help with your order? We re here to assist you.
            Reach out to our support team anytime, and we ll get back to you as soon as possible.
          </p>

          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-blue-600" /> 
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-blue-600" /> 
              <span>support@yourshop.com</span>
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-600" /> 
              <span>123, Market Street, Kolkata, India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 📬 Contact Form Section */}
      <div className="max-w-3xl mx-auto mt-16 bg-white rounded-xl shadow-md p-8 border">
        <h3 className="text-2xl font-semibold text-center mb-6">Send Us a Message</h3>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Subject"
            className="border rounded-lg p-3 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="border rounded-lg p-3 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <button
            type="submit"
            className="sm:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* 🌟 Bottom Info Cards */}
      <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
          <div className="text-3xl mb-3">📞</div>
          <h4 className="font-semibold mb-2">Customer Support</h4>
          <p className="text-gray-600 text-sm">
            Our support team is available 24/7 to help you with queries.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
          <div className="text-3xl mb-3">🕒</div>
          <h4 className="font-semibold mb-2">Working Hours</h4>
          <p className="text-gray-600 text-sm">
            Monday to Saturday — 9:00 AM to 8:00 PM
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
          <div className="text-3xl mb-3">📍</div>
          <h4 className="font-semibold mb-2">Our Office</h4>
          <p className="text-gray-600 text-sm">
            Visit us anytime at our main branch in Kolkata.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
