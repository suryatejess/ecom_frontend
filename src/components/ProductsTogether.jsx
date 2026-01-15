import React from 'react'
import ProductCard from './ProductCard';

const ProductsTogether = () => {

    const image_ = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80"; 
    const name_ = "Minimal ceramic vase"; 
    const price_ = 89; 
    
    
  return (
    <>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-8'>
            <ProductCard image={image_} name={name_} price={price_} />
            <ProductCard image={image_} name={name_} price={price_} />
            <ProductCard image={image_} name={name_} price={price_} />
            <ProductCard image={image_} name={name_} price={price_} />
            <ProductCard image={image_} name={name_} price={price_} />
            <ProductCard image={image_} name={name_} price={price_} />
            
        </div>
    </>
  )
}

export default ProductsTogether
