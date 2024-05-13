import React from 'react'
import Sidebar from '../components/sidebar'
import { Routes, Route } from 'react-router-dom'
import Dash_Books from './Dashboard_pages/Dash_book/Dash_Books';
import Dash_Users from './Dashboard_pages/Dash_user/Dash_Users';
import Dash_NewBook from './Dashboard_pages/Dash_book/Dash_NewBook';
import Dash_NewUser from './Dashboard_pages/Dash_user/Dash_NewUser';
import Dash_UpdateUser from './Dashboard_pages/Dash_user/Dash_UpdateUser';
import Dash_UpdateCar from './Dashboard_pages/Dash_book/Dash_UpdateCar';

const Dashboard = () => {
     return (
          <div className='flex'>
               <Sidebar />
               <div className='w-screen flex flex-col px-16 py-10 relative'>
                    <Routes>

                         <Route path='/cars' element={<Dash_Books />} />
                         <Route path='/cars/Create_car' element={<Dash_NewBook />} />
                         <Route path='/cars/Update_Car/:id' element={<Dash_UpdateCar />} />

                         <Route path='/users' element={<Dash_Users />} />
                         <Route path='/users/Create_User' element={<Dash_NewUser />} />
                         <Route path='/users/Update_User/:id' element={<Dash_UpdateUser />} />

                    </Routes>
               </div>
          </div>
     )
}

export default Dashboard