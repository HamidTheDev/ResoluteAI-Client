import React, { useEffect, useState } from "react";

const Manage = () => {
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

  const [students, setStudents] = useState([]);
  const [id, setId] = useState("");
  console.log(id);
  useEffect(() => {
    fetch("https://resoluteserver.vercel.app/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  const handleDelete = () => {
    fetch(`https://resoluteserver.vercel.app/delete/${id}`, {
      method: "DELETE",
    }).then((res) =>
      fetch("https://resoluteserver.vercel.app/students")
        .then((res) => res.json())
        .then((data) => setStudents(data))
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
        <div className="flex items-center justify-center p-1 pt-2 overflow-hidden">
          <div className="w-full">
            <div className="bg-white rounded">
              <table className="w-full table-auto shadow rounded">
                <thead>
                  <tr className="bg-[#F33823] text-white text-sm">
                    <th className="py-4 px-6 text-left">Name</th>
                    <th className="py-4 px-6 text-left">Class</th>
                    <th className="py-4 px-6 text-center">Roll No.</th>
                    <th className="py-4 px-6 text-center">
                      View / Edit / Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {students.map((student, i) => {
                    return (
                      <tr
                        key={i}
                        className={
                          i % 2 === 0
                            ? "border-b border-gray-200 hover:bg-gray-100"
                            : "border-b border-gray-200 bg-[#FFF6F5] hover:bg-gray-100"
                        }
                      >
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="mr-2"></div>
                            <span className="font-semibold">
                              {student.firstName +
                                " " +
                                student.middleName +
                                " " +
                                student.lastName}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex font-semibold items-center">
                            <span>{student.class}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 ">
                          <div className="text-center font-semibold">
                            <span>{student.roll}</span>
                          </div>
                        </td>

                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div className="w-7 mr-2 transform hover:text-purple-500 hover:scale-110">
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
                              onClick={handleDelete}
                              className="w-7 mr-2 transform hover:text-purple-500 hover:scale-110"
                            >
                              <svg
                                onClick={() => setId(student._id)}
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manage;
