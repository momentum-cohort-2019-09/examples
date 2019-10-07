/* global fetch, Papa */

const q = (sel) => document.querySelector(sel)

let cards = []

fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTKbrk8yaHd0RuBs8VliWovdnon-1LMV6qQnawCtU_Bu3j2toy3nsIeYlDYGVENb55ezCWD4uJGawOB/pub?gid=0&single=true&output=csv')
  .then(res => res.text())
  .then(csv => Papa.parse(csv, { header: true }))
  .then(csv => { cards = csv.data })

q('#search-form').addEventListener('submit', function (event) {
  event.preventDefault()
  const searchString = q('#search').value
  const results = cards.filter(card => card.Name.toLowerCase().includes(searchString))
  showResults(results)
  q('#search').value = ''
  q('#search').focus()
})

function showResults (results) {
  results.sort((a, b) => {
    return b['Final Rating'] - a['Final Rating']
  })
  const resultHTML = `<ul>${results.map(r => `<li>${r.Name} - ${r['Final Rating']}</li>`).join('')}</ul>`
  q('#results').innerHTML = resultHTML
}

q('#search').focus()
