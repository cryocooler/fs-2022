import React from "react"

const Persons = ( {persons, appliedFilter, removeHandler} ) => {
    return (
        <div>
        {persons.filter(person => person.name.toLowerCase().includes(appliedFilter.toLowerCase())).map(person =>
           <div key = {person.id}> 
           {person.name} {person.number}
           <button onClick = {() => removeHandler(person.id)}>
               delete
           </button>
           </div>
            )}
      </div>
    )
}

export default Persons