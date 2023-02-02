import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import { Usercontext } from "./../Authprovider/Authprovider";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import Usetitle from "../Tilehook/Usetitle";

const Signup = () => {
  Usetitle();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log(location);

  const navigate = useNavigate();

  const { auth } = useContext(Usercontext);

  const { google, github, manual } = useContext(Usercontext);

  const handleGoogle = () => {
    google()
      .then((result) => {
        console.log(result.user);

        //info for sendit to db
        const userInfo = {
          name: result.user.displayName,
          email: result.user.email,
          role: "buyer",
          photoURL: result.user.photoURL,
        };

        //saving accounts to mongodb
        fetch("https://mpc-server-hamidthedev.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userInfo),
        });

        toast.success("Registration Successful");
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 800);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlegithub = () => {
    github()
      .then((result) => {
        console.log(result.user.displayName);

        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const register = (event) => {
    event.preventDefault();
    const e = document.getElementById("dropdown");

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photoUrl.value;
    const role = e.value;

    //info for sendit to db
    const userInfo = {
      name,
      email,
      role,
      photoURL: photo,
    };

    manual(email, password)
      .then((result) => {
        console.log(result);

        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            //saving accounts to mongodb
            fetch("https://mpc-server-hamidthedev.vercel.app/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(userInfo),
            });

            toast.success("Registration Successful");
            setTimeout(() => {
              navigate(from, { replace: true });
            }, 800);
          })
          .catch(() => {
            console.log("Update hoini");
          });
      })
      .catch((error) => {
        toast.error(error.toString());
        console.log(error);
      });

    form.reset();
  };

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
              <div>
                <input
                  type="text"
                  name="photoUrl"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Photo Url"
                />
              </div>
              <select
                id="dropdown"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected value="buyer">
                  Buyer
                </option>
                <option value="seller">Seller</option>
              </select>
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
          <div className="main-hr flex items-center  text-center">
            <hr className="hr-tag border-gray-300 border-1 w-full rounded-md" />
            <label className="hr-tag block font-medium text-sm text-gray-600 w-full">
              Or continue with
            </label>
            <hr className="hr-tag border-gray-300 border-1 w-full" />
          </div>
          <div className="social flex min-h-fit items-center justify-center py-1">
            <div
              onClick={handleGoogle}
              className="glass mx-2 btn btn-outline w-20 lg:w-28"
            >
              <button>
                <FaGoogle />
              </button>
            </div>
            <div className="glass mx-2 btn btn-outline w-20 lg:w-28">
              <button>
                <FaFacebook />
              </button>
            </div>
            <div
              onClick={handlegithub}
              className="btn mx-2 btn-outline glass w-20 lg:w-28"
            >
              <button>
                <FaGithub />
              </button>
            </div>
          </div>

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
