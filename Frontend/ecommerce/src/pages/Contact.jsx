import React from "react";
import Title from "../Components/Tittle";
import contactImg from "../assets/contact.webp"; // 🖼️ use your own image (replace if needed)
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <main className="min-h-screen bg-paper px-4 py-10 sm:px-7 sm:py-14 lg:px-10">
      <header className="animate-enter mx-auto mb-9 max-w-[1200px] text-center">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-coral">OneCart / Support</p>
        <Title text1="CONTACT" text2="US" />
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-600">Questions about a product or your order? We’re ready to help.</p>
      </header>

      <div className="mx-auto grid max-w-[1200px] items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="animate-enter overflow-hidden">
          <img
            src={contactImg}
            alt="Contact us"
            className="aspect-[5/4] w-full object-cover"
          />
        </div>

        <div className="animate-enter-late text-gray-700">
          <h2 className="mb-4 font-display text-2xl font-semibold text-ink">Get in touch</h2>
          <p className="mb-6 text-sm leading-7">
            Have a question, feedback, or need help with your order? We re here to assist you.
            Reach out to our support team anytime, and we ll get back to you as soon as possible.
          </p>

          <ul className="divide-y divide-rule border-y border-rule">
            <li className="flex items-center gap-3 py-4 text-sm">
              <FaPhoneAlt className="text-forest" aria-hidden="true" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3 py-4 text-sm">
              <FaEnvelope className="text-forest" aria-hidden="true" />
              <span>support@yourshop.com</span>
            </li>
            <li className="flex items-center gap-3 py-4 text-sm">
              <FaMapMarkerAlt className="text-forest" aria-hidden="true" />
              <span>123, Market Street, Kolkata, India</span>
            </li>
          </ul>
        </div>
      </div>

      <section className="animate-enter mx-auto mt-16 max-w-3xl border-y border-rule bg-white px-5 py-8 sm:px-8">
        <h2 className="font-display mb-6 text-center text-2xl font-semibold text-ink">Send a message</h2>

        <form className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <input
            type="text"
            placeholder="Your Name"
            className="min-h-12 border border-rule bg-paper px-4 text-sm outline-none transition focus:border-forest focus:ring-4 focus:ring-forest/10"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="min-h-12 border border-rule bg-paper px-4 text-sm outline-none transition focus:border-forest focus:ring-4 focus:ring-forest/10"
          />
          <input
            type="text"
            placeholder="Subject"
            className="min-h-12 border border-rule bg-paper px-4 text-sm outline-none transition focus:border-forest focus:ring-4 focus:ring-forest/10 sm:col-span-2"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="min-h-32 border border-rule bg-paper px-4 py-3 text-sm outline-none transition focus:border-forest focus:ring-4 focus:ring-forest/10 sm:col-span-2"
          ></textarea>

          <button
            type="submit"
            className="min-h-12 bg-forest px-5 text-xs font-bold uppercase tracking-[0.1em] text-leaf transition hover:bg-ink sm:col-span-2"
          >
            Send Message
          </button>
        </form>
      </section>

      <div className="mx-auto mt-14 grid max-w-[1200px] grid-cols-1 border-y border-rule sm:grid-cols-3">
        <div className="border-b border-rule py-6 sm:border-b-0 sm:border-r sm:pr-6">
          <h3 className="font-display mb-2 font-semibold text-ink">Customer support</h3>
          <p className="text-sm leading-6 text-gray-600">
            Our support team is available 24/7 to help you with queries.
          </p>
        </div>

        <div className="border-b border-rule py-6 sm:border-b-0 sm:px-6">
          <h3 className="font-display mb-2 font-semibold text-ink">Working hours</h3>
          <p className="text-sm leading-6 text-gray-600">
            Monday to Saturday — 9:00 AM to 8:00 PM
          </p>
        </div>

        <div className="py-6 sm:border-l sm:border-rule sm:pl-6">
          <h3 className="font-display mb-2 font-semibold text-ink">Our office</h3>
          <p className="text-sm leading-6 text-gray-600">
            Visit us anytime at our main branch in Kolkata.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Contact;
