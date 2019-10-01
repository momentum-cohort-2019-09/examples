/* globals fetch */

import moment from 'moment'
const datetimeDiv = document.querySelector('#datetime')
const weatherDiv = document.querySelector('#weather')

function updateDT () {
  datetimeDiv.innerText = `The current datetime is ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}`
}

function updateLoop () {
  updateDT()
  setTimeout(updateLoop, 1000)
}

updateLoop()

fetch('https://api.weather.gov/gridpoints/RAH/62,66/forecast', {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
})
  .then(response => {
    console.log(response)
    return response.json()
  })
  .then(function (data) {
    const currentWeather = data.properties.periods[0]

    weatherDiv.innerText = `The current weather is ${currentWeather.detailedForecast}`
  })
  .catch(function (error) {
    weatherDiv.innerText = `We cannot retrieve the weather at this time. Message: ${error.message}`
  })

fetch('https://swapi.co/api/people/14/')
  .then(res => res.json())
  .then(data => {
    console.log(data.name)
    return fetch(data.homeworld)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data.name)
  })
