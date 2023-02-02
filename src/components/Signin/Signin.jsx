import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { useContext } from 'react';
import { Usercontext } from './../Authprovider/Authprovider';
import { toast, Toaster } from 'react-hot-toast';
import Usetitle from '../Tilehook/Usetitle';

const Signin = () => {
    Usetitle()

    const { google, github, signin } = useContext(Usercontext);

    const navigate = useNavigate()

    const handleGoogle = () => {
        google().then(() => {
                toast.success("Welcome back")
                setTimeout(() => {
                    navigate('/')
                }, 800)
        })
        // navigate(from, { replace: true })

    }


    const handleGithub = () => {
        github();
        // navigate(from, { replace: true })

    }

    const manualSignin = (e) => {
        e.preventDefault();
        console.log(e)
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signin(email, password).then(() => {
            console.log('Logged in Succesfully')
            toast.success("Welcome back")
            setTimeout(() => {
                navigate('/')
            },800)
        }).catch((error) => {
            console.log("not logged in")
            toast.error("Wrong email/pass")
        })

        

        form.reset();



    }










    return (
        <div>

            <div className="flex min-h-full w-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full p-6  bg-white rounded-lg border border-gray-200 shadow-md max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto max-w-[250px]"
                            src={logo}
                            alt="Your Company"
                        />
                        <h2 className="mt-1 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>

                    </div>
                    <form onSubmit={manualSignin} className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#FF4C1E] py-2 px-4 text-sm font-medium text-white hover:bg-[#f13203] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div className="main-hr flex items-center  text-center">
                        <hr className="hr-tag border-gray-300 border-1 w-full rounded-md" />
                        <label className="hr-tag block font-medium text-sm text-gray-600 w-full">
                            Or continue with
                        </label>
                        <hr className="hr-tag border-gray-300 border-1 w-full" />
                    </div>
                    <div className='social flex min-h-fit items-center justify-center py-1'>
                        <div onClick={handleGoogle} className="glass mx-2 lg:w-28 btn btn-outline w-20">
                            <button><FaGoogle /></button>

                        </div>
                        <div className="glass mx-2 btn btn-outline lg:w-28 w-20">
                            <button><FaFacebook /></button>
                        </div>
                        <div onClick={handleGithub} className="btn mx-2 lg:w-28 btn-outline glass w-20">
                            <button><FaGithub /></button>

                        </div>
                    </div>

                    <div className="mt-7">
                        <div className="flex justify-center items-center">
                            <label className="mr-2" >Don't have an account?</label>

                            <Link className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105" to='/signup'>Register</Link>

                        </div>
                    </div>

                </div>
            </div>
            <Toaster></Toaster>
        </div>
    )
};

export default Signin;