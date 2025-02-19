import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryInfo from './components/CountryInfo'

function App() {
  const [countries, setCountries] = useState([])
  const [shownCountry, setShownCountry] = useState(null)
  const [selectedCountries, setSelectedCountries] = useState([])

  const weatherUrl =`https://api.openweathermap.org/data/2.5/weather?q=`

  // Intial API call on first load
  useEffect(() => {
    console.log('effect run')
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        console.log(response.data)
        setCountries(response.data)
      })
      .catch(error => {
        console.log("Error fetching data:", error);
      });
      
  }, [])

  const searchCountries = (event) => {
    console.log(event.target.value)
    const search = event.target.value.toLowerCase()
    const selected = countries.filter(country => {
      const countryName = country.name.common.toLowerCase()
      return countryName.includes(search)
    })
    console.log(selected)
    setSelectedCountries(selected)
  }

  const getWeather = (capital) => {
    axios
      .get(`${weatherUrl}${capital}&appid=${import.meta.env.VITE_API_KEY}`)
      .then(response => {
        console.log(response.data)
        return response.data
      })
      .then(weather => {
        console.log('Weather', weather)
        const tempF = ((weather.main.temp - 273.15) * 9 / 5 + 32 ).toFixed(2)
        const iconURL = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
        const weatherMetrics = {
          temp: tempF,
          icon: iconURL,
          windSpeed: weather.wind.speed
        }
        console.log(weatherMetrics)
        return weatherMetrics
      })
      .catch(error => {
        console.log("Error fetching data:", error);
      });
  }

  

  // Boolean to see if there are 1-10 countries in selection
  const displayList = (selectedCountries.length <= 10 && selectedCountries.length > 1);

  return (
    <>
      <p>
        find countries <input onChange={searchCountries}/>
      </p>
      {selectedCountries.length > 10 &&  <p>Too many matches, specify another filter</p>}
      <ul>
        {displayList && selectedCountries.map((country) => (
          <li key={country.name.common}>
            {country.name.common} <button onClick={() => setShownCountry(country)}>Show</button>
          </li>
        ))}
      </ul>
      {shownCountry && <CountryInfo country={shownCountry} /> }
      {selectedCountries.length === 1 && 
        <CountryInfo country={selectedCountries[0]} getWeather={getWeather} />        
      }
    </>
  )
}

export default App
