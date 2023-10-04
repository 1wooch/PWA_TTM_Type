import React, {useState,useEffect} from "react";


const TTM: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [storedValue, setStoredValue] = useState<string | null>(null);
  
    // Retrieve the stored value from local storage when the component mounts
    useEffect(() => {
      const storedItem = localStorage.getItem('storedValue');
      if (storedItem) {
        setStoredValue(storedItem);
      }
    }, []);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };
  
    const handleSubmit = () => {
      // Store the input value in local storage
      localStorage.setItem('storedValue', inputValue);
      setStoredValue(inputValue);
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Enter text"
          value={inputValue}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit</button>
        {storedValue && <div>Stored Value: {storedValue}</div>}
      </div>
    );
  };
export default TTM;