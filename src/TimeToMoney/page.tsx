import React, { useState, useEffect } from "react";
import ModalContent from "./Addmodal";
import WarningModal from "./Warning";


const TTM: React.FC = () => {

  ///EARINING MONEY VALUES///
  const [hourlyPay, setHourlyPay] = useState<number | string>("0");
  const [dayWorkTime, setDayWorkTime] = useState<number | string>("0");
  const [SatTime, setSatTime] = useState<number | string>("0");
  const [sunTime, setSunTime] = useState<number | string>("0");
  const [totalPay, setTotalPay] = useState<number | string>("0");
  const [taxRatio, setTaxRatio] = useState<number | string>("0");
  ///EARINING MONEY VALUES///


  ///Fixed cost Values/// 

  interface fixedcost {
    name?: string;
    cost: number;
    payPeriod?: string;
  }
  
  
  const [fixedcosts, setFixedcosts] = useState<fixedcost[]>([]); // Initialize fixedcosts as a state variable

  ///Fixed cost Values///
  // Define a state variable to store all form data
  const [formData, setFormData] = useState({
    hourlyPay: 0,
    taxRatio: 0,
    dayWorkTime: 0,
    SatTime: 0,
    sunTime: 0,
  });

  // Check for and retrieve data from localStorage when the component mounts
  useEffect(() => {
    getDataFromLocalStorage();
    calculateTotalPay();
  }, []);

//get data from local Storage and set it to the state

const getDataFromLocalStorage=()=>{
  const savedData = localStorage.getItem("savedData");
  const fixedcostsLocal = localStorage.getItem("fixedcosts");
  
  if (savedData) {
    const savedDataJSON = JSON.parse(savedData);
    setHourlyPay(savedDataJSON.hourlyPay);
    setDayWorkTime(savedDataJSON.dayWorkTime);
    setSatTime(savedDataJSON.SatTime);
    setSunTime(savedDataJSON.sunTime);
    setTaxRatio(savedDataJSON.taxRatio);
    if(fixedcostsLocal){
      setFixedcosts(JSON.parse(fixedcostsLocal));
    }
  }
}

  // Update formData state when any input changes
  useEffect(() => {
    setFormData({
      hourlyPay: Number(hourlyPay),
      taxRatio: Number(taxRatio),
      dayWorkTime: Number(dayWorkTime),
      SatTime: Number(SatTime),
      sunTime: Number(sunTime),
    });
  }, [hourlyPay, taxRatio, dayWorkTime, SatTime, sunTime]);


///Save functions///
  const handleSubmit = () => {
    //localStorage.clear();
    calculateTotalPay();
    handleCostSave();
    localStorage.setItem("savedData", JSON.stringify(formData));
  };

  const handleCostSave = () => { //saving the costs in local storage
    localStorage.setItem("fixedcosts", JSON.stringify(fixedcosts));
  };

///Save functions///

///Delete functions///
  const handleDelete = (indexToDelete: number) => {
    const updatedFixedcosts = fixedcosts.filter((_, index) => index !== indexToDelete);
    // handleCostSave();
    localStorage.removeItem("fixedcosts");
    localStorage.setItem("fixedcosts", JSON.stringify(updatedFixedcosts));
    setFixedcosts(updatedFixedcosts);

  };

///Delete functions///


  const clearFunc = () => {
    localStorage.setItem("savedData", JSON.stringify(formData));
    localStorage.setItem("fixedcosts", JSON.stringify(fixedcosts));

    setHourlyPay(0);
    setDayWorkTime(0);
    setSatTime(0);
    setSunTime(0);
    setTaxRatio(0);
    setTotalPay(0);
    clearFixedCost();
    setUndo(true);
};

const clearHours=()=>{
  setDayWorkTime(0);
  setSatTime(0);
  setSunTime(0);

};

const clearTaxandRate=()=>{
  setTaxRatio(0);
  setHourlyPay(0);
}

const clearFixedCost=()=>{
  setFixedcosts([]);
}

  const calculateTotalPay = () => {
    setUndo(false);
    // Calculate totalPay using formData
    const {
      dayWorkTime: dayWorkTimeNumber,
      SatTime: SatTimeNumber,
      sunTime: sunTimeNumber,
      taxRatio: taxRatioNumber,
      hourlyPay: hourlyPayNumber,
    } = formData;
    let TotalSpent=0;

    for (let i = 0; i < fixedcosts.length; i++) {
      let paydevider=0;
      switch (fixedcosts[i].payPeriod) {
        case 'Weekly':
          paydevider=1;
          break;

        case 'Fortnightly':
          paydevider=2;
          break;

        case 'Monthly':
          paydevider=4;
          break;

        case '3 Monthly':
          paydevider=13;
          break;

        case 'Yearly':
          paydevider=52;
          break;

        default:
          break;
      }
      TotalSpent+=fixedcosts[i].cost/paydevider;
    }
    let totalPayNumber =
      ((dayWorkTimeNumber) * hourlyPayNumber +
        SatTimeNumber * (hourlyPayNumber * 1.25) +
        sunTimeNumber * (hourlyPayNumber * 1.5)) *
      (100 - taxRatioNumber) *
      0.01;
      totalPayNumber-=TotalSpent;

    setTotalPay(totalPayNumber.toFixed(2));
  };

  ///change watcher///

  const HPhandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!isNaN(+e.target.value)){
      setHourlyPay(e.target.value);
    }
  };
  const MFWhandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!isNaN(+e.target.value)){

    setDayWorkTime(e.target.value);
    }
  };

  const SathandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!isNaN(+e.target.value)){
    setSatTime(e.target.value);
    }
  };
  const SunhandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!isNaN(+e.target.value)){
    setSunTime(e.target.value);
    }
  };

  const taxRatiohandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    if(!isNaN(+e.target.value)){
      setTaxRatio(e.target.value);
    }

    
  };
  ///cost change///
  const handleCostNameChange = (e: React.ChangeEvent<HTMLInputElement>,index:number) => {
    const updatedFixedcosts = [...fixedcosts];
    updatedFixedcosts[index] = {
      ...updatedFixedcosts[index],
      name: e.target.value,
    };
    setFixedcosts(updatedFixedcosts);
  };
  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if(!isNaN(+e.target.value)){

    const updatedFixedcosts = [...fixedcosts];
    updatedFixedcosts[index] = {
      ...updatedFixedcosts[index],
      cost: parseFloat(e.target.value) || 0, // Parse the input value as a float or default to 0
    };
    setFixedcosts(updatedFixedcosts);
  }
  };
 

  const addCost = (payname:string , costNum:number, payPeriodStr:string) => {
    console.log(!isNaN(+costNum)); // true if its a number, false if not

    const newFixedCost: fixedcost = {
      name: payname,
      cost: costNum,
      payPeriod: payPeriodStr,
    };
  
    setFixedcosts([...fixedcosts, newFixedCost]);
    closeModal();
  };
  ///change watcher///

  ///ADDModal///
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  ///AddModal///

  ///WarningModal///

  const [warningOpen,setWorningOpen]=useState(false);
  const [warningContentExport,setWarningContentExport]=useState("");

  const openWarningModal=()=>setWorningOpen(true);
  const closeWarningModal=()=>setWorningOpen(false);

  

  ///WarningModal///

