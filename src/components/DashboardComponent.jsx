import React, { useState, useEffect } from "react";
import HeaderComponent from "./HeaderComponent";

export default function DashboardComponent() {
  const [localStorageData, setLocalStorageData] = useState([]);

  // Function to retrieve all data from local storage
  useEffect(() => {
    const dataFromLocalStorage = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      dataFromLocalStorage.push({ key, value });
    }
    setLocalStorageData(dataFromLocalStorage);
  }, []);

  return (
    <>
      <HeaderComponent />
      <div>
        <h2>Content of Local Storage</h2>
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {localStorageData.map((item, index) => (
              <tr key={index}>
                <td>{item.key}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
