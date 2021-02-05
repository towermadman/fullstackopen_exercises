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

const Country = ({ country }) => (
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
	</div>
)

const Display = ({ countries }) => {
	if (!countries.length) {
		return <p>No matches</p>

	} else if (countries.length > 10) {
		return <p>Too many matches, specify another filter</p>

	} else if (countries.length > 1) {
		return <div>{countries.map(country => <p key={country.name}>{country.name}</p>)}</div>
	}

	return <Country country={countries[0]} />
}

const App = () => {
	const [countries, setCountries] = useState([])
	const [searchQuery, setSearchQuery] = useState('')

	const handleFilterChange = (event) => setSearchQuery(event.target.value)

	useEffect(() => {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				const countryResults = response.data.filter(country =>
					country.name.toUpperCase()
					.includes(searchQuery.toUpperCase())
				)
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