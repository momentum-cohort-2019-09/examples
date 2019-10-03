/* globals fetch, FormData, btoa, sessionStorage */

const uuidv4 = require('uuid/v4')

const app = {
  data: {
    credentials: {
      username: sessionStorage.getItem('username'),
      password: sessionStorage.getItem('password')
    }
  },

  setCredentials: function (username, password) {
    this.data.credentials = {
      username: username,
      password: password
    }
    sessionStorage.setItem('username', username)
    sessionStorage.setItem('password', password)
  },

  login: function (username, password) {
    fetch('http://localhost:3000/lists', {
      headers: {
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
      }
    })
      .then(response => {
        if (response.ok) {
          this.setCredentials(username, password)
          this.render()
        } else {
          document.getElementById('login-error').innerText = 'That is not a valid username and password.'
        }
      })
  },

  addItem: function (listId, name) {
    const uuid = uuidv4()
    fetch('http://localhost:3000/items/', {
      method: 'POST',
      body: JSON.stringify({ 'name': name, 'listId': listId, 'id': uuid }),
      headers: {
        'Authorization': basicAuthCreds(app.data.credentials.username, app.data.credentials.password),
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          this.render()
        }
      })
  },

  render: function () {
    if (!this.data.credentials.username || !this.data.credentials.password) {
      showLoginForm()
    } else {
      hideLoginForm()
      populateListsAndItems()
    }
  }
}

function basicAuthCreds (username, password) {
  return 'Basic ' + btoa(`${username}:${password}`)
}

function populateListsAndItems () {
  fetch('http://localhost:3000/lists?_embed=items', {
    headers: {
      'Authorization': basicAuthCreds(
        app.data.credentials.username,
        app.data.credentials.password)
    }
  })
    .then(response => {
      if (response.status === 401) {
        // handle unauthorized
      } else {
        return response.json()
      }
    })
    .then(data => {
      console.log(data)
      document.getElementById('lists').innerHTML = data.map(generateListHTML).join('\n')
    })
    .catch(error => {
      console.log(error)
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

function showLoginForm () {
  document.getElementById('login-form').classList.remove('hidden')
  document.getElementById('lists').classList.add('hidden')
}

function hideLoginForm () {
  document.getElementById('login-form').classList.add('hidden')
  document.getElementById('lists').classList.remove('hidden')
}

function main () {
  app.render()

  const loginForm = document.querySelector('#login-form')
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const formData = new FormData(loginForm)
    const username = formData.get('username')
    const password = formData.get('password')
    app.login(username, password)
  })

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

      app.addItem(listId, name)
    }
  })
}

main()
