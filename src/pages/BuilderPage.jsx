import { useState } from "react";

export default function BuilderPage() {
  const [fields, setFields] = useState([]);

  function addFields(){
    const newFields = {
      id : Date.now(),
      type : "text",
      label :"New Field",
    }
    setFields([...fields, newFields]);
  }

  function updateFieldLabel(id, newLabel){
    const updatedFields = fields.map((field) => {
      field.id === id? {...field, label: newLabel} : field
    });
    setFields(updatedFields);
  }

  return (
    <div>
      <h2>Form Builder</h2>
      <button onClick={addFields}>Add Field</button>

      {
        fields.map((field) => (
          <div key={field.id}>
            <input 
            type="text"
            value={field.label}
            onChange={(e)=>
              updateFieldLabel(field.id, e.target.value)
            } 
            />
            <input type="text" placeholder="User input here"/>
          </div>
        ))
      }

   </div>
  )
}