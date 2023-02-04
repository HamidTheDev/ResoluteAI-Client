import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { Usercontext } from "../Authprovider/Authprovider";



const Signup = () => {


  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log(location);

  const navigate = useNavigate();

  const { auth } = useContext(Usercontext);

  const { manual } = useContext(Usercontext);

  // const handleGoogle = () => {
  //   google()
  //     .then((result) => {
  //       console.log(result.user);

  //       //info for sendit to db
  //       const userInfo = {
  //         name: result.user.displayName,
  //         email: result.user.email,
  //         role: "buyer",
  //         photoURL: result.user.photoURL,
  //       };

  //       //saving accounts to mongodb
  //       fetch("https://mpc-server-hamidthedev.vercel.app/users", {
  //         method: "POST",
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //         body: JSON.stringify(userInfo),
  //       });

  //       toast.success("Registration Successful");
  //       setTimeout(() => {
  //         navigate(from, { replace: true });
  //       }, 800);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const handlegithub = () => {
  //   github()
  //     .then((result) => {
  //       console.log(result.user.displayName);

  //       navigate(from, { replace: true });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const register = (event) => {
    event.preventDefault();
    const e = document.getElementById("dropdown");

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;


    //info for sendit to db
    const userInfo = {
      name,
      email,
    };

    manual(email, password)
      .then((result) => {
        console.log(result);

        updateProfile(auth.currentUser, {
          displayName: name,
        })
        setTimeout(() => {
          navigate("/");
        }, 800);
      })
      .catch((error) => {
        toast.error(error.toString());
        console.log(error);
      });

    form.reset();
  };

  return (
    <div>
      <div className="flex min-h-full w-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full p-6  bg-white rounded-lg border border-gray-200 shadow-md max-w-md space-y-8">
          <div className="flex justify-center flex-col">
            <span className="text-[30px] pl-40 font-extrabold text-[rgba(88,74,74,0.73)]">
              LOGO
            </span>
            <h2 className="mt-1 text-center text-xl font-bold  text-gray-500">
              Sign in to your account
            </h2>
          </div>
          <form
            onSubmit={register}
            className="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label className="sr-only">Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
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
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#FF4C1E] py-2 px-4 text-sm font-medium text-white hover:bg-[#f53504] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="mt-7">
            <div className="flex justify-center items-center">
              <label className="mr-2">Already have an account?</label>

              <Link
                className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                to="/signin"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default Signup;
