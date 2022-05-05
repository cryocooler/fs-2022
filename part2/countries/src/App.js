import axios from 'axios'
import { useState, useEffect } from 'react'


const WeatherInfo = ({capital, weather}) => {
  
  const cWeather = weather
  const cap = capital
  console.log(cap)
  console.log('weather', cWeather)
  
  if (cWeather != undefined ) {

  return (
    <div>
      <b>Weather in {cap}</b>
      <br></br>
      <p>Temperature: {cWeather.main.temp} C</p>
      <div>
        <img src = {`http://openweathermap.org/img/wn/${cWeather.weather[0].icon}@2x.png`} />
      </div>
      <p>wind {cWeather.wind.speed} m/s</p>
    </div>
  )
  }

}


const Country = ({detailCountry}) => {


  const [getWeather, setWeather] = useState()
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    console.log('effect')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${detailCountry.capital}&appid=${api_key}&units=metric`)
      .then(response => {
        
        setWeather(response.data)
      })
  }, )
  console.log('component triggered')
  console.log(detailCountry, 'passed country')
  console.log('languages', detailCountry.languages)

  console.log('FUCKING WEATHER',getWeather)

  return(
    <div>
      <h2>{detailCountry.name.common}</h2>
      capital {detailCountry.capital}
      <br></br>
      area {detailCountry.area}
      <br></br>
      <br></br>
      <div>
  
      <b>languages</b>
      </div>
      <ul>
        {Object.values(detailCountry.languages).map(l => 
          <li key = {l}>
            {l} </li>
          )}
          </ul>
          <div>
            <img src = {detailCountry.flags['png']} alt = {detailCountry.name.common} 
            width = "150"/>
          </div>
          <div>
            <WeatherInfo capital = {detailCountry.capital} weather = {getWeather} />
          </div>
        
    </div>
  )

}


const Countries = ({searchCountries, toSearch, selector}) => {
  //console.log(searchCountries)
  
  const filteredC = searchCountries.filter(c => c.name.common
    .toLowerCase()
    .includes(toSearch.toLowerCase()))

    console.log(filteredC.length, filteredC.length === 1)
    

    if (filteredC.length > 10) {
      return (
        <div>Too many matches, specify another filter </div>
      )
    } else if (filteredC.length < 10 & filteredC.length > 1) {

      return(
        <div>
          {filteredC.map(c => 
          <div key = {c.name.common} >
            {c.name.common} 
            <button onClick = {() => selector(c.name.common)}>
              show
            </button>
            </div>

          )}
        </div>
      )

    } else if (filteredC.length == 1) {
      console.log('WHY IS IT NOT HERE!? ')
      return(
        <div>
          <Country detailCountry = {filteredC[0]} />
          
        </div>
      )
    }
}

const App = () => {

    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')
    




    
       

    useEffect(() => {
      console.log('effect')
      axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          console.log('promise fulfilled')
          setCountries(response.data)
        })
    }, [])

    const handleInputChange = (event) => {
      event.preventDefault()
      setSearch(event.target.value)
      console.log(event.target.value)
      //console.log(countries)

    }

    return (
      <div>
        find countries <input onChange = {handleInputChange} />
        <Countries searchCountries = {countries} toSearch = {search} 
        selector = {setSearch}/>
      
        
        </div>
    )

    }

export default App