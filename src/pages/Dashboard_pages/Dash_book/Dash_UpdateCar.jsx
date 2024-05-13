import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CurrentDateLogger from '../../../components/Date';
import { Dropdown } from './Dash_NewBook';
import axios from 'axios';
import load from '../../../assets/loading.gif';
import valide from '../../../assets/valide.gif'
import unvalide from '../../../assets/unvalide.gif'
import Brandcars from '../../../components/subcomponents/brandcars';

const Dash_UpdateCar = () => {
     const URL = 'https://meta-car-admin-backend.onrender.com/';
     const navigate = useNavigate()
     const { id } = useParams();

     const [loading, setLoading] = useState(true);
     const [carData, setCarData] = useState('');
     const [selectedType, setSelectedType] = useState('');
     const [selectedImage, setSelectedImage] = useState('');
     const [creatingStatus, setCreatingStatus] = useState(null);
     const [statusMessage, setStatusMessage] = useState("");
     const [error_title_message, setError_title_message] = useState("")



     const handleSelectBrand = (brand) => {
          setCarData(
               prevFormData => ({
                    ...prevFormData,
                    brand: brand,
               })
          )
     }


     useEffect(() => {
          const fetchUsers = async () => {
               try {
                    const fetch_url = `${URL}car/fetchCar/${id}`;
                    const response = await axios.get(fetch_url);
                    setLoading(false);
                    setCarData(response.data.data)
               } catch (error) {
                    console.log('Error fetching users:', error);
                    setLoading(false);
               }
          };

          fetchUsers();
          const handleCreationSuccess = async () => {
               if (creatingStatus === "valid") {
                    await new Promise(resolve => setTimeout(resolve, 1250));
                    navigate('/Adminpage/cars');
               }
          };

          handleCreationSuccess();

     }, [creatingStatus, URL]);


     useEffect(() => {
          if (selectedImage) {
               const renamedImageName = Date.now() + "_" + selectedImage.name;
               setImageName(renamedImageName);
               setCarData(prevFormData => ({
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

     }, [selectedImage]);


     useEffect(() => {
          setCarData(
               prevFormData => ({
                    ...prevFormData,
                    type: selectedType,
               })
          )
     }, [selectedType])


     const handleDataCarChange = (e) => {
          setCarData({
               ...carData,
               [e.target.name]: e.target.value
          })
     }


     const handleUpdatingCar = async (e) => {
          try {
               if (carData.title == "") {
                    setError_title_message("field is empty")
               } else {
                    setCreatingStatus("loading")
                    const data = carData
                    console.log(data);

                    const fetch_url = `${URL}car/updateCarsById/${id}`;
                    const response = await axios.put(fetch_url, data);

                    if (response.status === 200 || 201) {
                         setCreatingStatus("valid")
                    }
               }

          } catch (error) {
               setCreatingStatus("unvalide")
               setStatusMessage(error.response.data.message)
          }
     };

     const handleSubmit = (e) => {
          e.preventDefault()
     }


     return (
          <div className="flex flex-col gap-8 mb-12">
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
                              {loading ? (
                                   <div className='w-full h-full flex flex-col items-center justify-center'>
                                        <div>
                                             <img src={load} width="60" alt="loading" />
                                        </div>
                                   </div>
                              ) : (
                                   <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                             <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="title">
                                                  Car title
                                             </label>
                                             <input className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" name="title" type="text" placeholder="Title..." value={carData.title} onChange={handleDataCarChange} />
                                             {error_title_message && (
                                                  <p>{error_title_message}</p>
                                             )}
                                        </div>

                                        <Brandcars onSelect={handleSelectBrand} Brandvalue={carData.brand} />

                                        <div className="mb-4 flex gap-4">
                                             <div>
                                                  <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="kilometers">
                                                       kilometers
                                                  </label>
                                                  <input className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="kilometers" type="number" name="kilometers" value={carData.kilometers} onChange={handleDataCarChange} />
                                             </div>
                                             <div className=' w-full'>
                                                  <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="Type">
                                                       Type
                                                  </label>
                                                  <Dropdown name={carData.type} dropdownItems={["Automatic", "manual"]} onSelect={setSelectedType} />
                                             </div>
                                        </div>
                                        <div className="mb-4 flex gap-4 w-full" >
                                             <div className="w-[30%]">
                                                  <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="size">
                                                       Size
                                                  </label>

                                                  <input className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="size" type="number" name="size" value={carData.size} onChange={handleDataCarChange} />


                                             </div>
                                             <div className="w-[65%]">
                                                  <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="Price">
                                                       Price
                                                  </label>
                                                  <div className="flex items-center justify-between">
                                                       <input className="shadow appearance-none border rounded w-[83%] p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Price" type="number" value={carData.price} name="price" onChange={handleDataCarChange} />
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
                                                       {carData.color}
                                                  </div>
                                                  <div className="w-full flex items-center justify-between bg-gray-200 rounded p-3">
                                                       {["black", "gray", "silver", "red", "green", "white"].map((color, index) => (
                                                            <button
                                                                 key={index}
                                                                 className={`h-7 w-7 rounded-full`}
                                                                 style={{ backgroundColor: color, border: carData.color === color ? `2px solid ${color}` : 'none' }}
                                                                 onClick={() => setCarData({ ...carData, color: color })}
                                                                 title={color}
                                                            ></button>
                                                       ))}
                                                       <button
                                                            className={`h-7 w-7 rounded-full border border-gray-900`}
                                                            onClick={() => setCarData({ ...carData, color: "other" })}
                                                            title={'other'}
                                                       ></button>
                                                  </div>

                                             </div>
                                        </div>

                                        <div className="w-full">
                                             <button onClick={handleUpdatingCar} className='w-full px-6 border-2 border-[#FF4C30] bg-[#FF4C30] text-white py-1.5 rounded-md hover:bg-transparent hover:text-[#FF4C30] font-semibold transition ease-out duration-250'>
                                                  Update
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
                                                            <h3 className='text-red-500 font-Poppins font-regular'>You cannot update this Car because {statusMessage}</h3>
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
                                                            <h3 className='text-green-600 font-Poppins font-regular'>Car updated successfully</h3>
                                                       </div>
                                                  )}
                                             </div>
                                        </div>
                                   )
                              }

                         </div>
                    </div>
               </div>
          </div >
     );
};

export default Dash_UpdateCar;
