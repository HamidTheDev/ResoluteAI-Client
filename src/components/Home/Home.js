import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const Home = () => {
  const [active, setActive] = useState("add");
  return (
    <section className="flex px-5 gap-6">
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
        <button className="text-4 text-[rgba(0,0,0,0.7)] py-3 text-left font-bold pr-20 rounded-sm">
          <i class="fa-solid fa-arrow-right-from-bracket text-xl pl-16 pr-2"></i>
          Logout
        </button>
      </section>
      <section className="w-9/12">

        {/* Outlet will be displayed on this section */}
        <Outlet></Outlet>
      </section>
    </section>
  );
};

export default Home;
