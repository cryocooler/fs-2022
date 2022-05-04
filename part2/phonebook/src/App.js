import { useState } from 'react'

const Button = ({handleClick, text}) => {
    <Button onClick = {handleClick}>
    {text}
    </Button>
}

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

    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
      ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

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