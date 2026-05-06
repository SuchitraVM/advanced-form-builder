import { useState } from "react";

export default function BuilderPage() {
  // const [fields, setFields] = useState([]);
  const [fieldLabel, setFieldLabel] = useState("");

  function handleLabelChange(e){
    setFieldLabel(e.target.value);
  }

  // function addFields(){
  //   const newFields = {
  //     id : Date.now(),
  //     type : "text",
  //     label :"New Field",
  //   }
  //   setFields([...fields, newFields]);
  // }

  // function updateFieldLabel(id, newLabel){
  //   const updatedFields = fields.map((field) => {
  //     field.id === id? {...field, label: newLabel} : field
  //   });
  //   setFields(updatedFields);
  // }

  return (
    <div>
      <h2>Form Builder</h2>
      <button>Add Field</button>
      <div>
      <label >Field Label</label>
      <input type="text" placeholder="Enter text here" value={fieldLabel} onChange={handleLabelChange}/>
      <label >Preview Input</label>
      <input type="text" placeholder="User input here" value={fieldLabel}/>
      </div>
      {/* 
        fields.map((field) => (
          <div key={field.id}>
            <input 
            type="text"
            value={<input value={field.label}/>}
            onChange={(e)=>
              updateFieldLabel(field.id, e.target.value)
            } 
            />
            <input type="text" placeholder="User input here"/>
          </div>
        ))
      } */}

   </div>
  )
}