import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios library for making HTTP requests
import CurrentDateLogger from '../../../components/Date';
import addbook from '../../../assets/literature.png';
import { Link } from 'react-router-dom';
import Dropdown from '../../../components/subcomponents/dropdown';
import loadingSpinner from "../../../assets/loading.gif";
import Pagination from './Pagination';
import bin from '../../../assets/bin.png'


const Dash_Books = () => {
    const URL = 'https://meta-car-admin-backend.onrender.com/';

    const [searchFieldValue, setSearchFieldValue] = useState('');
    const [carsData, setCarsData] = useState(null);
    const [filteredCars, setFilteredCars] = useState(null);
    const [loading, setLoading] = useState(true);
    const [action, setAction] = useState(null);
    const [target, setTarget] = useState(null);
    const [Messagedeletion, setMessagedeletion] = useState('');
    const [test, setTest] = useState(true);

    const [sortBy, setSortby] = useState("none")
    const [type, setType] = useState("both")

    const [currentPage, setCurrentPage] = useState(1)
    const [postsperpage, setPostsperpage] = useState(8)

    const lastPostIndex = currentPage * postsperpage
    const firstPostIndex = lastPostIndex - postsperpage


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const fetchUrl = `${URL}car/fetchCars`;
                const response = await axios.get(fetchUrl);
                setCarsData(response.data.data);
                setFilteredCars(response.data.data)
                setLoading(false);

            } catch (error) {
                console.log('Error fetching books:', error);
                setLoading(false);
            }
        };
        fetchBooks();

    }, [URL]);

    useEffect(() => {
        const handleActionEvent = async () => {
            if (Messagedeletion === "Car has been deleted") {
                await new Promise(resolve => setTimeout(resolve, 800));
                handleClose()
            }
        };

        handleActionEvent();
    }, [Messagedeletion]);



    useEffect(() => {
        if (filteredCars) {
            let newFilteredCarModels = carsData;
            if (type !== "both") {
                newFilteredCarModels = newFilteredCarModels.filter(car =>
                    car.type.toLowerCase() === type.toLowerCase()
                );
            }
            setFilteredCars(newFilteredCarModels);
        }
    }, [type]);

    useEffect(() => {

        if (filteredCars && sortBy === "price") {
            const newFilteredCarModels = [...filteredCars].sort((a, b) => {
                return a.price - b.price;
            });
            setFilteredCars(newFilteredCarModels);
        }

        if (filteredCars && sortBy === "kilometers") {
            const newFilteredCarModels = [...filteredCars].sort((a, b) => {
                return a.kilometers - b.kilometers;
            });
            setFilteredCars(newFilteredCarModels);
        }
        if (filteredCars && sortBy === "none") {
            setFilteredCars(carsData);
        }

    }, [sortBy]);



    const handleClose = () => {
        setAction(null);
        setTarget(null);
        setMessagedeletion("")
    }

    const clearInput = () => {
        setSearchFieldValue('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleCarDeletion = (id) => {
        setAction("delete")
        setTarget(id)
    }

    const deleteCar = async (id) => {
        try {
            const fetchUrl = `${URL}car/deleteCarById/${id}`;
            const response = await axios.delete(fetchUrl);
            if (response) {
                setMessagedeletion("Car has been deleted")
                setCarsData(prevBooksData => prevBooksData.filter(carsData => carsData._id !== id));
            }

        } catch (error) {
            console.log('Error fetching books:', error);
            setMessagedeletion(error)
        }
    }

    const handleActions = () => {
        if (action == "delete") {
            return (
                <div className="flex flex-col gap-3 items-center justify-center">
                    <div className="absolute top-2 right-2" onClick={handleClose} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#282828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" opacity-50 cursor-pointer hover:opacity-100 transition ease-out duration-150"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>

                    </div>

                    <div className="flex flex-col gap-6 items-center">

                        <div className="flex flex-col gap-1 items-center" >
                            <div className="flex flex-col gap-2 items-center">
                                <img src={bin} width={"60"} alt="trash" />
                                <h1 className="text-[25px] font-Poppins ">Delete User</h1>
                            </div>

                            <div>
                                <h4 className="font-medium font-Poppins text-gray-600">This action can not be undone. Are you sure you want to delete this Car ? </h4>
                            </div>
                        </div>

                        <div
                            className="text-red-600 font-bold"
                            style={{ visibility: Messagedeletion ? 'visible' : 'hidden' }}
                        >
                            {Messagedeletion}
                        </div>


                    </div>



                    <div className="flex gap-3">
                        <button className="w-fit px-10 border-2 border-red-600 bg-red-600 text-white py-1.5   rounded-md hover:bg-transparent hover:text-red-600 font-semibold transition ease-out duration-250" onClick={() => { deleteCar(target) }}>
                            Delete
                        </button>
                        <button className="w-fit px-10 border-[2px] border-gray-400 bg-gray-200 text-gray-800 font-bold py-1.5   rounded-md hover:bg-gray-300 font-semibold transition ease-out duration-250" onClick={handleClose}>
                            cancel
                        </button>
                    </div>
                </div>
            )
        }

    };


    const searchCar = () => {
        if (searchFieldValue.length > 0) {
            const newCarsData = carsData.filter((car) => {
                if (car.title.toLowerCase().startsWith(searchFieldValue.toLowerCase())) {
                    return car
                }
            })
            setFilteredCars(newCarsData)
        }
    }

    const handleSearchFieldValue = (e) => {
        setSearchFieldValue(e.target.value)
        if (e.target.value === "") {
            setFilteredCars(carsData)
        }
    }

    const handlingSorting = (item) => {
        setSortby(item)
    }

    const handlingType = (item) => {
        setType(item)
    }


    return (

        <>

            {action && (
                <div className=" z-20 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center">
                    <div className="w-fit bg-white pt-14 pb-8 px-5 rounded flex flex-col items-center justify-center relative" >
                        {handleActions()}
                    </div>
                </div>
            )}

            <div className='flex flex-col'>
                <div className="text-zinc-800 text-[18px] font-extra font-Mulish">Cars management</div>
                <CurrentDateLogger />
            </div>
            <div className='flex flex-col space-y-4'>
                <div className='flex justify-end mb-4'>
                    <Link to={"Create_car"} className="w-fit bg-[#FF4C30] rounded-md py-2  px-4 flex justify-center items-center space-x-3 cursor-pointer hover:shadow-button transition ease-out duration-150">
                        <div className=" text-white text-base font-bold font-['DM Sans']">Add new Car</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </Link>
                </div>


                <div className='flex mt-10 space-x-4'>
                    <div className="w-full px-5 py-2 bg-white rounded-md shadow-search justify-start items-center flex space-x-4">
                        <div onClick={searchCar}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#282828"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-60 cursor-pointer hover:opacity-100 transition ease-out duration-150"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="text-base border-none outline-none focus:ring-0 w-full rounded-md"
                                value={searchFieldValue}
                                onChange={handleSearchFieldValue}
                            />
                        </div>
                        {searchFieldValue && (
                            <div onClick={clearInput}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#282828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 cursor-pointer hover:opacity-100 transition ease-out duration-150">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-fit px-6 border-2 border-[#FF4C30] bg-[#FF4C30] text-white py-1.5 rounded-md hover:bg-transparent hover:text-[#FF4C30] font-semibold transition ease-out duration-250"
                            onClick={searchCar}
                        >
                            Search
                        </button>
                    </div>

                </div>
                <div className='flex justify-between mt-10'>
                    <div className='flex space-x-3'>
                        <Dropdown onSelect={handlingSorting} name={"Sort by"} dropdownItems={["price", "kilometers", "none"]} />
                    </div>
                    <div>
                        <Dropdown onSelect={handlingType} name={"Type"} dropdownItems={["manual", "automatic", "both"]} />
                    </div>
                </div>
            </div>
            <div className='mt-20 flex flex-wrap item-start gap-8 justify-start'>
                {loading ? (
                    <div className='w-full h-full flex items-center justify-center mt-32'>
                        <div className='w-[180px] h-[180px] bg-white shadow-lg flex items-center justify-center'>
                            <img src={loadingSpinner} alt="Loading" width={100} />
                        </div>
                    </div>
                ) : (
                    <>
                        {filteredCars && filteredCars.slice(firstPostIndex, lastPostIndex).map((car, index) => (
                            <ModelCard
                                key={index}
                                modelMetre={car.kilometers}
                                modelImg={`${URL}${car.image}`}
                                modelName={car.title}
                                modelComp={car.brand}
                                modelTrans={car.type}
                                modelP={car.price}
                                modelDoor={car.size}
                                modelColor={car.color}
                                index={index}
                                modelId={car._id}
                                handleCarDeletion={handleCarDeletion}
                            />
                        ))}
                        <div className='w-full flex items-center justify-center'>
                            <Pagination totalPosts={carsData.length} postsPerPage={postsperpage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                        </div>
                    </>
                )}


            </div >
        </>
    );
}


function ModelCard({ handleCarDeletion, modelId, index, modelImg, modelName, modelComp, modelTrans, modelP, modelDoor, modelColor, modelMetre }) {

    return (
        <div key={index} className='bg-white w-[23%] rounded-xl shadow-md'>
            <img src={modelImg} className='object-cover h-[250px] rounded-t-xl w-full' alt="" />

            <div className='p-5 px-6 flex flex-col gap-3'>
                <span className='flex justify-between items-center'>
                    <h1 className='font-[700] text-[22px]'>{modelName}</h1>
                    <span className='font-[700] text-[16px]'> {modelP} <span className='font-[400] text-[16px]'>/day</span> </span>
                </span>

                <span className='flex justify-between'>kilometer<span className='flex gap-1 text-accent'>{modelMetre} km</span> </span>

                <span className='flex justify-between text-[18px] '>
                    <span className='font-[500] text-darkish flex gap-3 items-center'>{modelComp} </span>
                    <span className='flex gap-3 items-center text-darkish'>{modelDoor}  </span>
                </span>

                <span className='flex justify-between text-[18px] '>
                    <span className='font-[500] text-darkish  flex gap-3 items-center'>{modelTrans} </span>
                    <span className=' flex gap-3 items-center text-darkish'>{modelColor} </span>
                </span>
                <div className='flex gap-3'>
                    <button className='w-fit bg-blue-600 rounded-sm text-white text-[15px] px-3 py-2 font-bold opacity-70 hover:opacity-100 transition ease-out duration-200'>Update</button>
                    <button className='w-fit bg-red-600 rounded-sm text-white text-[15px] px-3 py-2 font-bold opacity-70 hover:opacity-100 transition ease-out duration-200' onClick={() => { handleCarDeletion(modelId) }}>delete</button>
                </div>
            </div>
        </div>
    )
}


export default Dash_Books;
