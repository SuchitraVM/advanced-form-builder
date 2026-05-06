import { useState } from "react";

export default function BuilderPage() {
  const [fields, setFields] = useState([]);
  

  function addFields(){
    const newFields = {
      id : Date.now(),
      type : "text",
      label : "field", 
    }
    setFields([...fields, newFields]);
  }
  

  function updateFiledLabel(id , newLabel){
    const updateFileds = fields.map((field)=>(
      field.id === id ? {...field,label:newLabel} : field
    ))
    setFields(updateFileds);
  }

  return (
    <div>
      <h2>Form Builder</h2>
      <button onClick={addFields}>Add Field</button>
      {
        fields.map((field=>(
          <div key={field.id}>
            <input 
            type="text"
            value={field.label}
            onChange={(e)=>updateFiledLabel(field.id,e.target.value)}
            />
            <input type="text" placeholder="User input here"/>
          </div>
        )))
      }

   </div>
  )
}