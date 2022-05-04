import axios from 'axios'
import { useState, useEffect } from 'react'


const Persons = ( {persons, appliedFilter} ) => {
    return (
        <div>
        {persons.filter(person => person.name.toLowerCase().includes(appliedFilter.toLowerCase())).map(person =>
           <div key = {person.name}> 
           {person.name} {person.number}
           </div>
            )}
      </div>
    )
}

const PersonForm = ({ formTrigger, inputName, inputNumber, personChange, numberChange, handleExisting}) => {

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

const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    useEffect(() => {
        console.log('effect')
        axios
        .get('http://localhost:3001/persons')
        .then(response => {
            console.log('Promise fulfilled')
            setPersons(response.data)
        })

    }, [])

    const handleNameChange = (event) => {
        event.preventDefault()
        console.log('form input', event.target.value);
        setNewName(event.target.value)
        console.log('current name', newName)
        
        }

    const handleNumberChange = (event) => {
        event.preventDefault()
        setNewNumber(event.target.value)
        }

    const handleFilterChange = (event) => {
        event.preventDefault()
        setNewFilter(event.target.value)


        }

    const addPerson = (event) => {
        event.preventDefault()

        const newPerson = {
            name: newName,
            number: newNumber
            }
        if (persons.map(p => p.name).includes(newName)) {
            window.alert(`${newName} is already added to phonebook`) 
        } else {
        const updatedPersons = {...persons}
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        console.log(persons)
        console.log('person type', typeof(persons))
            }
        }

  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with <input onChange = {handleFilterChange} />
      </div>
      <br></br>
      <h3>Add a new</h3>
      <PersonForm formTrigger={addPerson} 
                  inputName={newName}
                  inputNumber={newNumber}
                  personChange={handleNameChange}
                  numberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons = {persons} appliedFilter = {newFilter} />
  
    </div>
  )
}

export default App