import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CurrentDateLogger from '../../../components/Date';
import generateIcon from '../../../assets/magic.png';
import { Dropdown } from '../Dash_book/Dash_NewBook';
import axios from 'axios';
import load from '../../../assets/loading.gif';
import valide from '../../../assets/valide.gif'
import unvalide from '../../../assets/unvalide.gif'

const Dash_NewUser = () => {
     const URL = import.meta.env.APP_API_URL;

     const navigate = useNavigate()


     const [fullName, setFullName] = useState('');
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [passwordConfirmation, setPasswordConfirmation] = useState('');


     const [messageFirstname, setMessageFirstname] = useState('');
     const [messageEmail, setMessageEmail] = useState('');
     const [messagePassword, setMessagePassword] = useState('');
     const [messagePasswordConfirmation, setMessagePasswordConfirmation] = useState('');
     const [messagePhone, setMessagePhone] = useState('');


     const [selectedType, setSelectedType] = useState('');
     const [eye, setEye] = useState(false)
     const [type, setType] = useState("password")



     const [creatingStatus, setCreatingStatus] = useState(null);
     const [statusMessage, setStatusMessage] = useState("");


     useEffect(() => {
          const handleCreationSuccess = async () => {
               if (creatingStatus === "valid") {
                    await new Promise(resolve => setTimeout(resolve, 1250));
                    navigate('/Adminpage/users');
               }
          };

          handleCreationSuccess();
     }, [creatingStatus]);


     const handleCreatingUser = async (e) => {
          if (!fullName) {
               setMessageFirstname('FullName name is required');
          }
          if (!username) {
               setMessageEmail("Username is required")
          }
          if (!password) {
               setMessagePassword('Password is required');
          }
          if (!passwordConfirmation) {
               setMessagePasswordConfirmation('Password Confirmation number is required');
          }
          if (fullName, username, password, passwordConfirmation) {
               try {
                    setCreatingStatus("loading")
                    const data = {
                         fullName: fullName,
                         username: username,
                         password: password,
                         confirmPassword: passwordConfirmation,
                    };

                    if (selectedType) {
                         data.role = selectedType;
                    } else {
                         data.role = "member";
                    }
                    console.log(JSON.stringify(data));
                    const fetch_url = `${URL}auth/signup`;
                    const response = await axios.post(fetch_url, data);
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



     const handlePasswordGeneration = () => {
          const generatedPassword = generateRandomPassword();
          setPassword(generatedPassword);
          setPasswordConfirmation(generatedPassword);

          setMessagePassword("")
          setMessagePasswordConfirmation("")
     };

     const Handlefirstname = (e) => {
          if (e.target.value.length == 0) {
               setMessageFirstname('First name is required')
          }
          else {
               setMessageFirstname('')
          }
          setFullName(e.target.value);
     }


     const HandlePassword = (e) => {
          if (e.target.value.length == 0) {
               setMessagePassword('Password is required')
          }
          else {
               setMessagePassword('')
          }
          setPassword(e.target.value);
     }

     const HandlePasswordConfirmation = (e) => {
          if (e.target.value.length == 0) {
               setMessagePasswordConfirmation('Password Confirmation is required')
          }
          else {
               setMessagePasswordConfirmation('')
          }
          setPasswordConfirmation(e.target.value);
     }

     const HandleEmail = (e) => {
          if (e.target.value.length == 0) {
               setMessageEmail('Username name is required')
          }
          else {
               setMessageEmail('')
          }
          setUsername(e.target.value);
     }


     const handleEyeClick = () => {
          type == "password" ? setType("text") : setType("password")
          setEye((prevState) => !prevState);
     };


     const handleSubmit = (e) => {
          e.preventDefault()
     }


     const CheckPasswordConfirmation = () => {
          if (password !== passwordConfirmation) {
               setMessagePasswordConfirmation('Password Confirmation is incorrect');
          } else {
               setMessagePasswordConfirmation("")
          }

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

                              <form onSubmit={handleSubmit} className='flex flex-col gap-6'>

                                   {/* // fullName and last name */}
                                   <div className="flex w-full justify-between items-start">
                                        <div className="w-full">
                                             <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="fullName">
                                                  Full Name
                                             </label>
                                             <input
                                                  className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                  id="fullName"
                                                  type="text"
                                                  placeholder="FullName..."
                                                  value={fullName}
                                                  onChange={(e) => Handlefirstname(e)}
                                             />
                                             <div
                                                  className="text-red-500"
                                                  style={{ visibility: messageFirstname ? 'visible' : 'hidden' }}
                                             >
                                                  {messageFirstname}
                                             </div>

                                        </div>

                                   </div>

                                   {/* //email */}
                                   <div >
                                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">
                                             username
                                        </label>
                                        <div className="w-full border rounded flex items-center pr-3">
                                             <input
                                                  className="shadow appearance-none rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-gray-600  focus:shadow-outline"
                                                  id="username"
                                                  type="username"
                                                  placeholder="username..."
                                                  value={username}
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


                                   {/* //password */}
                                   <div >
                                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">
                                             Password
                                        </label>
                                        <div className="w-full border rounded flex items-center pr-3">
                                             <input
                                                  className="shadow appearance-none rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-gray-600  focus:shadow-outline"
                                                  id="password"
                                                  type={type}
                                                  placeholder="Password..."
                                                  value={password}
                                                  onChange={HandlePassword}
                                                  autoComplete="new-password"
                                             />
                                             <div className='flex gap-4'>
                                                  {eye ? (
                                                       <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer opacity-40 hover:opacity-100 transition ease-out duration-150 feather feather-eye" onClick={handleEyeClick}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                  ) : (
                                                       <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer opacity-40 hover:opacity-100 transition ease-out duration-150 feather feather-eye-off" onClick={handleEyeClick}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                                  )}
                                                  <img src={generateIcon} className="cursor-pointer w-5 h-5 opacity-40 hover:opacity-100 transition ease-out duration-150" alt="generate-icon" onClick={handlePasswordGeneration} />
                                             </div>

                                        </div>
                                        <div
                                             className="text-red-500"
                                             style={{ visibility: messagePassword ? 'visible' : 'hidden' }}
                                        >
                                             {messagePassword}
                                        </div>
                                   </div>


                                   {/* //passwordConfirmation */}
                                   <div >
                                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="passwordConfirmation">
                                             Password confirmation
                                        </label>
                                        <div className="w-full border rounded flex items-center pr-3">
                                             <input
                                                  className="shadow appearance-none rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:ring-0 focus:border-gray-600  focus:shadow-outline"
                                                  id="passwordConfirmation"
                                                  type="password"
                                                  placeholder="Password confirmation..."
                                                  value={passwordConfirmation}
                                                  onChange={HandlePasswordConfirmation}
                                                  onBlur={CheckPasswordConfirmation}
                                                  autoComplete="new-password"
                                             />
                                        </div>
                                        <div
                                             className="text-red-500"
                                             style={{ visibility: messagePasswordConfirmation ? 'visible' : 'hidden' }}
                                        >
                                             {messagePasswordConfirmation}
                                        </div>
                                   </div>


                                   {/* //phone and type*/}
                                   <div>
                                        <div >
                                             <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="copies">
                                                  Type
                                             </label>
                                             <Dropdown name={"Role"} dropdownItems={["member", "admin"]} onSelect={handleTypeSelect} />
                                        </div>


                                        <div
                                             className="text-red-500"
                                             style={{ visibility: messagePhone ? 'visible' : 'hidden' }}
                                        >
                                             {messagePhone}
                                        </div>
                                   </div>



                                   <div className="w-full mt-6">
                                        <button onClick={handleCreatingUser} className="w-full px-6 border-2 border-[#FF4C30] bg-[#FF4C30] text-white py-1.5 rounded-md hover:bg-transparent hover:text-[#FF4C30] font-semibold transition ease-out duration-250" >
                                             Create
                                        </button>
                                   </div>
                              </form>




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
                                                            <h3 className='text-green-600 font-Poppins font-regular'>User created successfully</h3>
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

export default Dash_NewUser;
