import React from 'react'

const SignOutButton = () => {

    async function handleSubmit(e){
        e.preventDefault(); 

        localStorage.removeItem("token"); 
    }

  return (
    <>
        <button className='bg-blue-200' onClick={handleSubmit}>
            Sign out    
        </button>
    </>
  )
}

export default SignOutButton
