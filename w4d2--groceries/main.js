/* globals fetch, FormData */

const uuidv4 = require('uuid/v4')

function populateListsAndItems () {
  fetch('http://localhost:3000/lists?_embed=items')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      document.getElementById('lists').innerHTML = data.map(generateListHTML).join('\n')
    })
}

function generateListHTML (list) {
  return `
  <section class="shadow-1 pv1 ph3 mb4">
    <h2 class="mt3">${list.name}</h2>
    <ul class="list pl0">
      ${list.items.map(item => `<li class="mb2">${item.name}</li>`).join('\n')}      
      <li class="mb2"><a class="add-item-link" href="#">+ Add</a></li>      
    </ul>
    <form class="add-item-form hidden mb2" data-list-id="${list.id}">
      <input type="text" name="name" />
      <button type="submit">Add item to list</button>
    </form>
  </section>
  `
}

function main () {
  populateListsAndItems()
  document.querySelector('#lists').addEventListener('click', function (event) {
    if (event.target.matches('.add-item-link')) {
      event.preventDefault()
      const listItem = event.target.parentElement
      const form = listItem.parentElement.nextElementSibling
      listItem.classList.add('hidden')
      form.classList.remove('hidden')
    }
  })

  document.querySelector('#lists').addEventListener('submit', function (event) {
    if (event.target.matches('.add-item-form')) {
      event.preventDefault()
      const form = event.target
      const formData = new FormData(form)
      const name = formData.get('name')
      const listId = form.dataset.listId
      const uuid = uuidv4()
      fetch('http://localhost:3000/items/', {
        method: 'POST',
        body: JSON.stringify({ 'name': name, 'listId': listId, 'id': uuid }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            populateListsAndItems()
          }
        })
    }
  })
}

main()
