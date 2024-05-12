import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CurrentDateLogger from '../../../components/Date';
import generateIcon from '../../../assets/magic.png';
import { Dropdown } from '../Dash_book/Dash_NewBook';
import axios from 'axios';
import load from '../../../assets/loading.gif';
import valide from '../../../assets/valide.gif'
import unvalide from '../../../assets/unvalide.gif'

const Dash_UpdateUser = () => {
     const URL = import.meta.env.APP_API_URL;

     const navigate = useNavigate()
     const { id } = useParams();
     // const [userData, setUserData] = useState(null);
     const [loading, setLoading] = useState(true);





     const [firstname, setFirstname] = useState('');
     const [email, setEmail] = useState('');
     const [phone, setPhone] = useState('')
     const [role, setRole] = useState('')




     const [messageFirstname, setMessageFirstname] = useState('');
     const [messageEmail, setMessageEmail] = useState('');
     const [selectedType, setSelectedType] = useState('');


     const [creatingStatus, setCreatingStatus] = useState(null);
     const [statusMessage, setStatusMessage] = useState("");


     useEffect(() => {
          const fetchUsers = async () => {
               try {
                    const fetch_url = `${URL}users/fetchUser/${id}`;
                    const response = await axios.get(fetch_url);
                    // setUserData(response.data);
                    setLoading(false);
                    setFirstname(response.data.fullName)
                    setEmail(response.data.username)
                    setRole(response.data.role)
               } catch (error) {
                    console.log('Error fetching users:', error);
                    setLoading(false);
               }
          };

          fetchUsers();
          const handleCreationSuccess = async () => {
               if (creatingStatus === "valid") {
                    await new Promise(resolve => setTimeout(resolve, 1250));
                    navigate('/Adminpage/users');
               }
          };

          handleCreationSuccess();

     }, [creatingStatus, URL]);









     const handleUpdatingUser = async (e) => {
          if (!firstname) {
               setMessageFirstname('Fullname is required');
          }
          if (!email) {
               setMessageEmail("Username is required")
          }
          if (firstname, email) {
               try {
                    setCreatingStatus("loading")
                    const data = {
                         fullName: firstname,
                         username: email,
                    };

                    if (selectedType) {
                         data.role = selectedType;
                    }
                    console.log(data);

                    const fetch_url = `${URL}users/updateUserById/${id}`;
                    const response = await axios.put(fetch_url, data);
                    if (response.status === 200 || 201) {
                         setCreatingStatus("valid")
                    }
               } catch (error) {
                    setCreatingStatus("unvalide")
                    setStatusMessage(error.response.data.message)
               }
          }

     };

     const handleTypeSelect = (type) => {
          setSelectedType(type);
     };


     const Handlefirstname = (e) => {
          if (e.target.value.length == 0) {
               setMessageFirstname('Fullname is required')
          }
          else {
               setMessageFirstname('')
          }
          setFirstname(e.target.value);
     }



     const HandleEmail = (e) => {
          if (e.target.value.length == 0) {
               setMessageEmail('Username is required')
          }
          else {
               setMessageEmail('')
          }
          setEmail(e.target.value);
     }


     const handleSubmit = (e) => {
          e.preventDefault()
     }




     return (
          <div className="flex flex-col gap-8 mb-12">
               <div className="flex flex-col">
                    <div className="text-zinc-800 text-[18px] font-extra font-Mulish">New User Creation</div>
                    <CurrentDateLogger />
               </div>
               <div className="flex flex-col gap-10">
                    <div className="flex justify-start">
                         <Link to="/Adminpage/users" className="w-fit bg-[#FF4C30] rounded-md py-2 px-4 flex justify-center items-center space-x-2 cursor-pointer hover:shadow-button transition ease-out duration-150">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                                   <polyline points="15 18 9 12 15 6" />
                              </svg>
                              <div className="text-base font-bold font-['DM Sans'] text-white mr-2">Back</div>
                         </Link>
                    </div>


                    <div className="flex justify-center items-center w-full">
                         <div className="relative bg-white shadow-search rounded p-16 w-2/4">

                              {loading ? (
                                   <div className='w-full h-full flex flex-col items-center justify-center'>
                                        <div>
                                             <img src={load} width="60" alt="loading" />
                                        </div>
                                   </div>
                              ) : (
                                   <form onSubmit={handleSubmit} className='flex flex-col gap-6'>

                                        {/* // firstname and last name */}
                                        <div className="flex flex-col w-full justify-between items-start">

                                             <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="firstName">
                                                  Full Name
                                             </label>
                                             <input
                                                  className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                  id="firstName"
                                                  type="text"
                                                  placeholder="Full Name..."
                                                  value={firstname}
                                                  onChange={(e) => Handlefirstname(e)}
                                             />
                                             <div
                                                  className="text-red-500"
                                                  style={{ visibility: messageFirstname ? 'visible' : 'hidden' }}
                                             >
                                                  {messageFirstname}
                                             </div>




                                        </div>


                                        <div >
                                             <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="username">
                                                  Username
                                             </label>
                                             <div className="w-full border rounded flex items-center pr-3">
                                                  <input
                                                       className="shadow appearance-none rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-gray-600  focus:shadow-outline"
                                                       id="username"
                                                       type="text"
                                                       placeholder="Username..."
                                                       value={email}
                                                       onChange={HandleEmail}
                                                       autoComplete='username'
                                                  />
                                             </div>
                                             <div
                                                  className="text-red-500"
                                                  style={{ visibility: messageEmail ? 'visible' : 'hidden' }}
                                             >
                                                  {messageEmail}
                                             </div>

                                        </div>




                                        {/* //phone and type*/}
                                        <div>
                                             <div className='flex flex-col justify-between items-start'>

                                                  <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="copies">
                                                       Type
                                                  </label>
                                                  <Dropdown name={role} dropdownItems={["member", "admin"]} onSelect={handleTypeSelect} />

                                             </div>

                                        </div>



                                        <div className="w-full mt-6">
                                             <button onClick={handleUpdatingUser} className="w-full px-6 border-2 border-green-500 bg-green-500 text-white font-medium py-1.5 rounded-md hover:bg-transparent hover:text-green-500 font-semibold transition ease-out duration-250" >
                                                  update
                                             </button>
                                        </div>
                                   </form>
                              )}
                              {
                                   creatingStatus && (
                                        <div className='absolute bottom-0 left-0 w-full h-full bg-black bg-opacity-5 backdrop-blur-[3px] flex flex-col items-center justify-center'>
                                             <div className='bg-white p-8 rounded shadow-search flex flex-col items-center justify-center'>
                                                  {creatingStatus === "loading" && (
                                                       <img src={load} width="60" alt="loading" />
                                                  )}
                                                  {creatingStatus === "unvalide" && (
                                                       <div className='flex flex-col gap-4 items-center justify-center'>
                                                            <img src={unvalide} width="60" alt="unvalide" />
                                                            <h3 className='text-red-500 font-Poppins font-regular'>You cannot create a new user because {statusMessage}</h3>
                                                            <button
                                                                 onClick={() => { setStatusMessage(""); setCreatingStatus(""); }}
                                                                 className="w-full px-6 border-2 border-red-600 bg-red-600 text-white py-1.5 rounded-md hover:bg-transparent hover:text-red-600 font-semibold transition ease-out duration-250"
                                                            >
                                                                 understood
                                                            </button>
                                                       </div>
                                                  )}
                                                  {creatingStatus === "valid" && (
                                                       <div className='flex flex-col gap-4 items-center justify-center'>
                                                            <img src={valide} width="60" alt="valide" />
                                                            <h3 className='text-green-600 font-Poppins font-regular'>User Updated successfully</h3>
                                                       </div>
                                                  )}
                                             </div>
                                        </div>
                                   )
                              }



                         </div>
                    </div>
               </div >
          </div >
     );
};

export default Dash_UpdateUser;
