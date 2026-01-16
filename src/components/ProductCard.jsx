import React from 'react'

const ProductCard = (props) => {
    
  return (
    <>
        <div className='flex flex-col mx-4'>

            {/* image */}
            <a href={`/product/${props.id}`} className='border-2 p-0 aspect-square relative mb-4 overflow-hidden rounded-lg'>
                <img src={props.image} className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105' alt="" />

                {/* TODO : when button onClick add to cart */}
                {/* button to add to cart */}
                <button className='absolute bottom-3 right-3 rounded-md bg-black text-white flex items-center justify-center transition-opacity px-4 py-3'>+</button>
            </a>

            {/* desc : name, price */}
            <div>
                <h3 className='text-sm font-light'>{props.name}</h3>
                <p className='text-sm font-medium'>{props.price}</p>
            </div>

        </div>
    </>
  )
}

export default ProductCard
