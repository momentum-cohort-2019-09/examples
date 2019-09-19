function query (selector) {
  return document.querySelector(selector)
}

function queryAll (selector) {
  return document.querySelectorAll(selector)
}

query('#todo-form').addEventListener('submit', function (event) {
  event.preventDefault()
  let todoTextField = query('#todo-text')
  let todoText = todoTextField.value.trim()

  if (!todoText) {
    todoTextField.parentNode.classList.remove('input-valid')
    todoTextField.parentNode.classList.add('input-invalid')
  } else {
    todoTextField.parentNode.classList.remove('input-invalid')
    todoTextField.parentNode.classList.add('input-valid')

    let todoListItem = document.createElement('li')
    todoListItem.innerText = todoText
    query('#todo-list').appendChild(todoListItem)
  }
})
