import React from "react";
import toast, { Toaster } from "react-hot-toast";

const Add = () => {
  var today = new Date();
  var date =
    today.getDate() +
    " " +
    today.toLocaleString("default", { month: "long" }) +
    " " +
    today.getFullYear() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes();

  console.log(date);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value;
    const middleName = form.middleName.value;
    const lastName = form.lastName.value;
    const classs = form.class.value;
    const division = form.division.value;
    const roll = form.roll.value;
    const address1 = form.address1.value;
    const address2 = form.address2.value;
    const landmark = form.landmark.value;
    const city = form.city.value;
    const pincode = form.pincode.value;

    const formInfo = {
      firstName,
      middleName,
      lastName,
      class: classs,
      division,
      roll,
      address1,
      address2,
      landmark,
      city,
      pincode,
    };

    fetch("https://resoluteserver.vercel.app/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formInfo),
    })
      .then((res) => res.json())
      .then((data) => toast.success("Student Added!"));

    form.reset();
  };

  return (
    <section className="relative">
      <div className="flex-top-8">
        <span className="font-bold block text-[16px] absolute  -top-10">
          Add Student
        </span>
        <span className="block absolute -top-10 right-0">{date}</span>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-14">
        <div className="grid grid-cols-3 gap-4">
          <input
            required
            className="shadow outline-none py-3 px-5 rounded"
            type="text"
            placeholder="First Name"
            name="firstName"
          />
          <input
            required
            className="shadow outline-none py-3 px-5 rounded"
            type="text"
            placeholder="Middle Name"
            name="middleName"
          />
          <input
            required
            className="shadow outline-none py-3 px-5 rounded"
            type="text"
            placeholder="Last Name"
            name="lastName"
          />
          {/* <input required
            className="shadow outline-none py-3 px-5 rounded"
            type="select"
            placeholder="Select Class"
          /> */}
          <select
            name="class"
            className="shadow outline-none py-3 px-5 rounded"
          >
            <option value="" disabled selected>
              Select Class
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <select
            name="division"
            className="shadow outline-none py-3 px-5 rounded"
          >
            <option value="" disabled selected>
              Select Division
            </option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
          <input
            required
            className="shadow outline-none py-3 px-5 rounded"
            type="number"
            name="roll"
            maxLength={2}
            placeholder="Enter Roll Number in Digits"
          />
        </div>

        <div className="grid gap-4">
          <div className="flex gap-4 w-full">
            <textarea
              required
              className="shadow w-full outline-none pt-3 px-5 rounded"
              type="text"
              name="address1"
              placeholder="Address Line 1"
            />
            <textarea
              required
              className="shadow w-full  outline-none pt-3 px-5 rounded"
              type="text"
              name="address2"
              placeholder="Address Line 2"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <input
              required
              className="shadow w-full  outline-none py-3 px-5 rounded"
              type="text"
              name="landmark"
              placeholder="Landmark"
            />
            <input
              required
              className="shadow w-full  outline-none py-3 px-5 rounded"
              type="text"
              name="city"
              placeholder="City"
            />
            <input
              required
              className="shadow w-full outline-none py-3 px-5 rounded"
              type="text"
              name="pincode"
              maxLength={6}
              placeholder="Pincode"
            />
            <button
              className="px-20 py-3 my-6 rounded bg-[#FF2108] text-white font-semibold"
              type="submit"
            >
              Add Student
            </button>
          </div>
        </div>
      </form>
      <Toaster />
    </section>
  );
};

export default Add;
