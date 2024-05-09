import React, { useEffect, useState } from 'react';
import logo from '/open-book.png';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router';
import load from '../../assets/loading.gif';


const Auth = () => {

     const navigate = useNavigate()
     const cookies = new Cookies();



     const [email, setEmail] = useState("")
     const [password, setPassword] = useState("")

     const [loading, setLoading] = useState(false)

     const data = {
          email: email,
          password: password
     }



     const HandleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);
          try {
               const res = await axios.post("https://maktabati-server-api.onrender.com/users/login", data)
               cookies.set("access_token", res.data.token, {
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
               })
               window.localStorage.setItem("userID", res.data.user_id),
               navigate("/maktabati_client_side/Adminpage/books")

          } catch (error) {
               console.log(error);
          } finally {
               setLoading(false);
          }
     }


     return (
          <div className="flex justify-center items-center h-screen bg-yellow-400">
               <div className="relative w-96 p-6 shadow-lg bg-white rounded-md">


                    {loading && (
                         <div className="absolute bottom-0 rounded-md left-0 w-full h-full self-stretch grow shrink basis-0  bg-black bg-opacity-15 backdrop-blur-[3px] flex-col justify-center items-center inline-flex">
                              <div className="bg-white rounded shadow-lg w-1/4 h-1/4 flex-col justify-center items-center inline-flex" >
                                   <img src={load} width="50" />
                              </div>
                         </div>
                    )}

                    <div className='flex flex-col justify-center items-center mb-8'>
                         <img src={logo} className='w-12' />
                         <h1 className='hidden lg:block text-yellow-400 text-[20px] font-bold font-Poppins'>Maktabati</h1>
                    </div>
                    <hr className="mt-3" />

                    <form onSubmit={HandleSubmit}>
                         <div className="mt-3">
                              <label htmlFor="username" className="block text-base mb-2">Email</label>
                              <input
                                   type="text"
                                   id="email"
                                   className="border rounded w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                                   placeholder="Enter Email..."
                                   onChange={(e) => { setEmail(e.target.value) }}
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
                         <div className="mt-6 flex justify-between items-center">
                              <div className='flex items-center'>
                                   <input type="checkbox" className='cursor-pointer' />
                                   <label className="ml-1 text-[14px] ">Remember Me</label>
                              </div>
                              <div>
                                   <a href="#" className="text-yellow-500 text-[12px] font-semibold hover:underline transition ease-out duration-100">Forgot Password?</a>
                              </div>
                         </div>
                         <div className="mt-5">
                              <button
                                   type="submit"
                                   className="border-2 border-yellow-400 bg-yellow-400 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-yellow-400 font-semibold transition ease-out duration-150"
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
