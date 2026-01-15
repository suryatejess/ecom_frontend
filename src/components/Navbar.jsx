import React from 'react'
import Signin from './Signin';
import SignOutButton from './SignOutButton';
import.meta.env.VITE_API_BASE_URL

const Navbar = () => {
    const isLoggedIn =  !!localStorage.getItem("token"); 

    // console.log(import.meta.env.VITE_API_BASE_URL);
    
    return (
        <div className='flex flex-row justify-between border-b-2 mb-2'>
            <a href="/">STORE</a>

            <div>
                <a href="/cart">Cart</a>
                { isLoggedIn ? <SignOutButton /> : <Signin />}
            </div>
        </div>
    )
}

export default Navbar
