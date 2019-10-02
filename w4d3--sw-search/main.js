/* globals FormData, fetch */

function main () {
  const searchForm = document.getElementById('search-form')
  searchForm.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(searchForm)
    const searchType = formData.get('search-type')
    const searchTerm = formData.get('search-term')
    if (searchType && searchTerm) {
      search(searchType, searchTerm)
    }
  })
}

function search (type, name) {
  getResults(`https://swapi.co/api/${type}/?search=${name}`, [])
}

function getResults (url, currentResults) {
  console.log({ url, currentResults })
  fetch(url)
    .then(res => res.json())
    .then(searchData => {
      currentResults = currentResults.concat(searchData.results)
      if (searchData.next) {
        getResults(searchData.next, currentResults)
      } else {
        populateResults(currentResults)
      }
    })
}

/* add results to the DOM */
function populateResults (results) {
  const resultsDiv = document.getElementById('results')
  const listItems = results.map(p => p.name).map(name => `<li>${name}</li>`)
  resultsDiv.innerHTML = `<ul>${listItems.join('\n')}</ul>`
}

main()
