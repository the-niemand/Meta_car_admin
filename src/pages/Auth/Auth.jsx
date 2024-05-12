import React, { useEffect, useState } from 'react';
import logo from '/Frame 3.ico';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router';
import load from '../../assets/loading.gif';


const Auth = () => {

     const URL = import.meta.env.APP_API_URL;
     const navigate = useNavigate()
     const cookies = new Cookies();

     const bg_style = {
          backgroundImage: "url('/trail-light-red-sports-car-white-rooms.jpg')",
          backgroundSize: 'cover'
     }



     const [username, setUsername] = useState("")
     const [password, setPassword] = useState("")
     const [message, setMessage] = useState("")

     const [loading, setLoading] = useState(false)

     useEffect(() => {
          const handleActionEvent = async () => {
               await new Promise(resolve => setTimeout(resolve, 5000));
               setMessage("")
          };
          handleActionEvent();
     }, [message])



     const data = {
          username: username,
          password: password
     }



     const HandleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);
          try {
               const res = await axios.post(`${URL}auth/Adminlogin`, data)
               window.localStorage.setItem("userID", res.data._id)
               cookies.set("access_token", res.data.token, {
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
               })
               navigate("/Adminpage/cars")

          } catch (error) {
               if (error.response.data.error) {
                    setMessage(error.response.data.error)
               } else {
                    console.log(error);
               }
          } finally {
               setLoading(false);
          }
     }


     return (
          <div className="flex justify-center items-center h-screen" style={bg_style}>
               <div className="relative w-96 p-6 shadow-lg bg-white rounded-md">


                    {loading && (
                         <div className="absolute bottom-0 rounded-md left-0 w-full h-full self-stretch grow shrink basis-0  bg-black bg-opacity-15 backdrop-blur-[3px] flex-col justify-center items-center inline-flex">
                              <div className="bg-white rounded shadow-lg w-1/4 h-1/4 flex-col justify-center items-center inline-flex" >
                                   <img src={load} width="50" />
                              </div>
                         </div>
                    )}

                    <div className='flex flex-col justify-center items-center mb-8'>
                         <img src={logo} className='w-20' />
                         <h1 className='hidden lg:block text-[#FF4C30] text-[20px] font-bold font-Poppins'>Meta Admin</h1>
                    </div>
                    <hr className="mt-3" />

                    <form onSubmit={HandleSubmit}>
                         <div className="mt-3">
                              <label htmlFor="username" className="block text-base mb-2">username</label>
                              <input
                                   type="text"
                                   id="username"
                                   className="border rounded w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                                   placeholder="Enter username..."
                                   onChange={(e) => { setUsername(e.target.value) }}
                              />
                         </div>
                         <div className="mt-3">
                              <label htmlFor="password" className="block text-base mb-2">Password</label>
                              <input
                                   type="password"
                                   id="password"
                                   className="border rounded w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                                   placeholder="Enter Password..."
                                   onChange={(e) => { setPassword(e.target.value) }}
                              />
                         </div>
                         {message && (
                              <p className='mt-1 text-red-600 text-sm font-medium'>{message}</p>
                         )}
                         <div className="mt-6 flex justify-between items-center">
                              <div className='flex items-center'>
                                   <input type="checkbox" className='cursor-pointer' />
                                   <label className="ml-1 text-[14px] ">Remember Me</label>
                              </div>
                              <div>
                                   <a href="#" className="text-violet-800 hover:underline text-[12px] font-semibold hover:underline transition ease-out duration-100">Forgot Password?</a>
                              </div>
                         </div>
                         <div className="mt-5">
                              <button
                                   type="submit"
                                   className="border-2 border-[#FF4C30] bg-[#FF4C30] text-white py-1 w-full rounded-md hover:bg-transparent hover:text-[#FF4C30] font-semibold transition ease-out duration-150"
                              >
                                   <i className="fas fa-angle-double-right"></i>&nbsp;&nbsp;Login
                              </button>
                         </div>
                    </form>

               </div>
          </div>
     );
};

export default Auth;
