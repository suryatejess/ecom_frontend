import SignOutButton from "../components/SignOutButton";

function Home(){
    const isLoggedIn = !!localStorage.getItem("token");
    
    return(
        <>
            <h1>hii i am home</h1>

            { isLoggedIn && <SignOutButton /> }
        </>
    )
}

export default Home; 