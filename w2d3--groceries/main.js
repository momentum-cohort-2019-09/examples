const addButton = document.querySelector('#add-button')
const addItemForm = document.querySelector('#add-item-form')
const removeButton = document.querySelector('#remove-items')

function addNewItem (event) {
  event.preventDefault()

  const field = document.querySelector('#add-item')
  const itemText = field.value

  if (itemText !== '') {
    const newListItem = document.createElement('li')
    newListItem.innerText = itemText
    newListItem.classList.add('f5', 'mv2')
    newListItem.addEventListener('click', function (event) {
      newListItem.classList.toggle('stricken')
    })

    document.querySelector('#grocery-list').appendChild(newListItem)
    field.value = ''
    field.focus()
  }
}

addItemForm.addEventListener('submit', addNewItem)

removeButton.addEventListener('click', function (event) {
  const itemsToRemove = document.querySelectorAll('.stricken')
  for (var item of itemsToRemove) {
    item.remove()
  }
})
