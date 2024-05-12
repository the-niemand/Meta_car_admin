import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TableData from './Table';
import { Link } from 'react-router-dom';
import CurrentDateLogger from '../../../components/Date';
import adduser from "../../../assets/user.png";
import loadingSpinner from "../../../assets/loading.gif";

const Dash_Users = () => {
     const URL = import.meta.env.APP_API_URL;
     const [userData, setUserData] = useState(null);
     const [loading, setLoading] = useState(true); 

     useEffect(() => {
          const fetchUsers = async () => {
               try {
                    const fetch_url = `${URL}users/fetchUsers`;
                    const response = await axios.get(fetch_url);
                    setUserData(response.data);
                    setLoading(false);
               } catch (error) {
                    console.log('Error fetching users:', error);
                    setLoading(false);
               }
          };

          fetchUsers();
     }, [URL]);

     return (
          <div className='flex flex-col gap-5'>
               <div className='flex flex-col'>
                    <div className="text-zinc-800 text-[18px] font-extra font-Mulish">Users Management</div>
                    <CurrentDateLogger />
               </div>
               <div className='flex flex-col gap-2'>
                    <div className='flex justify-end'>
                         <Link to={"Create_User"} className="w-fit bg-[#FF4C30] rounded-md py-2 px-4 flex justify-center gap-5 items-center cursor-pointer hover:shadow-button transition ease-out duration-150">
                              <div className="hidden lg:block text-white text-base font-bold font-['DM Sans']">Add new user</div>
                              <img className="w-6 h-6" src={adduser} alt="Add User" />
                         </Link>
                    </div>
                    {loading ? (
                         <div className='w-full h-full flex items-center justify-center mt-32'>
                              <div className=' w-[180px] h-[180px]  bg-white shadow-lg flex items-center justify-center'>
                                   <img src={loadingSpinner} alt="Loading" width={100} />
                              </div>
                         </div>

                    ) : (
                         <TableData data={userData} />
                    )}
               </div>
          </div>
     );
};

export default Dash_Users;
