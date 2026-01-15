import React from 'react'
import Signin from './Signin';
import SignOutButton from './SignOutButton';
import.meta.env.VITE_API_BASE_URL

const Navbar = ( {token, setToken} ) => {
    const isLoggedIn =  !!token;
    
    console.log(import.meta.env.VITE_API_BASE_URL);

    // const navigate = useNavigate();
    
    return (
        <div className='flex flex-row justify-between'>
            <a href="/">HOME</a>

            <div>
                <a href="/cart">Cart</a>
                { isLoggedIn ? <SignOutButton setToken={setToken} /> : <Signin />}
            </div>
        </div>
    )
}

export default Navbar
