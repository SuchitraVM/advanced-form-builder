import { useState } from "react";

export default function BuilderPage() {
  const [fields, setFields] = useState([]);
  const [selectedFieldType, setSelectedFieldType] = useState("text")
  

  function addFields(){
    const newFields = {
      id : Date.now(),
      type : selectedFieldType,
      label : "", 
    }
    setFields([...fields, newFields]);
  }
  
 

  function updateFieldLabel(id , newLabel){
    const updateFields = fields.map((field)=>(
      field.id === id ? {...field,label:newLabel} : field
    ))
    setFields(updateFields);
  }

  //  function updateFieldType(id, newType){
  //   const updateType = fields.map((field)=>(
  //     filed.id===id ? {...field, type:newType} : field
  //   ))
  //   setSelectedFieldType(newType)
  // }

  return (
    <div>
      <h2>Form Builder</h2>
      <button onClick={addFields}>Add Field</button>
      <select value={selectedFieldType} onChange={(e)=>setSelectedFieldType(e.target.value)}>
        <option value="text">text</option>
        <option value="checkbox">checkbox</option>
      </select>
      {
        fields.map((field=>(
          field.type === "text" ?
          <div key={field.id}>
            <input 
            type={field.type}
            value={field.label}
            onChange={(e)=>updateFieldLabel(field.id,e.target.value)}
            />
            <input type="text" placeholder="User input here"/>
          </div> :
          <div key={field.id}>
            <label>
            <input 
            type={field.type}
            />{field.label}
            </label>
          </div>
      
        )))
      }

   </div>
  )
}