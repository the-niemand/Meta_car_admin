import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import CurrentDateLogger from '../../../components/Date';
import FileDrop from '../../../components/FileDrop';
import axios from "axios";
import load from '../../../assets/loading.gif';
import valide from '../../../assets/valide.gif'
import unvalide from '../../../assets/unvalide.gif'
import Brandcars from "../../../components/subcomponents/brandcars";

const Dash_NewBook = () => {
     const URL = 'https://meta-car-admin-backend.onrender.com/';
     const navigate = useNavigate()

   
   
 


     const [creatingStatus, setCreatingStatus] = useState(null);
     const [statusMessage, setStatusMessage] = useState("");
     const [selectedImage, setSelectedImage] = useState(null);
     const [imageName, setImageName] = useState(null);
     const [formData, setFormData] = useState({
          title: '',
          brand: '',
          type: '',
          kilometers: '',
          price: '',
          size: '',
          color: 'silver',
          image: null,
     });


     useEffect(() => {
          if (selectedImage) {
               const renamedImageName = Date.now() + "_" + selectedImage.name;
               setImageName(renamedImageName);
               setFormData(prevFormData => ({
                    ...prevFormData,
                    image: renamedImageName,
               }));
          }

          const handleCreationSuccess = async () => {
               if (creatingStatus === "valid") {
                    await new Promise(resolve => setTimeout(resolve, 1250));
                    navigate('/Adminpage/cars');
               }
          };

          handleCreationSuccess();

     }, [selectedImage,creatingStatus]);

     const handleChange = (e) => {
          setFormData({
               ...formData,
               [e.target.name]: e.target.value,
          });
     };

     const handleTypeSelect = (type) => {
          setFormData({
               ...formData,
               type: type,
          });
     };

     const handleBrandSelect = (carbrand) => {
          setFormData({
               ...formData,
               brand: carbrand,
          });
     }

     const handleImageSelect = (image) => {
          setSelectedImage(image);
     };

     const handleCreatingCar = async () => {
          try {

               if (!selectedImage) {
                    console.error('No image selected');
                    return;
               }
               setCreatingStatus("loading")
               const formDataToSubmit = new FormData();
               formDataToSubmit.append('file', new File([selectedImage], imageName));
               formDataToSubmit.append('data', JSON.stringify(formData));
               console.log(JSON.stringify(formData));
               const fetch_url = `${URL}car/createCar`;

               if (fetch_url) {
                    const response = await axios.post(`${URL}car/createCar`, formDataToSubmit, {
                         headers: {
                              'Content-Type': 'multipart/form-data',
                         },
                    });

                    if (response.status == 201 || 200) {
                         setCreatingStatus("valid")
                    }
               }


          } catch (error) {
               setCreatingStatus("unvalide")
               console.log(error);
               setStatusMessage(error.response.data.message)
          }
     };

     const handleSubmit = (e) => {
          e.preventDefault();
     };


     const handleSizeChange = (e) => {
          let value = e.target.value;
          if (value >= 9) {
               e.target.value = 8;
          }
          if (value < 0) {
               e.target.value = 0;
          }
          setFormData({
               ...formData,
               [e.target.name]: value,
          });


     };

     return (
          <>
               <div className='flex flex-col'>
                    <div className="text-zinc-800 text-[18px] font-extra font-Mulish">New Car Creation</div>
                    <CurrentDateLogger />
               </div>
               <div className='flex flex-col space-y-4 mt-10'>
                    <div className='flex justify-start'>
                         <Link to="/Adminpage/cars" className="w-fit bg-[#FF4C30] rounded-md py-2 px-4 flex justify-center items-center space-x-2 cursor-pointer hover:shadow-button transition ease-out duration-150">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                              <div className="text-base font-bold font-['DM Sans'] text-white mr-2">Back</div>
                         </Link>
                    </div>

                    <div className='flex justify-center items-center mt-10 w-full'>
                         <div className='bg-white shadow-search rounded p-16 w-2/4'>
                              <form onSubmit={handleSubmit}>
                                   <div className="mb-4">
                                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="title">
                                             Car title
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" name="title" type="text" placeholder="Title..." onChange={handleChange} />
                                   </div>

                                   <Brandcars onSelect={handleBrandSelect} />

                                   <div className="mb-4 flex gap-4">
                                        <div>
                                             <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="kilometers">
                                                  kilometers
                                             </label>
                                             <input className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="kilometers" type="number" name="kilometers" onChange={handleChange} />
                                        </div>
                                        <div className=' w-full'>
                                             <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="Type">
                                                  Type
                                             </label>
                                             <Dropdown name={"Type"} dropdownItems={["Automatic", "manual"]} onSelect={handleTypeSelect} />
                                        </div>
                                   </div>
                                   <div className="mb-4 flex gap-4 w-full" >
                                        <div className="w-[30%]">
                                             <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="size">
                                                  Size
                                             </label>

                                             <input className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="size" type="number" name="size" onChange={handleSizeChange} />


                                        </div>
                                        <div className="w-[65%]">
                                             <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="Price">
                                                  Price
                                             </label>
                                             <div className="flex items-center justify-between">
                                                  <input className="shadow appearance-none border rounded w-[83%] p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Price" type="number" name="price" onChange={handleChange} />
                                                  <span className="block text-gray-700 text-md font-bold">$ / Day</span>
                                             </div>
                                        </div>

                                   </div>

                                   <div className="mb-8">
                                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="color">
                                             Color
                                        </label>
                                        <div className="flex gap-2">
                                             <div className="rounded border border-gray-200 p-4">
                                                  {formData.color}
                                             </div>
                                             <div className="w-full flex items-center justify-between bg-gray-200 rounded p-3">
                                                  {["black", "gray", "silver", "red", "green", "white"].map((color, index) => (
                                                       <button
                                                            key={index}
                                                            className={`h-7 w-7 rounded-full`}
                                                            style={{ backgroundColor: color, border: formData.color === color ? `2px solid ${color}` : 'none' }}
                                                            onClick={() => setFormData({ ...formData, color: color })}
                                                            title={color}
                                                       ></button>
                                                  ))}
                                                  <button
                                                       className={`h-7 w-7 rounded-full border border-gray-900`}
                                                       onClick={() => setFormData({ ...formData, color: "other" })}
                                                       title={'other'}
                                                  ></button>
                                             </div>

                                        </div>
                                   </div>


                                   <FileDrop onSelect={handleImageSelect} />
                                   <div className="w-full">
                                        <button onClick={handleCreatingCar} className='w-full px-6 border-2 border-[#FF4C30] bg-[#FF4C30] text-white py-1.5 rounded-md hover:bg-transparent hover:text-[#FF4C30] font-semibold transition ease-out duration-250'>
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
                                                            <h3 className='text-red-500 font-Poppins font-regular'>You cannot create a new Car because {statusMessage}</h3>
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
                                                            <h3 className='text-green-600 font-Poppins font-regular'>Car created successfully</h3>
                                                       </div>
                                                  )}
                                             </div>
                                        </div>
                                   )
                              }

                         </div>
                    </div>
               </div>
          </>
     );
};




