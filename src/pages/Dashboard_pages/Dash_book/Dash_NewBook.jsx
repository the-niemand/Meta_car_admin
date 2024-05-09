import React, { useState, useEffect, useRef } from "react";
import { Link , useNavigate } from 'react-router-dom';
import CurrentDateLogger from '../../../components/Date';
import FileDrop from '../../../components/FileDrop';
import DropDown2 from '../../../components/subcomponents/dropdown2';
import axios from "axios";
import load from '../../../assets/loading.gif';
import valide from '../../../assets/valide.gif'
import unvalide from '../../../assets/unvalide.gif'

const Dash_NewBook = () => {
     const URL = import.meta.env.APP_API_URL;
     const navigate = useNavigate()



     const [creatingStatus, setCreatingStatus] = useState(null);
     const [statusMessage, setStatusMessage] = useState("");


     const [authors, setAuthors] = useState([]);
     const [authorInput, setAuthorInput] = useState('');
     const [selectedImage, setSelectedImage] = useState(null);
     const [imageName, setImageName] = useState(null);
     const [formData, setFormData] = useState({
          title: '',
          type: '',
          authors: [],
          categories: '',
          copies: '',
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
          if (authors) {
               setFormData(prevFormData => ({
                    ...prevFormData,
                    authors: authors,
               }));
          }

          const handleCreationSuccess = async () => {
               if (creatingStatus === "valid") {
                    await new Promise(resolve => setTimeout(resolve, 1250));
                    navigate('/maktabati_client_side/Adminpage/books');
               }
          };

          handleCreationSuccess();

     }, [selectedImage, authors , creatingStatus]);

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

     const handleImageSelect = (image) => {
          setSelectedImage(image);
     };

     const handleCreatingbook = async () => {
          try {

               if (!selectedImage) {
                    console.error('No image selected');
                    return;
               }
               setCreatingStatus("loading")
               const formDataToSubmit = new FormData();
               formDataToSubmit.append('file', new File([selectedImage], imageName));
               formDataToSubmit.append('data', JSON.stringify(formData));
               const fetch_url = `${URL}books/createBook`;

               if (fetch_url) {
                    const response = await axios.post(fetch_url, formDataToSubmit, {
                         headers: {
                              'Content-Type': 'multipart/form-data',
                         },
                    });

                    if (response.status == 201) {
                         setCreatingStatus("valid")
                    }
               }


          } catch (error) {
               setCreatingStatus("unvalide")
               setStatusMessage(error.response.data.message)
          }
     };

     const handleAuthors = (e) => {
          if (e.target.value.length !== 0) {
               if (e.key === 'Enter') {
                    e.preventDefault();

                    const newAuthor = e.target.value.trim(); // Trim the input value
                    if (newAuthor) {
                         setAuthors([...authors, newAuthor]); // Add new author to the authors array
                         setAuthorInput(''); // Clear the input field
                    }
               }
          }
     };

     const handleDeleteAuthor = (index) => {
          const updatedAuthors = [...authors];
          updatedAuthors.splice(index, 1);
          setAuthors(updatedAuthors);
     };

     const handleCategorySelect = (categories) => {
          setFormData({
               ...formData,
               categories: categories,
          });
     };

     const handleSubmit = (e) => {
          e.preventDefault();
     };

     return (
          <>
               <div className='flex flex-col'>
                    <div className="text-zinc-800 text-[18px] font-extra font-Mulish">New book Creation</div>
                    <CurrentDateLogger />
               </div>
               <div className='flex flex-col space-y-4 mt-10'>
                    <div className='flex justify-start'>
                         <Link to="/maktabati_client_side/Adminpage/books" className="w-fit bg-yellow-400 rounded-md py-2 px-4 flex justify-center items-center space-x-2 cursor-pointer hover:shadow-button transition ease-out duration-150">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                              <div className="text-base font-bold font-['DM Sans'] text-white mr-2">Back</div>
                         </Link>
                    </div>
                    <div className='flex justify-center items-center mt-10 w-full'>
                         <div className='bg-white shadow-search rounded p-16 w-2/4'>
                              <form onSubmit={handleSubmit}>
                                   <div className="mb-4">
                                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="title">
                                             Book title
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" name="title" type="text" placeholder="Title..." onChange={handleChange} />
                                   </div>
                                   <div className="mb-4">
                                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="author">
                                             Book Author
                                        </label>
                                        <input
                                             className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                             id="author"
                                             type="text"
                                             placeholder="Author..."
                                             value={authorInput}
                                             onChange={(e) => setAuthorInput(e.target.value)}
                                             onKeyDown={handleAuthors} // Listen for Enter key press
                                        />
                                   </div>
                                   {authors.length !== 0 && (
                                        <div className="mb-4 w-full p-4 border rounded flex gap-3 flex-wrap justify-start items-start">
                                             {authors.map((author, index) => (
                                                  <div key={index} className='flex items-center py-0.5 px-2 bg-yellow-500 font-bold text-white rounded-sm text-lg ml-0 gap-2'>
                                                       {author}
                                                       <svg
                                                            onClick={() => handleDeleteAuthor(index)}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="opacity-50 cursor-pointer hover:opacity-100 transition ease-out duration-150"
                                                       >
                                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                                       </svg>
                                                  </div>
                                             ))}
                                        </div>
                                   )}
                                   <DropDown2 onSelect={handleCategorySelect} />

                                   <div className="mb-4 flex gap-4">
                                        <div>
                                             <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="copies">
                                                  Copies
                                             </label>
                                             <input className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="copies" type="number" name="copies" onChange={handleChange} />
                                        </div>
                                        <div className=' w-full'>
                                             <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="copies">
                                                  Type
                                             </label>
                                             <Dropdown name={"Type"} dropdownItems={["Books", "Novel", "Magazines ", "Newspapers"]} onSelect={handleTypeSelect} />
                                        </div>
                                   </div>
                                   <FileDrop onSelect={handleImageSelect} /> {/* FileDrop component to select image */}
                                   <div className="w-full">
                                        <button onClick={handleCreatingbook} className='w-full px-6 border-2 border-yellow-400 bg-yellow-400 text-white py-1.5 rounded-md hover:bg-transparent hover:text-yellow-400 font-semibold transition ease-out duration-250'>
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
                                                            <h3 className='text-red-500 font-Poppins font-regular'>You cannot create a new book because {statusMessage}</h3>
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
                                                            <h3 className='text-green-600 font-Poppins font-regular'>book created successfully</h3>
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

export const Dropdown = ({ name, dropdownItems, onSelect }) => {
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



