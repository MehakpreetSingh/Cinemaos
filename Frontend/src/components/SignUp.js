import React from 'react'
import cinemaos from '../image.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../Firebase/firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup , updateProfile} from "firebase/auth";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Spinner from './Spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Track errors
    const [signupcreds, setSignupCreds] = useState({ name: "", email: "", password: "", cpassword: "" })
    const onChange = (e) => {
        setSignupCreds({ ...signupcreds, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        // e.preventDefault();
        setLoading(true);
        // const response = await fetch(`https://cinemaos-backend.onrender.com/auth/signup`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ name: signupcreds.name, email: signupcreds.email, password: signupcreds.password })
        // })
        // const json = await response.json() ;
        // if(json.success){
        //     navigate("/login");
        //   }
        //   else {
        //     alert("Invalid Credentials")
        //   }
        e.preventDefault();
        setError(null); // Clear previous errors

        try {
            // Firebase sign-up logic
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                signupcreds.email,
                signupcreds.password
            );
            // User created successfully
            const user = userCredential.user;
                   
            await setDoc(doc(db, "users", user.uid), {
                continueWatching: [],
                wishlist: [],
            });
            // (Optional) Send name to your backend for user profile
            // ... your code to interact with your backend API
            setLoading(false);
            navigate("/"); // Redirect after successful sign-up
        } catch (error) {
            // Handle errors (invalid credentials, etc.)
            console.error("Error creating user:", error.message);
            setError(error.message);
            setLoading(false);
            toast("Input a Valid Email and Password", { type: "error"});
        }
    }
    const handleLoginWithGoogle = async () => {
        async function createUserDocument(user) {
            try {
                await setDoc(doc(db, "users", user.uid), {
                    continueWatching: [],
                    wishlist: [],
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
        const provider = new GoogleAuthProvider();
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result?.user;
            setLoading(true);
            const userSnapshot = await getDoc(doc(db, 'users', user.uid));
      
            if (userSnapshot.exists()) {
              sessionStorage.setItem("user", JSON.stringify(user));
            } else {
              await createUserDocument(user);
              sessionStorage.setItem("user", JSON.stringify(user));
            }
            setLoading(false);
            navigate("/home");
          } catch (error) {
            setError(error.message);
          }
    }
    return (
        <div>
            {loading && (
                <div className="absolute mt-[30px] w-full h-full bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <Spinner />
                </div>
            )}
            <ToastContainer />
            {!loading && <div className="absolute mt-[30px] w-full min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto scale-150" src={cinemaos} alt="Workflow" />
                        <h2 className="mt-6 text-center text-3xl text-white font-extrabold ">Create your account</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div>

                        </div>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="my-name" className="sr-only">Name</label>
                                <input id="name" name="name" type="name" autocomplete="name" onChange={(e) => onChange(e)} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name" />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <input id="email-address" name="email" type="email" onChange={(e) => onChange(e)} autocomplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input id="password" name="password" type="password" onChange={(e) => onChange(e)} autocomplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" onClick={handleSubmit} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                                Sign Up
                            </button>


                        </div>
                    </form>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <div className="flex items-center pt-[-10px] justify-center  space-x-1">
                            <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                            <p className="px-3 text-sm dark:text-gray-600">
                                Login with social accounts
                            </p>
                            <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                        </div>
                        <div className="flex z-50 justify-center items-center space-x-4">
                            <button
                                aria-label="Log in with Google"
                                className="px-3 rounded-sm"
                                onClick={handleLoginWithGoogle}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                    className="w-8 h-8 fill-white"
                                >
                                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                                </svg>
                            </button>
                            <button
                                aria-label="Log in with Twitter"
                                className="px-3 rounded-sm"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                    className="w-8 h-8 fill-white"
                                >
                                    <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
                                </svg>
                            </button>
                            <button
                                aria-label="Log in with GitHub"
                                className="px-3 rounded-sm"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                    className="w-8 h-8 fill-white"
                                >
                                    <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className='m-2 text-center '>
                            <Link to="/" className='text-white'>or <span className='text-blue-500 hover:underline hover:text-blue-700'>Sign In</span> </Link>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default SignUp