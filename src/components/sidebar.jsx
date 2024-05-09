import React, { useEffect, useState } from 'react';
import logo from '/open-book.png';
import Sidebar_buttons from './subcomponents/sidebar_buttons';
import { useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';


const Sidebar = () => {

     const Cookie = new Cookies();
     const location = useLocation();

     const parts = location.pathname.split('/');
     const adminPageIndex = parts.indexOf("Adminpage");
     const nextSegment = parts[adminPageIndex + 1];

     const [selected, setSelected] = useState(nextSegment);

     const navigate = useNavigate();

     const handleButtonClick = (title) => {
          setSelected(title);
     };


     useEffect(() => {
          if (!Cookie.get("access_token")) {
               navigate('/maktabati_client_side/Auth');
          }
          if (nextSegment === "logout") {
               Cookie.remove("access_token");
               navigate('/maktabati_client_side/Auth');
               window.localStorage.removeItem("userID")
          }
     }, [nextSegment]);





     return (
          <div className="hidden md:flex h-screen bg-white shadow border sticky top-0 border-stone-200  flex-col justify-between items-center py-8 px-5">
               <div className='flex flex-col justify-between items-center space-y-16'>
                    <div className='flex justify-center items-center space-x-4'>
                         <img src={logo} className='w-10 h-10' alt="Logo" />
                         <h1 className='hidden lg:block text-yellow-400 text-[21px] font-semibold font-Poppins'>Maktabati</h1>
                    </div>
                    <div className='w-full flex-col justify-between items-center space-y-5'>

                         <Sidebar_buttons
                              title="books"
                              selected={selected}
                              onClick={handleButtonClick}
                              icon={
                                   <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                   </svg>
                              }
                         />


                         <Sidebar_buttons
                              title="users"
                              selected={selected}
                              onClick={handleButtonClick}
                              icon={
                                   <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                   </svg>
                              }
                         />

                         <Sidebar_buttons
                              title="borrows"
                              selected={selected}
                              onClick={handleButtonClick}
                              icon={
                                   <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                        <polyline points="14 2 14 8 20 8"></polyline>
                                        <line x1="16" y1="13" x2="8" y2="13"></line>
                                        <line x1="16" y1="17" x2="8" y2="17"></line>
                                        <polyline points="10 9 9 9 8 9"></polyline>
                                   </svg>
                              }
                         />

                         <Sidebar_buttons
                              title="return"
                              selected={selected}
                              onClick={handleButtonClick}
                              icon={
                                   <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 8 8 12 12 16"></polyline>
                                        <line x1="16" y1="12" x2="8" y2="12"></line>
                                   </svg>
                              }
                         />

                    </div>
               </div>
               <div className='w-full flex-col justify-between items-center space-y-3'>
                    <Sidebar_buttons
                         title="settings"
                         selected={selected}
                         onClick={handleButtonClick}
                         icon={
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sliders">
                                   <line x1="4" y1="21" x2="4" y2="14"></line>
                                   <line x1="4" y1="10" x2="4" y2="3"></line>
                                   <line x1="12" y1="21" x2="12" y2="12"></line>
                                   <line x1="12" y1="8" x2="12" y2="3"></line>
                                   <line x1="20" y1="21" x2="20" y2="16"></line>
                                   <line x1="20" y1="12" x2="20" y2="3"></line>
                                   <line x1="1" y1="14" x2="7" y2="14"></line>
                                   <line x1="9" y1="8" x2="15" y2="8"></line>
                                   <line x1="17" y1="16" x2="23" y2="16"></line>
                              </svg>
                         }
                    />

                    <Sidebar_buttons
                         title="logout"
                         selected={selected}
                         onClick={handleButtonClick}
                         icon={
                              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                   <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                   <polyline points="16 17 21 12 16 7"></polyline>
                                   <line x1="21" y1="12" x2="9" y2="12"></line>
                              </svg>
                         }
                    />

               </div>
          </div>
     );
};

export default Sidebar;