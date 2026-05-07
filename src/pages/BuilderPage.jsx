import { useState } from "react";
import FieldCard from "../components/FieldCard"

export default function BuilderPage() {
  const [fields, setFields] = useState([]);
  const [selectedFieldType, setSelectedFieldType] = useState("text")
  

  function addFields(){
    const newFields = {
      id : Date.now(),
      type : selectedFieldType,
      label : "", 
      required : false
    }
    setFields([...fields, newFields]);
  }
  
 

  function updateFieldLabel(id , newLabel){
    const updateFields = fields.map((field)=>(
      field.id === id ? {...field,label:newLabel} : field
    ))
    setFields(updateFields);
  }

  function deleteField(id){
    const fieldDelete = fields.filter((filed)=>(
      filed.id !== id 
    ))
    setFields(fieldDelete)
  }

  function updateRequired(id,checkedValue){
    const required = fields.map((field)=>(
      field.id === id ? {...field, required:checkedValue} : field
    ))
    setFields(required)
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
          /* settings section*/
          <FieldCard 
            key={field.id}
            id={field.id}
            required={field.required} 
            type={field.type} 
            label={field.label}
            updateFieldLabel={updateFieldLabel}
            updateRequired={updateRequired}
            deleteField = {deleteField}
            />
            
        )))
      }

   </div>
  )
}