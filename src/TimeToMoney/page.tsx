import React, { useState, useEffect } from "react";

const TTM: React.FC = () => {
  const [hourlyPay, setHourlyPay] = useState<number | string>("0");
  const [dayWorkTime, setDayWorkTime] = useState<number | string>("0");
  const [SatTime, setSatTime] = useState<number | string>("0");
  const [sunTime, setSunTime] = useState<number | string>("0");
  const [totalPay, setTotalPay] = useState<number | string>("0");
  const [taxRatio, setTaxRatio] = useState<number | string>("0");

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
    if (savedData) {
      const savedDataJSON = JSON.parse(savedData);
      setHourlyPay(savedDataJSON.hourlyPay);
      setDayWorkTime(savedDataJSON.dayWorkTime);
      setSatTime(savedDataJSON.SatTime);
      setSunTime(savedDataJSON.sunTime);
      setTaxRatio(savedDataJSON.taxRatio);
      calculateTotalPay();
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

  const handleSubmit = () => {
    calculateTotalPay();
    localStorage.setItem("savedData", JSON.stringify(formData));
  };
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
    ///change watcher///

  return (
    <div>
        <div>
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
        <div>
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
     
      <button onClick={handleSubmit}>Submit</button><button onClick={clearFunc}>Clear</button>
      
      
        <div>Stored Value: {totalPay}</div> 
      
      

    </div>
  );
};

export default TTM;
/// Add weekly value and store the calculate value with time in local stroage separately and show them in the right side with time stamp.
/// Add a clear button to clear the local storage and reset the value to 0
/// change the name of app and icon for web app
/// make it work without internet
