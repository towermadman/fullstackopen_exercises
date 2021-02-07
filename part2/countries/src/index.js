import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Search = ({ value, onChange }) => (
	<div>
		Find countries: <input
		value={value}
		onChange={onChange} />
	</div>
)

const Weather = ({ country }) => {
	const [weather, setWeather] = useState('')

	useEffect(() => {
		const api_key = process.env.REACT_APP_API_KEY

		axios
			.get(`http://api.weatherstack.com/current
				?access_key=${api_key}
				&query=${country.name}`
			)
			.then(response => {
				if (!response.data.current) {
					setWeather('')
					return
				}

				const weatherResults = response.data.current
				setWeather(weatherResults)
			})
	}, [country.name])

	return (
		<div>
			<h2>Weather in {country.capital}</h2>
			<h3>temperature: {weather.temperature}</h3>
			<img src={weather.weather_icons}></img>
			<h3>wind: {weather.wind_speed}</h3>
		</div>
	)
}

const Country = ({ country }) => {
	if (!country) return false

	return (
		<div>
			<h1>{country.name}</h1>
			<p>Capital: {country.capital}</p>
			<p>Population: {country.population}</p>

			<h2>Languages</h2>
			<ul>
				{country.languages.map(language =>
					<li key={language.name}>{language.name}</li>
				)}
			</ul>
			<img src={country.flag}></img>

			<Weather country={country} />
		</div>
	)
}

const List = ({ countries, onClick }) => {
	if (!countries.length) {
		return <p>No matches</p>

	} else if (countries.length > 10) {
		return <p>Too many matches, specify another filter</p>

	} else if (countries.length > 1) {
		return (
			<div>
				{countries.map(country => (
					<p key={country.name}>
						{country.name}
						<button type="button" onClick={() => onClick(country)}>show</button>
					</p>
				))}
			</div>
		)
	}

	return false
}

const Display = ({ countries }) => {
	const [country, setCountry] = useState('')

	const clickHandler = (country) => setCountry(country)

	if (countries.length === 1 && country != countries[0]) setCountry(countries[0])

	return (
		<>
			<List countries={countries} onClick={clickHandler} />
			<Country country={country} />
		</>
	)
}

const App = () => {
	const [countries, setCountries] = useState([])
	const [searchQuery, setSearchQuery] = useState('')

	const handleFilterChange = (event) => setSearchQuery(event.target.value)

	useEffect(() => {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				const countryResults = response.data
				setCountries(countryResults)
			})
	}, [])

	const results = countries.filter(country =>
		country.name.toUpperCase().includes(searchQuery.toUpperCase())
	)

	return (
		<div>
			<Search value={searchQuery} onChange={handleFilterChange} />

			<Display countries={results} />
		</div>
	)

}

ReactDOM.render(<App />, document.getElementById('root'));