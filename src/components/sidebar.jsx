import React, { useEffect, useState } from 'react';
import logo from '/Frame 1.png';
import Sidebar_buttons from './subcomponents/sidebar_buttons';
import { useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
import car from '../assets/car (1).png'
import car2 from '../assets/car (2).png'


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
               navigate('/Auth');
          }
          if (nextSegment === "logout") {
               Cookie.remove("access_token");
               navigate('/Auth');
               window.localStorage.removeItem("userID")
          }
     }, [nextSegment]);





     return (
          <div className="hidden md:flex h-screen bg-white shadow border sticky top-0 border-stone-200  flex-col justify-between items-start py-8 px-5">
               <div className='flex flex-col justify-between items-center space-y-16'>
                    <div className='flex justify-center items-center space-x-4'>
                         <img src={logo} className='pl-3 w-48' alt="Logo" />
                    </div>

                    <div className='w-full flex-col justify-between items-center space-y-5'>

                         <Sidebar_buttons
                              title="cars"
                              selected={selected}
                              onClick={handleButtonClick}
                              icon={<img src={selected === "cars" ? car2: car} alt="Car Icon" />}

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

                    </div>
               </div>
               <div className='w-full flex-col justify-between items-center space-y-3'>
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