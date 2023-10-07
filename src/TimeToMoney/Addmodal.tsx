// ModalContent.tsx

import React, { useState } from 'react';

interface ModalContentProps {
  addCost: (payname:string , costNum:number, payPeriodStr:string) => void;
}

const ModalContent: React.FC<ModalContentProps> = ({ addCost }) => {
  const [payName, setPayName] = useState('');
  const [costNum, setCostNum] = useState(0);

  let payPeriodStr="";
  const [selectedOption, setSelectedOption] = useState<string>('');
  const handleClose = () => {
    addCost(payName, costNum, payPeriodStr);
  };

  

  ///Drop Down///
  const [isOpen, setIsOpen] = useState(false);
  const handleDropdownSelect = (option: string) => {
    setSelectedOption(option);
    closeDropdown(); // Close the dropdown after selecting an option
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const dropdownItems = [
    'Weekly',
    'Fortnightly',
    'Monthly',
    '3 Monthly',
    'Yearly',

    // Add more options as needed
  ];
  if (selectedOption) {
    payPeriodStr = selectedOption;
  }
  ///Drop Down///
   return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-container">
        <div className="modal-content">
          <h1 className="text-2xl font-bold mb-4">Add Cost</h1>
          <p>{selectedOption}</p>
          <div>
            <input className="w-1/3 shadow appearance-none border rounded"
                    type="text"
                    placeholder="Name"
                    value={payName}
                    onChange={(e) => setPayName(e.target.value)} // Add onChange handler

            />
            <input className="w-1/3 shadow appearance-none border rounded"
                    type="text"
                    placeholder="Cost"
                    value={costNum}
                    onChange={(e) => setCostNum(Number(e.target.value))} // Add onChange handler

            />
            
          {/* ... */}

          <div className="relative inline-block text-left">
            <div>
              <button
                onClick={toggleDropdown}
                type="button"
                className="bg-blue-500 text-white active:bg-blue-600 font-semibold text-sm px-4 py-2 rounded outline-none focus:outline-none"
              >
                Pay Period
              </button>
            </div>
            {isOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="py-1">
                  {dropdownItems.map((item, index) => (
                    <a
                    key={index}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleDropdownSelect(item)} 
                  >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            )}
            </div>

          {/* Drop Down */}

          
          </div>
          
        </div>
        <div className="modal-actions">
          <button
            onClick={handleClose}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Close
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
