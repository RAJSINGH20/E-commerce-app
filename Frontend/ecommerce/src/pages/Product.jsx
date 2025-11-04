import React from 'react'
import LatestCollection from '../Components/LatestCollextion'
import BestSeller from '../Components/BestSeller'

const Product = () => {
  return (
    <div className="mt-0 bg-gray-50">
      {/* Latest Collection Section */}
      <LatestCollection />

      {/* Bestseller Section */}
      <BestSeller />
    </div>
  )
}

export default Product
