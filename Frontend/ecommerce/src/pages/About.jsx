import React from 'react'
import image from '../assets/phto shopping.jpeg'
import Title from '../Components/Tittle'

const About = () => {
  return (
    <div className="bg-gray-50 py-16 px-5 sm:px-10 lg:px-20">
      {/* Title */}
      <div className="text-center mb-10">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* Main content: left image, right paragraph */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8">
        {/* Left: image */}
        <div className="w-full lg:w-1/2">
          <img
            src={image}
            alt="About us"
            className="w-full h-80 sm:h-96 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Right: about text */}
        <div className="w-full lg:w-1/2">
          <h3 className="text-2xl font-semibold mb-4">Who We Are</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We are an e-commerce team dedicated to delivering high quality products with an emphasis
            on customer satisfaction. Our catalog is curated to provide great value and reliable
            service. We combine modern design, careful selection, and fast delivery to give you a
            seamless shopping experience.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to make shopping simple and trustworthy. From sourcing to shipping, we
            prioritize transparency and support so you can shop with confidence.
          </p>
        </div>
      </div>

      {/* Bottom: Why choose us boxes */}
      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="text-3xl mb-3">🚚</div>
          <h4 className="font-semibold mb-2">Fast Delivery</h4>
          <p className="text-gray-600 text-sm">
            Reliable and quick shipping so your orders arrive on time.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="text-3xl mb-3">⭐</div>
          <h4 className="font-semibold mb-2">Quality Products</h4>
          <p className="text-gray-600 text-sm">
            We handpick products to ensure excellent quality and long-lasting value.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="text-3xl mb-3">💬</div>
          <h4 className="font-semibold mb-2">24/7 Support</h4>
          <p className="text-gray-600 text-sm">
            Friendly customer support available around the clock to help with any issue.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About