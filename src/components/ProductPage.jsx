import React, { useState } from 'react'

const ProductPage = (props) => {
  const [ quantity, setQuantity ] = useState(0); 
  const [ validDecrementButton, setValidDecrementButton ] = useState(false); 
  const [ validIncrementButton, setValidIncrementButton ] = useState(true); 

  const decrementQuantity = () => {
      setQuantity(prev => Math.min(prev - 1, 0)); 
  }

  const incrementQuantity = (presentQuantity) => {
      setQuantity(prev => Math.min(prev + 1, props.availableQuantity)); 
  }
  
  return (
    <>
      <div className='flex flex-col'>

          <div className='flex flex-col'>

            {/* <- back to products */}
            <a href="/" className='inline-flex items-center text-sm'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeinejoin="round" strokeLinejoin="round" className="lucide lucide-arrow-left h-4 w-4"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
            Back to products
            </a>

            {/* down */}
            <div className='grid grid-cols-2 mt-4'>

                {/* image  */}
                <img src={props.image} alt="here the image of the product is supposed to be there" />

                {/* right */}
                <div>
                  <div className='flex flex-col'>
                      <h1>{props.name}</h1>
                      <h3>{props.price}</h3>
                      <p>{props.longDesc}</p>

                      {/* quantity */}
                      <div>
                        <p>Quantity</p>
 
                        <button className='text-white bg-black px-2 m-1' onClick={decrementQuantity}>-</button>                       
                        <span>{quantity}</span>
                        <button className='text-white px-2 m-1 bg-black' onClick={incrementQuantity}>+</button>
                      </div>

                      {/* TODO : I have to add the functionality of adding into a cart later i.e. add to cart */}
                      <button className='inline-block'>
                        Add to Cart
                      </button>
                      
                      <div className='border-t-2 pt-6 mt-6'>
                      <p className='text-green-600 text-sm'>{props.availableQuantity} in stock</p>
                      </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default ProductPage
