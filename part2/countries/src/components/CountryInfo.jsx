const CountryInfo = ({ country, weather }) => {
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
          { weather ? (
            <div>
              <h1>Weather in {country.capital}</h1>
              <p>Temperature: {weather.temp}°F</p>
              <img src={weather.icon} alt="Weather Icon" />
              <p>Wind {weather.windSpeed} m/s</p>
            </div>
            ) : (
                <p>Loading weather...</p>
            )}
        </div>
    )
}

export default CountryInfo;