export const Dropdown = ({ name , dropdownItems, onSelect }) => {

     const [isOpen, setIsOpen] = useState(false);
     const [selected, setSelected] = useState(name);
     const dropdownRef = useRef(null);

     const toggleDropdown = () => {
          setIsOpen(!isOpen);
     };

     const handleOutsideClick = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
               setIsOpen(false);
          }
     };

     useEffect(() => {
          document.addEventListener("mousedown", handleOutsideClick);

          return () => {
               document.removeEventListener("mousedown", handleOutsideClick);
          };
     }, []);


     return (
          <div className="relative w-full" ref={dropdownRef}>
               <button
                    className="border w-full text-black opacity-70 font-bold py-2.5 px-4 rounded flex justify-between items-center"
                    onClick={toggleDropdown}
               >
                    <span className="truncate">{selected}</span>
                    <svg
                         xmlns="http://www.w3.org/2000/svg"
                         width="22"
                         height="22"
                         viewBox="0 0 24 24"
                         fill="none"
                         stroke="currentColor"
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         className={`feather feather-chevron-down pt-1 ${isOpen ? "rotate-180 pt-0" : ""} transition ease-out duration-200 ml-2`}
                    >
                         <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
               </button>

               <div className={` ${isOpen ? "block" : "hidden"} text-zinc-800 p-3 rounded border mt-2 flex space-x-4`}>
                    <ul className="w-full">
                         {dropdownItems.map((item, index) => (
                              <li
                                   className="cursor-pointer hover:bg-gray-200 rounded py-2 px-4 truncate w-full"
                                   key={index}
                                   onClick={() => {
                                        setSelected(item);
                                        onSelect(item); // Trigger onSelect callback with selected item
                                        setIsOpen(false);
                                   }}
                              >
                                   {item}
                              </li>
                         ))}
                    </ul>
               </div>
          </div>
     );
};

export default Dash_NewBook;



