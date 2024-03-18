import { useState, useEffect } from 'react'

import { Typography } from '@mui/material'

import dutchCities from './api/nl.json'
import { SearchBar } from './components/SearchBar'
import { CitiesTable } from './components/CitiesTable'
import { useDebounce } from './hooks/useDebounce'
import { City } from './types/cities'

import './App.css'

const initialCities = dutchCities.map(({ city, admin_name, population }) => ({
  city,
  admin_name,
  population,
}))

const searchCities = (cities: City[], searchTerm: string) => {
  if (!searchTerm) {
    return cities
  }
  return cities.filter((c) =>
    c.city.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

const App = () => {
  const [term, setTerm] = useState<string>('')
  const [cities, setCities] = useState<City[]>(initialCities)
  const debouncedTerm = useDebounce(term)

  useEffect(() => {
    setCities(searchCities(initialCities, debouncedTerm))
  }, [debouncedTerm])

  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        color="black"
        sx={{ mb: 4 }}
      >
        Dutch cities
      </Typography>
      <SearchBar
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onClear={() => setTerm('')}
      />
      <CitiesTable cities={cities} />
    </>
  )
}

export default App
