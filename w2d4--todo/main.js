function query (selector) {
  return document.querySelector(selector)
}

function markValid (field) {
  const fieldContainer = field.parentNode
  clearErrorMsgs(fieldContainer)
  fieldContainer.classList.remove('input-invalid')
  fieldContainer.classList.add('input-valid')
}

function markInvalid (field, errorMsg) {
  const fieldContainer = field.parentNode
  clearErrorMsgs(fieldContainer)
  fieldContainer.classList.remove('input-valid')
  fieldContainer.classList.add('input-invalid')

  // errorMsg is a string or undefined, but is being evaluated in a boolean context
  if (errorMsg) {
    const errorPara = document.createElement('p')
    errorPara.classList.add('input-hint', 'text-danger', 'error-message')
    errorPara.innerText = errorMsg
    fieldContainer.appendChild(errorPara)
  }
}

function clearErrorMsgs (fieldContainer) {
  for (let msg of fieldContainer.querySelectorAll('.error-message')) {
    msg.remove()
  }
}

function createTodoHTML (text, dueDate) {
  return `
  <div class="row">
    <div class="col-9">${text}</div>
    <div class="col-3">${dueDate || ''}</div>
  </div>
`
}

function addTodo (text, dueDate) {
  let todoListItem = document.createElement('li')
  let todoHtml = createTodoHTML(text, dueDate)
  todoListItem.innerHTML = todoHtml
  query('#todo-list').appendChild(todoListItem)
}

function isDateTodayOrLater (date) {
  let now = new Date()
  now.setUTCHours(0, 0, 0, 0)
  return date >= now
}

function validateTodoText (text) {
  return text !== ''
}

function validateTodoDate (date) {
  // How does this work?
  // If my date is null, this will be false.
  // If my date is not null, check to see if it's today or later.
  // If so, return true.
  // Else return false.
  return (!date || isDateTodayOrLater(date))
}

function getDateFromText (dateText) {
  if (dateText === '') {
    return null
  } else {
    return new Date(dateText)
  }
}

function main () {
  query('#todo-form').addEventListener('submit', function (event) {
    event.preventDefault()

    let todoTextField = query('#todo-text')
    let todoText = todoTextField.value.trim()
    let textValid = validateTodoText(todoText)
    if (textValid) {
      markValid(todoTextField)
    } else {
      markInvalid(todoTextField, 'Todo is required.')
    }

    let dueField = query('#todo-due')
    let dueDateText = dueField.value
    let dueDate = getDateFromText(dueDateText)
    let dueDateValid = validateTodoDate(dueDate)
    if (dueDateValid) {
      markValid(dueField)
    } else {
      markInvalid(dueField, 'Due date must be today or later.')
    }

    if (textValid && dueDateValid) {
      addTodo(todoText, dueDateText)
    }
  })
}

main()
