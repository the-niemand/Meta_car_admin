import React, { useEffect, useState } from "react";

const DropDown2 = ({ onSelect }) => {
     const [isOpen, setIsOpen] = useState(false);
     const [selectedItems, setSelectedItems] = useState([]);

     const list = [
          "Fantasy",
          "Horror",
          "Romance",
          "Historical fiction",
          "Science fiction",
          "Mystery",
          "Thriller",
          "Autobiography"
     ];


     useEffect(() => {
          onSelect(selectedItems)
     }, [selectedItems])



     const handleDivClick = (item) => {
          if (selectedItems.includes(item)) {
               setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
          } else {
               setSelectedItems([...selectedItems, item])
          }
     };

     return (
          <div className="mb-4 w-full flex flex-col gap-3">
               <label className="block text-gray-700 text-lg font-bold" htmlFor="copies">
                    Categories
               </label>

               <div
                    className="relative cursor-pointer w-full p-3 border rounded flex gap-3 flex-wrap justify-start items-center"
                    onClick={() => setIsOpen(!isOpen)}
               >

                    {selectedItems.length !== 0 ? (
                         selectedItems.map((selectedItem) => (
                              <div key={selectedItem} className="bg-gray-200 rounded py-2 px-4">
                                   {selectedItem}
                              </div>
                         ))
                    ) : (
                         <p className="text-black opacity-50">Select category(ies)...</p>
                    )}

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
                         className={`absolute right-3 feather feather-chevron-down pt-1 ${isOpen ? "rotate-180 pt-0" : ""
                              } transition ease-out duration-200 ml-2`}
                    >
                         <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
               </div>



               {isOpen && (
                    <div className="w-full p-4 border rounded flex flex-col gap-3 items-start h-40 overflow-y-auto">
                         {list.map((item) => (
                              <div
                                   key={item}

                                   className={`w-full cursor-pointer ${selectedItems.includes(item) && "bg-gray-200"} hover:bg-gray-200 rounded py-2 px-4`}
                                   onClick={() => handleDivClick(item)}
                              >
                                   {item}
                              </div>
                         ))}
                    </div>
               )}
          </div>
     );
};

export default DropDown2;
