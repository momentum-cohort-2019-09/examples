const addButton = document.querySelector('#add-button')
const removeButton = document.querySelector('#remove-items')

addButton.addEventListener('click', function (event) {
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
})

removeButton.addEventListener('click', function (event) {
  const itemsToRemove = document.querySelectorAll('.stricken')
  for (var item of itemsToRemove) {
    item.remove()
  }
})
