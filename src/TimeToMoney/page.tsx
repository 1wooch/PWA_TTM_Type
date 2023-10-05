import React, { useState, useEffect } from "react";

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
    const savedData = localStorage.getItem("savedData");
    const fixedcostsLocal = localStorage.getItem("fixedcosts");
    if (savedData) {
      const savedDataJSON = JSON.parse(savedData);
      setHourlyPay(savedDataJSON.hourlyPay);
      setDayWorkTime(savedDataJSON.dayWorkTime);
      setSatTime(savedDataJSON.SatTime);
      setSunTime(savedDataJSON.sunTime);
      setTaxRatio(savedDataJSON.taxRatio);
      calculateTotalPay();
    }
    if(fixedcostsLocal){
      
      
        setFixedcosts(JSON.parse(fixedcostsLocal));
      
    }
  }, []);

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
    setHourlyPay(0);
    setDayWorkTime(0);
    setSatTime(0);
    setSunTime(0);
    setTaxRatio(0);
    setTotalPay(0);
};

  const calculateTotalPay = () => {
    // Calculate totalPay using formData
    const {
      dayWorkTime: dayWorkTimeNumber,
      SatTime: SatTimeNumber,
      sunTime: sunTimeNumber,
      taxRatio: taxRatioNumber,
      hourlyPay: hourlyPayNumber,
    } = formData;

    const totalPayNumber =
      ((dayWorkTimeNumber) * hourlyPayNumber +
        SatTimeNumber * (hourlyPayNumber * 1.25) +
        sunTimeNumber * (hourlyPayNumber * 1.5)) *
      (100 - taxRatioNumber) *
      0.01;

    setTotalPay(totalPayNumber);
  };

  ///change watcher///

  const HPhandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHourlyPay(e.target.value);
  };
  const MFWhandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDayWorkTime(e.target.value);
  };

  const SathandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSatTime(e.target.value);
  };
  const SunhandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSunTime(e.target.value);
  };

  const taxRatiohandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaxRatio(e.target.value);
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
    const updatedFixedcosts = [...fixedcosts];
    updatedFixedcosts[index] = {
      ...updatedFixedcosts[index],
      cost: parseFloat(e.target.value) || 0, // Parse the input value as a float or default to 0
    };
    setFixedcosts(updatedFixedcosts);
  };
 

  const addCost = () => {
    const newFixedCost: fixedcost = {
      name: "",
      cost: 0,
    };
  
    setFixedcosts([...fixedcosts, newFixedCost]);
  };
  ///change watcher///

  return (
    <div className="display">
      <div className="flex"> 
        <div className="inputArea w-2/5"> 
          <div className="Base Area">
              <p>Hourly Pay</p>
              <input
                  type="text"
                  placeholder="Enter your Hourly Pay"
                  value={hourlyPay === 0 ? "0" : String(hourlyPay)} // Convert to string for input field
                  onChange={HPhandleChange}
              />
              <p>Tax Ratio</p>
              <input
                  type="text"
                  placeholder="Enter your TaxRate"
                  value={taxRatio === 0 ? "0" : String(taxRatio)} // Convert to string for input field
                  onChange={taxRatiohandleChange}
              />
          </div>
          <div className="workingHour area">
              <p>M-F Working Hour</p>
              <input
              type="text"
              placeholder="M-F working hour"
              value={dayWorkTime === 0 ? "0" : String(dayWorkTime)} 
              onChange={MFWhandleChange}
              />
              <p>
                Saturday Working Hour
              </p>
              <input
              type="text"
              placeholder="Saturday working hour"
              value={SatTime === 0 ? "0" : String(SatTime)} 
              onChange={SathandleChange}
              />
              <p>
                Sunday Working Hour
              </p>
              <input
              type="text"
              placeholder="Sunday working hour"
              value={sunTime === 0 ? "0" : String(sunTime)} 
              onChange={SunhandleChange}
              />
          </div>
        </div>
        <div className="History w-3/5">
            <h1>Fixed Spend</h1>

            <div>
            {fixedcosts.map((row, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Name"
                  value={row.name}
                  onChange={(e) => handleCostNameChange(e, index)}
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={row.cost.toString()} // Assuming cost is the property name
                  onChange={(e) => handleCostChange(e, index)} // Updated event handler name
                />
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            ))}
              <button onClick={addCost}>+</button>
            </div>
        </div>
      </div> 
      <div className="TotalBudget">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={clearFunc}>Clear</button>
          {/* <button onClick={() => handleSave()}>Save</button> */}

          <div className="">Stored Value: {totalPay}</div> 
      </div>
    </div>
  );
};

export default TTM;
/// Add weekly value and store the calculate value with time in local stroage separately and show them in the right side with time stamp.
/// Add a clear button to clear the local storage and reset the value to 0
/// change the name of app and icon for web app
/// make it work without internet
