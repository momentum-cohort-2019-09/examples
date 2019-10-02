/* globals fetch, FormData */

const uuidv4 = require('uuid/v4')

import h from 'hyperscript'

function populateListsAndItems () {
  fetch('http://localhost:3000/lists?_embed=items')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      document.getElementById('lists').innerHTML = ''
      for (let node of data.map(generateListNodes)) {
        document.getElementById('lists').appendChild(node)
      }
      
    })
}

function generateListNodes (list) {
  return h(
    'section.shadow-1.pv1.ph3.mb4',
    h('h2.mt3', list.name),
    h('ul.list.pl0',
      list.items.map(item => h('li.mb2', item.name)),
      h('li.mb2', h('a.add-item-link', { href: "#" }, "+ Add"))
    ),
    h('form.add-item-form.hidden.mb2', {
      'data-list-id': list.id
    }, h('input', { type: 'text', name: 'name' }),
    h('button', { type: 'submit' }, "Add item to list"))
  )
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
