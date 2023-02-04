import { signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Usercontext } from "../Authprovider/Authprovider";


const Home = () => {
  const [active, setActive] = useState("add");
    const location = useLocation();
  let title = location.pathname;
  const navigate = useNavigate();
  const {loader, user, auth} = useContext(Usercontext);


  useEffect(() => {
    if (title === "/manage") {
      setActive("manage");
    }
  }, [title])

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        console.log("user Signout");
        navigate("/signin");
      })
      .catch(() => {
        console.log("user doke bose ache");
      });
  };

  return (
    <section className="flex px-5 gap-6">
      {user?.email?
        <section className="w-3/12 flex  flex-col ">
        <Link
          onClick={() => setActive("add")}
          to="/"
          className={
            active === "add"
              ? "text-4 text-left py-3 font-bold  rounded-sm text-white bg-[#F33823]"
              : "text-4 text-[rgba(0,0,0,0.7)] text-left py-3 font-bold rounded-sm"
          }
        >
          <button>
            <i class="fa-regular fa-user  text-xl pl-16 pr-2"></i> Add Student
          </button>
        </Link>
        <Link
          onClick={() => setActive("manage")}
          to="manage"
          className={
            active === "manage"
              ? "text-4 text-left py-3 font-bold rounded-sm text-white bg-[#F33823]"
              : "text-4 text-[rgba(0,0,0,0.7)] text-left py-3 font-bold  rounded-sm"
          }
        >
          <button>
            <i class="fa-solid fa-bars-progress text-xl pl-16 pr-2"></i> Manage
            Students
          </button>
        </Link>
        <button
          onClick={handleSignout}
          className="text-4 text-[rgba(0,0,0,0.7)] py-3 text-left font-bold pr-20 rounded-sm"
        >
          <i class="fa-solid fa-arrow-right-from-bracket text-xl pl-16 pr-2"></i>
          Logout
        </button>
        </section>
        :
      <div className="w-1/12"></div>}
      <section className="w-9/12">
        {/* Outlet will be displayed on this section */}
        <Outlet></Outlet>
      </section>
    </section>
  );
};

export default Home;
