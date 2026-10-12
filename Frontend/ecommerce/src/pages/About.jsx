import React from 'react'
import image from '../assets/phto shopping.jpeg'
import Title from '../Components/Tittle'
import { FaHeadset, FaStar, FaTruck } from 'react-icons/fa'

const About = () => {
  return (
    <main className="min-h-screen bg-paper px-4 py-10 sm:px-7 sm:py-14 lg:px-10">
      <div className="animate-enter mx-auto max-w-[1200px]">
        <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-coral">OneCart / Our story</p>
        <Title text1="ABOUT" text2="US" />
      </div>

      <div className="mx-auto grid max-w-[1200px] items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="animate-enter overflow-hidden">
          <img
            src={image}
            alt="OneCart team curating clothing and accessories"
            className="aspect-[5/4] w-full object-cover"
          />
        </div>

        <div className="animate-enter-late py-4 lg:py-8">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-forest">Thoughtfully chosen</p>
          <h2 className="font-display mb-5 text-3xl font-semibold text-ink sm:text-4xl">Good design belongs in the everyday.</h2>
          <p className="mb-4 text-sm leading-7 text-gray-700">
            We are an e-commerce team dedicated to delivering high quality products with an emphasis
            on customer satisfaction. Our catalog is curated to provide great value and reliable
            service. We combine modern design, careful selection, and fast delivery to give you a
            seamless shopping experience.
          </p>
          <p className="text-sm leading-7 text-gray-700">
            Our mission is to make shopping simple and trustworthy. From sourcing to shipping, we
            prioritize transparency and support so you can shop with confidence.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1200px] grid-cols-1 border-y border-rule sm:grid-cols-3">
        <div className="border-b border-rule py-6 sm:border-b-0 sm:border-r sm:pr-6">
          <FaTruck className="mb-4 text-xl text-forest" aria-hidden="true" />
          <h3 className="mb-2 font-display font-semibold text-ink">Fast delivery</h3>
          <p className="text-sm leading-6 text-gray-600">
            Reliable and quick shipping so your orders arrive on time.
          </p>
        </div>

        <div className="border-b border-rule py-6 sm:border-b-0 sm:px-6 sm:first:border-0">
          <FaStar className="mb-4 text-xl text-coral" aria-hidden="true" />
          <h3 className="mb-2 font-display font-semibold text-ink">Quality pieces</h3>
          <p className="text-sm leading-6 text-gray-600">
            We handpick products to ensure excellent quality and long-lasting value.
          </p>
        </div>

        <div className="py-6 sm:border-l sm:border-rule sm:pl-6">
          <FaHeadset className="mb-4 text-xl text-forest" aria-hidden="true" />
          <h3 className="mb-2 font-display font-semibold text-ink">Here to help</h3>
          <p className="text-sm leading-6 text-gray-600">
            Friendly customer support available around the clock to help with any issue.
          </p>
        </div>
      </div>
    </main>
  )
}

export default About