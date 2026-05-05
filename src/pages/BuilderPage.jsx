import { useState } from "react";

export default function BuilderPage() {
  const [fileds, setFields] = useState([]);

  function addFileds(){
    const newFileds = {
      id : Date.now(),
      type : "text",
      label :"New Filed",
    }
    setFields([...fileds, newFileds]);
  }

  return (
    <div>
      <h2>Form Builder</h2>
      <button onClick={addFileds}>Add Filed</button>

      {
        fileds.map((filed) => (
          <div key={filed.id}>
            <label>{filed.label}</label>
            <input type="text" />
          </div>
        ))
      }

   </div>
  )
}