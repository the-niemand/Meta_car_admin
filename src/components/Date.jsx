import React, { useState, useEffect } from 'react';

const CurrentDateLogger = () => {
     // State to hold the formatted date
     const [formattedDate, setFormattedDate] = useState('');

     // Function to format the current date
     const formatDate = () => {
          const currentDate = new Date();
          const months = [
               "January", "February", "March", "April", "May", "June",
               "July", "August", "September", "October", "November", "December"
          ];
          const month = months[currentDate.getMonth()];
          const day = String(currentDate.getDate()).padStart(2, '0');
          const year = currentDate.getFullYear();
          return `${month} ${day}, ${year}`;
     };

     // Use useEffect to set the formatted date when the component mounts
     useEffect(() => {
          const formatted = formatDate();
          setFormattedDate(formatted);
     }, []); // Empty dependency array means this effect runs only once on mount

     // Render the formatted date inside a paragraph element
     return (
          <div className='text-zinc-500 text-[14px] font-[400] font-Mulish'>
               {formattedDate}
          </div>
     );
};

export default CurrentDateLogger;
