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

fetch('https://api.weather.gov/points/35.994,-78.8986')
  .then(response => response.json())
  .then(data => {
    const forecastURL = data.properties.forecast
    return fetch(forecastURL)
  })
  .then(response => response.json())
  .then(function (data) {
    const currentWeather = data.properties.periods[0]
    weatherDiv.innerText = `The current weather is ${currentWeather.detailedForecast}`
  })

const swDiv = document.querySelector('#star-wars')

fetch('https://swapi.co/api/people/1/')
  .then(res => res.json())
  .then(data => {
    const h2 = document.createElement('h2')
    h2.innerText = data.name
    swDiv.appendChild(h2)
    return data.films
  })
  .then(filmURLs => {
    const fetches = filmURLs.map(url => fetch(url))
    console.log(fetches)
    return Promise.all(fetches)
  })
  .then(responses => {
    console.log(responses)
    return Promise.all(responses.map(res => res.json()))
  })
  .then(dataArray => {
    console.log(dataArray)
    const ul = document.createElement('ul')
    for (let film of dataArray) {
      const li = document.createElement('li')
      li.innerText = film.title
      ul.appendChild(li)
    }
    swDiv.appendChild(ul)
  })
