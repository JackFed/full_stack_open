const CountryInfo = ({ country, getWeather }) => {

    const weather = getWeather(country.capital)


    return (
        <div key={country.name.common}>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital[0]}</p>
          <p>Area: {country.area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(country.languages).map(language => 
              <li key={language}>{language}</li>
            )}
          </ul>
          <img src={country.flags["png"]} alt="Flag" />
          <div>
            <h1>Weather in {country.capital}</h1>
            <p>Temperature: degrees Fahrenheit</p>
            <img src="#" alt="" />
            <p>Wind m/s</p>
          </div>
        </div>
    )
}

export default CountryInfo;