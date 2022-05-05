import React from "react"

const PersonForm = ({ formTrigger, inputName, inputNumber, personChange, numberChange}) => {

    return(
      <div>
        <form onSubmit = {formTrigger} >
          <div>
            name: <input value = {inputName} onChange = {personChange}/>
          </div>
          <div>
            number: <input value = {inputNumber} onChange = {numberChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
  
    )
  }

  export default PersonForm