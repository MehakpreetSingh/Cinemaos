import React from 'react'
import cinemaos from '../cinemaos.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import Spinner from './Spinner'

const SignIn = () => {
    const navigate = useNavigate();
    const [logincreds, setLoginCreds] = useState({email: "" , password : ""})
    const [loading , setLoading] = useState(false) ;
    const onChange = (e) => {
        setLoginCreds({...logincreds , [e.target.name]: e.target.value})
    }
    const handleSubmit = async(e) => {
        e.preventDefault() ;
        setLoading(true) ;
        var checkbox = document.getElementById("remember-me") ;
        // FormData.set('email' , logincreds.email) ;
        // FormData.set('password' , logincreds.password) ;
        const response = await fetch(`https://cinemaos-backend.herokuapp.com/auth/login`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json' ,
            },
            body : JSON.stringify({email:logincreds.email , password:logincreds.password})
          });
          const json = await response.json() ;
          
          if(json.success===true) {
            if(checkbox.checked===true) {
                localStorage.setItem('token' , json.authtoken) ;
            }
            else {
                sessionStorage.setItem('token' , json.authtoken) ;
            }
            navigate("/");
            console.log(json) ;
          }
          else {
            alert("Invalid Credentials"); 
          }
          setLoading(false) ;
    }
    return (
        <div>
            {loading && <div className='absolute mt-[30px] w-full min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'><Spinner/></div>}
            {!loading && <div className="absolute mt-[30px] w-full min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto scale-150" src={cinemaos} alt="Workflow" />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <input id="email-address" name="email" type="email" onChange={(e) => onChange(e)} autocomplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input id="password" name="password" type="password" onChange={(e) => onChange(e)} autocomplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900"> Remember me </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
                            </div>
                        </div>

                        <div>
                            <button type="submit" onClick={handleSubmit} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                                Sign In
                            </button>
                            <div className='m-2 text-center '>
                                <Link to="/signup">or <span className='text-blue-500 hover:underline hover:text-blue-700'>Sign Up</span> </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>}
        </div>
    )
}

export default SignIn