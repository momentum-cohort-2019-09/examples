function addToOutput (str) {
  let display = document.getElementById('display')
  display.innerText += str
}

function clearOutput () {
  document.getElementById('display').innerText = ''
}

function calculateCurrentOutput () {
  let display = document.getElementById('display')
  return eval(display.innerText)
}

function setupNumberButtons () {
  for (let element of document.querySelectorAll('.number')) {
    element.addEventListener('click', function (event) {
      addToOutput(event.target.innerText)
    })
  }
}

function setupOperatorButtons () {
  for (let element of document.querySelectorAll('.operator')) {
    element.addEventListener('click', function (event) {
      addToOutput(event.target.innerText)
    })
  }
}

function setupClearButton () {
  document.querySelector('#clear').addEventListener('click', function (event) {
    clearOutput()
  })
}

function setupDecimalButton () {
  document.getElementById('decimal').addEventListener('click', function (event) {
    addToOutput('.')
  })
}

function setupEqualsButton () {
  document.getElementById('operator-equals').addEventListener('click', function (event) {
    let result = calculateCurrentOutput()
    clearOutput()
    addToOutput(result)
  })
}

function setupKeyboardInput () {
  document.addEventListener('keyup', function (event) {
    console.log(event.key, event.code, event.keyCode)
    if (event.code.startsWith('Digit')) {
      addToOutput(event.code.substring(event.code.length - 1))
    }
    if (event.code === 'Period') {
      addToOutput('.')
    }
  })
}

document.addEventListener('DOMContentLoaded', function () {
  setupNumberButtons()
  setupOperatorButtons()
  setupClearButton()
  setupDecimalButton()
  setupEqualsButton()
  setupKeyboardInput()
})
