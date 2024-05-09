import React, { useState, useRef } from 'react';

const FileDrop = ({ onSelect }) => {
     const [file, setFile] = useState(null);
     const [isDragover, setIsDragover] = useState(false);
     const fileInputRef = useRef(null);

     const handleFileChange = (event) => {
          const uploadedFile = event.target.files[0];
          setFile(uploadedFile);
          onSelect(uploadedFile);
     };

     const dropHandler = (event) => {
          event.preventDefault();
          const droppedFile = event.dataTransfer.files[0];
          setFile(droppedFile);
          onSelect(droppedFile);
          setIsDragover(false);
     };

     const deleteFile = () => {
          setFile(null);
          onSelect(null);
     };

     const handleDragOver = (event) => {
          event.preventDefault();
          setIsDragover(true);
     };

     const handleDragLeave = () => {
          setIsDragover(false);
     };

     const handleBrowseClick = () => {
          // Trigger click on the file input element
          fileInputRef.current.click();
     };

     return (
          <div className="w-full border rounded flex items-center flex-col gap-3 p-5 mb-8">
               <div
                    className={`cursor-pointer border-dashed border-2 border-yellow-400 rounded bg-yellow-50 hover:bg-yellow-100 transition-all duration-200 w-full h-40 flex justify-center items-center ${isDragover ? 'bg-gray-400 border-gray-700' : ''
                         }`}
                    onDrop={dropHandler}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={handleBrowseClick}
               >
                    {file ? (
                         <div className="text-yellow-500 text-xl font-bold">{file.name}</div>
                    ) : (
                         <div className="flex flex-col items-center justify-center">
                              <p className="text-yellow-500 text-[16px] font-bold">Drag and Drop File Here</p>
                              <p className="text-yellow-500 text-[16px] font-bold">OR</p>
                              <p className="text-yellow-500 text-[16px] font-bold">Click to Browse</p>
                         </div>
                    )}
                    <input
                         type="file"
                         ref={fileInputRef}
                         className="hidden"
                         onChange={handleFileChange}
                         accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"
                    />
               </div>


               {file && (
                    <div className="w-full px-5 py-1 flex justify-between items-center border rounded">
                         <div>{file.name}</div>
                         <div
                              className="h-8 w-8 rounded-sm flex items-center justify-center cursor-pointer"
                              onClick={deleteFile}
                         >
                              <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   width="20"
                                   height="20"
                                   viewBox="0 0 24 24"
                                   fill="none"
                                   stroke="black"
                                   strokeWidth="2"
                                   strokeLinecap="round"
                                   strokeLinejoin="round"
                                   className="feather feather-trash-2 opacity-50 cursor-pointer hover:opacity-100 transition ease-out duration-150"
                              >
                                   <polyline points="3 6 5 6 21 6"></polyline>
                                   <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                   <line x1="10" y1="11" x2="10" y2="17"></line>
                                   <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                         </div>
                    </div>
               )}
          </div>
     );
};

export default FileDrop;
