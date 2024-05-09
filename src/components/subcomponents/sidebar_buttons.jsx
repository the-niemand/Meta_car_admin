import React from 'react';
import "./sidebar-buttons.css"
import { Link } from 'react-router-dom';

const Sidebar_buttons = ({ title, selected, onClick, icon }) => {
     const isSelected = title === selected;
     const buttonStyle = isSelected
          ? "md:pr-0 flex justify-start items-center space-x-2 cursor-pointer bg-yellow-400 rounded-lg pr-3 transition ease-out duration-200"
          : "md:pr-0 flex justify-start items-center space-x-2 cursor-pointer transition ease-out duration-200 hover:bg-amber-200 rounded-lg pr-3 hover:font-bold";
     const textStyle = isSelected ? "hidden lg:block text-white font-Mulish font-bold transition ease-out duration-200" : "hidden lg:block text-black font-Mulish transition ease-out duration-200";

     const iconWithColor = React.cloneElement(icon, {
          stroke: isSelected ? "white" : "currentColor",
          className: "h-6 w-6",
          strokeWidth: isSelected ? "2" : "1.5",
     });

     

     return (

          <Link to={title} className={buttonStyle} id='father' onClick={() => onClick(title)}>
               <div className="h-12 p-4 rounded-lg justify-center items-center inline-flex">
                    <div className="w-6 h-6 relative flex-col justify-start items-start flex">
                         {iconWithColor}
                    </div>
               </div>
               <div className={textStyle}>
                    {title}
               </div>
          </Link >

     );
};

export default Sidebar_buttons;