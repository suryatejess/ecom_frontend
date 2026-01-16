import React, { useState } from 'react'
import Signin from './Signin';
import SignOutButton from './SignOutButton';
import.meta.env.VITE_API_BASE_URL

const Navbar = () => {
    const isLoggedIn =  !!localStorage.getItem("token"); 
    const [ totalCartQuantity, setTotalCartQuantity ] = useState(0);     

    // console.log(import.meta.env.VITE_API_BASE_URL);
    
    return (
        <div className='flex flex-row justify-between border-b-2 mb-2 p-2'>
            <a href="/">STORE</a>

            <div className='flex gap-4'>
                <div>
                    <a className='relative' href="/cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag h-5 w-5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    <span className='absolute top-3 right-2 h-4 w-4 text-center rounded-full bg-amber-600 justify-center text-xs font-medium items-center'>
                        {totalCartQuantity}
                    </span>
                    </a>                    
                </div>
                { isLoggedIn ? <SignOutButton /> : <Signin />}
            </div>
        </div>
    )
}
    
export default Navbar
