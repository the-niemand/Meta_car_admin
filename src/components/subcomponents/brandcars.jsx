import React, { useEffect, useState } from 'react';

const Brandcars = ({ onSelect, Brandvalue }) => {
     const carsBrand = [
          "Abarth",
          "Alfa Romeo",
          "Aston Martin",
          "Audi",
          "Bentley",
          "BMW",
          "Bugatti",
          "Cadillac",
          "Chevrolet",
          "Chrysler",
          "Citroën",
          "Dacia",
          "Daewoo",
          "Daihatsu",
          "Dodge",
          "Donkervoort",
          "DS",
          "Ferrari",
          "Fiat",
          "Fisker",
          "Ford",
          "Honda",
          "Hummer",
          "Hyundai",
          "Infiniti",
          "Iveco",
          "Jaguar",
          "Jeep",
          "Kia",
          "KTM",
          "Lada",
          "Lamborghini",
          "Lancia",
          "Land Rover",
          "Landwind",
          "Lexus",
          "Lotus",
          "Maserati",
          "Maybach",
          "Mazda",
          "McLaren",
          "Mercedes",
          "Mercedes-Benz",
          "MG",
          "Mini",
          "Mitsubishi",
          "Morgan",
          "Nissan",
          "Opel",
          "Peugeot",
          "Porsche",
          "Renault",
          "Rolls-Royce",
          "Rover",
          "Saab",
          "Seat",
          "Skoda",
          "Smart",
          "SsangYong",
          "Subaru",
          "Suzuki",
          "Tesla",
          "Toyota",
          "Volkswagen",
          "Volvo"
     ];

     const [brand, setBrand] = useState(Brandvalue || "");
     const [isOpen, setIsOpen] = useState(false);


     const handleChange = (e) => {
          const value = e.target.value;
          setBrand(value);
          if (value.length > 0) {
               setIsOpen(true);
          } else {
               setIsOpen(false);
          }
     };

     const filteredBrands = () => {
          if (brand) {
               return carsBrand.filter(item =>
                    item.toLowerCase().startsWith(brand.toLowerCase())
               );
          }
          return [];
     };



     return (
          <div className='flex flex-col gap-2 mb-4'>
               <div>
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="Brand">
                         Car Brand
                    </label>
                    <input className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Brand" name="Brand" type="text" placeholder="Brand..." onChange={handleChange} value={brand} />
               </div>

               <div className={` ${brand && isOpen ? "block" : "hidden"} max-h-40 overflow-y-scroll text-zinc-800 p-3 rounded border mt-2 flex space-x-4`}>
                    <ul className="w-full">
                         {filteredBrands().map((item, index) => (
                              <li
                                   className="cursor-pointer hover:bg-gray-200 rounded py-2 px-4 truncate w-full"
                                   key={index}
                                   onClick={() => {
                                        setBrand(item);
                                        onSelect(item);
                                        setIsOpen(false);
                                   }}
                              >
                                   {item}
                              </li>
                         ))}

                         <li className="cursor-pointer hover:bg-gray-200 rounded py-2 px-4 truncate w-full" onClick={() => {
                              setBrand("other");
                              onSelect("other");
                              setIsOpen(false);
                         }}>
                              Other...
                         </li>

                    </ul>
               </div>

          </div>
     );
};

export default Brandcars;
