import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const Manage = () => {
  const [students, setStudents] = useState([]);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(true);
  const [id, setId] = useState("");

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

  const toggleEdit = (ids) => {
    setEdit(true);
    setId(ids);
    setView(!view);
  };

  const toggleView = (ids) => {
    setEdit(false);
    setId(ids);
    setView(!view);
  };

  useEffect(() => {
    fetch("https://resoluteserver.vercel.app/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are sure want to delete?")) {
      fetch(`https://resoluteserver.vercel.app/delete/${id}`, {
        method: "DELETE",
      }).then((res) =>
        fetch("https://resoluteserver.vercel.app/students")
          .then((res) => res.json())
          .then((data) => setStudents(data))
      );
    } else {
      console("canceled");
    }
  };

  const handleUpdate = (e) => {
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

    fetch(`https://resoluteserver-hamidthedev.vercel.app/update/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formInfo),
    }).then((res) =>
      fetch("https://resoluteserver-hamidthedev.vercel.app/students")
        .then((res) => res.json())
        .then((data) => setStudents(data))
        .then((res) => toast.success("Information Updated!"))
    );
  };

  return (
    <div className="relative">
      <div className="flex-top-8">
        <span className="font-bold block text-[16px] absolute  -top-10">
          Manage Student
        </span>
        <span className="block absolute -top-10 right-0">{date}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full text-sm">
          <thead>
            <tr className="bg-[#F33823] text-white">
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Class</th>
              <th className="px-6 py-4 text-left">Roll No.</th>
              <th className="px-6 py-4 text-left">View / Edit / Delete</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 font-light relative">
            {students.map((student, i) => {
              return (
                <>
                  <tr
                    key={i}
                    className={
                      i % 2 === 0
                        ? "border-b border-gray-200 hover:bg-gray-100 relative"
                        : "border-b border-gray-200 bg-[#FFF6F5] hover:bg-gray-100 relative"
                    }
                  >
                    <td className="px-6 py-4 text-left font-semibold">
                      {student.firstName +
                        " " +
                        student.middleName +
                        " " +
                        student.lastName}
                    </td>
                    <td className="px-6 py-4 text-left font-semibold">
                      {student.class}
                    </td>
                    <td className="px-6 py-4 text-left font-semibold">
                      {student.roll}
                    </td>
                    <td className="px-6 py-4 text-left font-semibold">
                      <div className="flex item-center">
                        <div className="w-7 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <svg
                            onClick={() => toggleView(student._id)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#F33823"
                            className="h-5 cursor-pointer"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </div>
                        <div className="w-7 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <svg
                            onClick={() => toggleEdit(student._id)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#F33823"
                            className="h-5 cursor-pointer"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </div>
                        <div
                          onClick={() => handleDelete(student._id)}
                          className="w-7 mr-2 transform hover:text-purple-500 hover:scale-110"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#F33823"
                            className="h-5 cursor-pointer"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <td className="">
                    <form
                      onSubmit={handleUpdate}
                      style={
                        view && id === student._id
                          ? { display: "block" }
                          : { display: "none" }
                      }
                      className="grid gap-14 relative left-1 my-1 mb-7"
                    >
                      <div className="grid grid-cols-3 gap-4 ">
                        <input
                          required
                          className="shadow outline-none py-3 px-5 rounded"
                          type="text"
                          placeholder="First Name"
                          name="firstName"
                          defaultValue={student.firstName}
                        />
                        <input
                          required
                          className="shadow outline-none py-3 px-5 rounded"
                          type="text"
                          placeholder="Middle Name"
                          name="middleName"
                          defaultValue={student.middleName}
                        />
                        <input
                          required
                          className="shadow outline-none py-3 px-5 rounded"
                          type="text"
                          placeholder="Last Name"
                          name="lastName"
                          defaultValue={student.lastName}
                        />

                        <select
                          name="class"
                          className="shadow outline-none py-3 px-5 rounded"
                        >
                          <option disabled selected>
                            {student.class}
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
                          <option disabled selected>
                            {student.division}
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
                          defaultValue={student.roll}
                          maxLength={2}
                          placeholder="Enter Roll Number in Digits"
                        />
                      </div>

                      <div className="grid gap-4 mt-4">
                        <div className="flex gap-4">
                          <textarea
                            required
                            className="shadow outline-none pt-3 px-5 rounded"
                            type="text"
                            name="address1"
                            defaultValue={student.address1}
                            placeholder="Address Line 1"
                          />
                          <textarea
                            required
                            className="shadow  outline-none pt-3 px-5 rounded"
                            type="text"
                            name="address2"
                            defaultValue={student.address2}
                            placeholder="Address Line 2"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <input
                            required
                            className="shadow  outline-none py-3 px-5 rounded"
                            type="text"
                            name="landmark"
                            defaultValue={student.landmark}
                            placeholder="Landmark"
                          />
                          <input
                            required
                            className="shadow  outline-none py-3 px-5 rounded"
                            type="text"
                            name="city"
                            defaultValue={student.city}
                            placeholder="City"
                          />
                          <input
                            required
                            className="shadow outline-none py-3 px-5 rounded"
                            type="text"
                            name="pincode"
                            defaultValue={student.pincode}
                            maxLength={6}
                            placeholder="Pincode"
                          />
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <button
                          style={
                            edit ? { display: "block" } : { display: "none" }
                          }
                          className="px-10  py-3 mb-7 mt-2 rounded bg-[#FF2108] text-white font-semibold"
                          type="submit"
                        >
                          Update Student
                        </button>
                      </div>
                    </form>
                  </td>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* delete confirmation modal */}
      <Toaster />
    </div>
  );
};

export default Manage;
