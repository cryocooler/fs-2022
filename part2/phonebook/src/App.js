import axios from 'axios'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'





const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    useEffect(() => {
        console.log('effect')
        personService
        .getAll()
        .then(initialPersons => 
          setPersons(initialPersons))
       
    }, [])

    const handleNameChange = (event) => {
        event.preventDefault()
        setNewName(event.target.value)
        
        }

    const handleNumberChange = (event) => {
        event.preventDefault()
        setNewNumber(event.target.value)
        }

    const handleFilterChange = (event) => {
        event.preventDefault()
        setNewFilter(event.target.value)
        }

        const removePerson = (id) => {
          console.log('person id', persons.filter(person => person.id === id)[0].name)
          if (window.confirm(`Delete  ${persons.filter(person => person.id === id)[0].name} ?`) )
          
          personService
          .remove(id)
          .then(response => {
            console.log(response)
            setPersons(persons.filter(person => person.id !== id))
            
          })
        }

    const addPerson = (event) => {
        event.preventDefault()

        const newPerson = {
            name: newName,
            number: newNumber
            }
        if (persons.map(p => p.name).includes(newName)) {
            window.confirm(`${newName} is already added to phonebook, do you want to replace the number with a new one?`)
            const updatedPerson = persons.find(p => p.name === newName)
            const changedNumber = {...updatedPerson, number: newNumber}

            personService
            .update(updatedPerson.id, changedNumber)
            .then(response => {setPersons(persons.map(p => p.id !== updatedPerson.id ? p : response))})
            setNewName('')
            setNewNumber('')
            
        } else {
        const updatedPersons = {...persons}
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        console.log(persons)
        console.log('person type', typeof(persons))

        personService
          .create(newPerson)
          .then(response => console.log(response))
        }
      }

     
    
            
        

  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          <Filter filterHandler={handleFilterChange}/>
      </div>
      <br></br>
      <h3>Add a new</h3>
      <PersonForm formTrigger={addPerson} 
                  inputName={newName}
                  inputNumber={newNumber}
                  personChange={handleNameChange}
                  numberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons = {persons} 
        appliedFilter = {newFilter} 
        removeHandler = {removePerson} />
  
    </div>
  )
}

export default App