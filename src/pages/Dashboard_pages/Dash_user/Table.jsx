import React, { useState, useEffect } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import generateIcon from '../../../assets/magic.png'
import axios from "axios";
import bin from '../../../assets/bin.png'
import { Link } from "react-router-dom";
import { Dropdown } from "../Dash_book/Dash_NewBook";

const TableData = ({ data }) => {
  const URL = import.meta.env.APP_API_URL;


  const [userData, setUserData] = useState(data)
  const [password, setPassword] = useState('');
  const [Messagepassword, setMessagePassword] = useState('');
  const [Messagedeletion, setMessagedeletion] = useState('');
  const [color, setColor] = useState('text-green-500 font-bold')
  const [action, setAction] = useState(null)
  const [target, setTarget] = useState(null)
  const [selectedSize, setSelectedSize] = useState(10);



  useEffect(() => {
    const handleActionEvent = async () => {
      if (Messagepassword === "Reset succeeded") {
        await new Promise(resolve => setTimeout(resolve, 800));
        handleClose()
      }
      if (Messagedeletion === "User has been deleted") {
        await new Promise(resolve => setTimeout(resolve, 800));
        handleClose()
      }
    };

    handleActionEvent();
  }, [Messagepassword, Messagedeletion]);


  const handlePasswordGeneration = () => {
    const generatedPassword = generateRandomPassword();
    setPassword(generatedPassword);
  };

  const generateRandomPassword = (length = 12) => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()-=_+[]{}|;:,.<>?';
    const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars.charAt(randomIndex);
    }
    return password;
  };

  const asc = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      height="15"
      width="15"
      style={{ color: "#424242" }}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.76 22.7794L12 1.2206L0.24 22.7794H23.76Z"
        strokeWidth="1"
      />
    </svg>
  );

  const desc = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      height="15"
      width="15"
      style={{ color: "#424242", transform: "rotate(180deg)" }}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.76 22.7794L12 1.2206L0.24 22.7794H23.76Z"
        strokeWidth="1"
      />
    </svg>
  );



  const columns = React.useMemo(
    () => [
      {
        Header: "Fullname",
        accessor: "fullName",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Role",
        accessor: "role",
      },
    ],
    []
  );

  const {

    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex, pageSize },
    pageCount,
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data: userData,
      initialState: { pageIndex: 0, pageSize: selectedSize },
    },
    useSortBy,
    usePagination
  );


  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 0; i < pageCount; i++) {
      pages.push(
        <li key={i}>
          <button
            onClick={() => gotoPage(i)}
            className={`px-3 h-8 leading-tight ${pageIndex === i ? "font-bold bg-red-100" : "text-gray-500 bg-white"
              } border border-gray-300 hover:bg-red-150 hover:text-gray-700 `}
          >
            {i + 1}
          </button>
        </li>
      );
    }
    return pages;
  };


  const handleIconsClick = (act, id) => {
    setAction(act)
    setTarget(id)
  }


  const handlePasswordReset = async () => {
    if (!password) {
      setColor('text-red-500 font-bold')
      setMessagePassword("password field is required")
    }
    else {
      try {
        const data = {
          password: password
        };

        const fetch_url = `${URL}users/updateUserById/${target}`;
        const response = await axios.put(fetch_url, data);
        if (response.status === 200) {
          setColor('text-green-500 font-bold')
          setMessagePassword("Reset succeeded");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }


  const handleDeleteUser = async () => {
    try {
      const fetch_url = `${URL}users/deleteUserById/${target}`;
      const response = await axios.delete(fetch_url);
      if (response.status === 200) {
        setMessagedeletion("User has been deleted");
        setUserData(prevUserData => prevUserData.filter(user => user._id !== target));
      }
    } catch (error) {
      console.log(error);
    }
  };
  ;



  const handleClose = () => {
    setAction(null);
    setTarget(null);
    setPassword("");
    setMessagePassword("")
    setMessagedeletion("")
  }


  const CopyPassword = () => {
    navigator.clipboard.writeText(password)
    setColor('text-gray-500 font-bold');
    setMessagePassword("Password copied");
    const EmptyMessage = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessagePassword('')
    };

    EmptyMessage();

  }


  const handleActions = () => {
    if (action == 'delete') {
      return (
        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="absolute top-2 right-2" onClick={handleClose} >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#282828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" opacity-50 cursor-pointer hover:opacity-100 transition ease-out duration-150"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>

          </div>

          <div className="flex flex-col gap-6 items-center">

            <div className="flex flex-col gap-1 items-center" >
              <div className="flex flex-col gap-2 items-center">
                <img src={bin} width={"60"} alt="trash" />
                <h1 className="text-[25px] font-Poppins ">Delete User</h1>
              </div>

              <div>
                <h4 className="font-medium font-Poppins text-gray-600">This action can not be undone. Are you sure you want to delete this user ? </h4>
              </div>
            </div>

            <div
              className="text-red-600 font-bold"
              style={{ visibility: Messagedeletion ? 'visible' : 'hidden' }}
            >
              {Messagedeletion}
            </div>


          </div>



          <div className="flex gap-3">
            <button className="w-fit px-10 border-2 border-red-600 bg-red-600 text-white py-1.5   rounded-md hover:bg-transparent hover:text-red-600 font-semibold transition ease-out duration-250" onClick={handleDeleteUser}>
              Delete
            </button>
            <button className="w-fit px-10 border-[2px] border-gray-400 bg-gray-200 text-gray-800 font-bold py-1.5   rounded-md hover:bg-gray-300 font-semibold transition ease-out duration-250" onClick={handleClose}>
              cancel
            </button>
          </div>
        </div>
      )
    }
  };



  return (
    <div className="flex flex-col gap-6 mt-6">

      {action == "delete" && (
        <div className=" z-20 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center">
          <div className="w-fit bg-white pt-14 pb-8 px-5 rounded flex flex-col items-center justify-center relative" >
            {handleActions()}
          </div>
        </div>
      )}

      <div className="z-10 relative overflow-x-auto shadow-md rounded-lg">

        {/* // table start */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-red-100">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-6 py-3 font-Poppins text-[15px]">
                    <div className="flex items-center justify-between">
                      <span>{column.render("Header")}</span>
                      <span>{column.isSorted ? (column.isSortedDesc ? desc : asc) : ""}</span>
                    </div>
                  </th>
                ))}
                <th className="px-6 py-3 text-center font-Poppins text-[15px]">Actions</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr className="bg-white border-b" {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td scope="row" className="font-Mulish px-6 py-4 font-medium text-gray-900 whitespace-nowrap" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                    <div className="flex justify-center gap-5">
                      {/* //edit icon */}
                      <Link to={`Update_User/${row.original._id}`} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" transition ease-out duration-200 cursor-pointer opacity-60 hover:opacity-100 feather feather-edit">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </Link>
                      {/* //user delete icon */}
                      <div onClick={() => { handleIconsClick('delete', row.original._id) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" transition ease-out duration-200 cursor-pointer opacity-60 hover:opacity-100 feather feather-user-minus">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="8.5" cy="7" r="4"></circle>
                          <line x1="23" y1="11" x2="17" y2="11"></line>
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
      <div>
        <nav className="mt-3 flex  items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
          <span className="text-sm font-normal text-gray-500  mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing <span className="font-semibold text-gray-900">{pageIndex * pageSize + 1}-{Math.min((pageIndex + 1) * pageSize, userData.length)}</span> of <span className="font-semibold text-gray-900 ">{userData.length}</span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <button onClick={() => previousPage()} disabled={!canPreviousPage} className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-red-100 hover:text-gray-700 cursor-pointer ${!canPreviousPage ? 'opacity-40 cursor-not-allowed' : ''}`}>
                Previous
              </button>
            </li>
            {generatePageNumbers()}
            <li>
              <button onClick={() => nextPage()} disabled={!canNextPage} className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-red-100 hover:text-gray-700 cursor-pointer ${!canNextPage ? 'opacity-40 cursor-not-allowed' : ''}`}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TableData;