//Undo button//

const [Undo,  setUndo] = useState(false);
const UndoClick=()=>{
  getDataFromLocalStorage();
  setUndo(false);
}


//Undo button//



  return (
    <div className="display px-6">
      <div className="flex "> 
        <div className="inputArea w-1/2 mr-2"> 
        <div className="flex">
          <h1 className="w-1/2">Tax & Pay Rate</h1>
          <button  className="mb-3 px-3 rounded bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-blue-500 hover:to-purple-500 ..." onClick={clearTaxandRate}>Clear Tax and Hourly Pay</button>
        </div>
       

          <div className="mb-4 border-solid border-2 border-black ">
              <p>Hourly Pay</p>
              <input className="w-2/3 shadow appearance-none border rounded"
                  type="text"
                  placeholder="Enter your Hourly Pay"
                  value={hourlyPay === 0 ? "0" : String(hourlyPay)} // Convert to string for input field
                  onChange={HPhandleChange}
              />
              <p>Tax Ratio</p>
              <input className="mb-4 w-2/3 shadow appearance-none border rounded"
                  type="text"
                  placeholder="Enter your TaxRate"
                  value={taxRatio === 0 ? "0" : String(taxRatio)} // Convert to string for input field
                  onChange={taxRatiohandleChange}
              />
          </div>
          <h1>Working Hour</h1> 
          <button  className="mb-3 px-3 rounded bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-blue-500 hover:to-purple-500 ..." onClick={clearHours}>Clear Working Hours</button>

          <div className="border-solid border-2 border-black">
              <p>M-F Working</p>
              <input className="w-2/3 shadow appearance-none border rounded"
              type="text"
              placeholder="M-F working hour"
              value={dayWorkTime === 0 ? "0" : String(dayWorkTime)} 
              onChange={MFWhandleChange}
              />
              <p>
                Saturday Working
              </p>
              <input className="w-2/3 shadow appearance-none border rounded"
              type="text"
              placeholder="Saturday working hour"
              value={SatTime === 0 ? "0" : String(SatTime)} 
              onChange={SathandleChange}
              />
              <p>
                Sunday Working
              </p>
              <input className="mb-4 w-2/3 shadow appearance-none border rounded"
              type="text"
              placeholder="Sunday working hour"
              value={sunTime === 0 ? "0" : String(sunTime)} 
              onChange={SunhandleChange}
              />
          </div>
        {warningOpen && <WarningModal warningContent={warningContentExport} />}
        </div>
        <div className="History w-1/2 ">
            <h1>Fixed Spend</h1>
            <button  className="mb-3 px-3 rounded bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-blue-500 hover:to-purple-500 ..." onClick={clearFixedCost}>Clear Fixed Cost</button>

            <div>
            {fixedcosts.map((row, index) => (
              <div key={index}>
                <input className="w-1/3 shadow appearance-none border rounded"
                  type="text"
                  placeholder="Name"
                  value={row.name}
                  onChange={(e) => handleCostNameChange(e, index)}
                />
                <input className="w-1/3 shadow appearance-none border rounded"
                  type="number"
                  placeholder="Value"
                  value={row.cost.toString()} 
                  onChange={(e) => handleCostChange(e, index)} 
                />
                {/* <p>
                  {row.payPeriod}
                </p> */}
                <button className="w-1/3 shadow appearance-none border rounded" onClick={() => handleDelete(index)}>Delete</button>
              </div>
            ))}
              <button
                onClick={openModal}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  +
                </button>
                {isOpen && <ModalContent  addCost={addCost} />}
            </div>
        </div>
      </div> 
        <div className="TotalBudget">
            <button className="border-r-9 p-1 mt-4 rounded bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ..." onClick={handleSubmit}>
              Calculate
            </button>
            <button  className="mb-3 px-3 rounded bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-blue-500 hover:to-purple-500 ..." onClick={clearFunc}>Clear All</button>
            {Undo && (
              <button className="mb-3 px-3 rounded bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-blue-500 hover:to-purple-500 ..." onClick={UndoClick}>UNDO CLEAR</button>
            )}

            {/* <button onClick={() => handleSave()}>Save</button> */}

            <div className="">This Week's Budget: {totalPay}</div> 
        </div>
      <div>
    </div>
      
    </div>
  );
};

export default TTM;

/// TODO LIST?///

///PRIORITIES///

///INPUT value check  e.g. whether the user input string in number value  

/// need to check before it calculate whether there is any value in fixed cost is 0 or name is empty and if it is empty it should not calculate it
// -> if this week money <100 then number should be in red color, <0 display no money, >100 display in green color and >500 will show rich meme


///MINOR///

/// Add weekly value and store the calculate value with time in local stroage separately and show them in the right side with time stamp.
/// Add a clear button to clear the local storage and reset the value to 0 -> only exist for pay and tax but need to add for fixed cost (10/08)
/// Deputy API works only return ics value>? -> get deputy API and run it everytime application or webpage open. After that check and put only this week's work time and input the value.

/// additional modal for edit?




/* Done List
/// some reason after it pushed and updated it doesn't update on the web app but it does update on the web app -> work now but it happens after it updates
/// change the name of app and icon for web app -> done
/// make it work without internet -> done
/// add modal for add fixed cost? -> how to make modal in typescript react with tailwin? 
/// add undo button -> done 10/10/23
/// add clear button -> done 10/10/23
  /* e.g.  
  add name of the cost
  add cost 
  add whether it is weekly montly fornight and 3month
  and depend on choose it will deduct it weekly pay
  */
