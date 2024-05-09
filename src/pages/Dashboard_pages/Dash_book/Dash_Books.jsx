import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios library for making HTTP requests
import CurrentDateLogger from '../../../components/Date';
import addbook from '../../../assets/literature.png';
import { Link } from 'react-router-dom';
import Dropdown from '../../../components/subcomponents/dropdown';
import loadingSpinner from "../../../assets/loading.gif";


const Dash_Books = () => {
    const URL = import.meta.env.APP_API_URL;

    const [searchFieldValue, setSearchFieldValue] = useState('');
    const [booksData, setBooksData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const fetchUrl = `${URL}books/fetchBooks`;
                const response = await axios.get(fetchUrl);
                setBooksData(response.data.data);
                setLoading(false);
                console.log(response.data.data)

            } catch (error) {
                console.log('Error fetching books:', error);
                setLoading(false);
            }
        };
        fetchBooks();

    }, [URL]);

    const clearInput = () => {
        setSearchFieldValue('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for handling search here
    };

    const handleBookDeletion = async (id) => {
        try {
            const fetchUrl = `${URL}books/deleteBookById/${id}`;
            const response = await axios.delete(fetchUrl);
            if (response) {
                alert("deletion succeeded")
                setBooksData(prevBooksData => prevBooksData.filter(book => book._id !== id));
                console.log(response);
            }
        } catch (error) {
            console.log('Error fetching books:', error);
            alert("deletion failed")
        }

    }

    return (
        <>
            <div className='flex flex-col'>
                <div className="text-zinc-800 text-[18px] font-extra font-Mulish">Books management</div>
                <CurrentDateLogger />
            </div>
            <div className='flex flex-col space-y-4'>
                <div className='flex justify-end mb-4'>
                    <Link to={"Create_Book"} className="w-fit bg-yellow-400 rounded-md py-2  px-4 flex justify-center items-center space-x-3 cursor-pointer hover:shadow-button transition ease-out duration-150">
                        <div className=" text-white text-base font-bold font-['DM Sans']">Add new book</div>
                        <img className="w-6 h-6" src={addbook} alt="Add book" />
                    </Link>
                </div>


                <div className='flex mt-10 space-x-4'>
                    <div className="w-full px-5 py-2 bg-white rounded-md shadow-search justify-start items-center flex space-x-4">
                        <div>
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
                                onChange={(e) => setSearchFieldValue(e.target.value)}
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
                            className="w-fit px-6 border-2 border-yellow-400 bg-yellow-400 text-white py-1.5 rounded-md hover:bg-transparent hover:text-yellow-400 font-semibold transition ease-out duration-250"
                        >
                            Search
                        </button>
                    </div>

                </div>
                <div className='flex justify-between mt-10'>
                    <div className='flex space-x-3'>
                        <Dropdown name={"Category"} dropdownItems={["Fantasy", "Horror", "Romance", "Historical fiction", "Science fiction", "Mystery", "Thriller", "Autobiography"]} />
                        <Dropdown name={"Sort by"} dropdownItems={["Release Date", "Price", "Trend"]} />
                    </div>
                    <div>
                        <Dropdown name={"Type"} dropdownItems={["Books", "Novel", "Magazines", "Newspapers"]} />
                    </div>
                </div>
            </div>
            <div className='mt-20 flex flex-wrap justify-between'>
                {loading ? (
                    <div className='w-full h-full flex items-center justify-center mt-32'>
                        <div className=' w-[180px] h-[180px]  bg-white shadow-lg flex items-center justify-center'>
                            <img src={loadingSpinner} alt="Loading" width={100} />
                        </div>
                    </div>
                ) : (
                    booksData && (
                        booksData.map((book, index) => (
                            <div key={index} className='bg-white shadow-search rounded flex justify-between overflow-hidden gap-4'>
                                <div className='w-[180px] h-[250px]'>
                                    <img className="object-cover rounded-tl rounded-bl w-full h-full" src={`${URL}${book.image}`} alt={book.title} />
                                </div>
                                <div className='w-fit flex flex-col justify-center items-start py-2 space-y-4 pr-8'>
                                    <div>
                                        <p className='w-fit text-black text-sm font-extra font-Poppins'>{book.title}</p>
                                    </div>
                                    <div className='w-fit text-justify text-black text-[11.10px] font-normal font-Poppins'>
                                        {book.type}
                                    </div>
                                    <div className='flex gap-2'>
                                        <button className='w-fit bg-yellow-400 rounded-sm text-white text-[12px] px-2 py-1 font-bold opacity-70 hover:opacity-100 transition ease-out duration-200'>Details</button>
                                        <button className='w-fit bg-red-600 rounded-sm text-white text-[12px] px-2 py-1 font-bold opacity-70 hover:opacity-100 transition ease-out duration-200' onClick={() => { handleBookDeletion(book._id) }}>delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                )}

            </div>
        </>
    );
}

export default Dash_Books;
