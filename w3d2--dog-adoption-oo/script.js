/* globals dogsInfo, moment */

class Person {
  constructor (name, height, heightUnit) {
    this.name = name

    if (heightUnit === 'cm') {
      this.heightInCm = height
    } else if (heightUnit === 'm') {
      this.heightInCm = height * 100
    } else if (heightUnit === 'in') {
      this.heightInCm = height * 2.2
    }
  }
}

const capitalize = str => str[0].toUpperCase() + str.slice(1)

class Dog {
  constructor (dogInfo) {
    this.name = dogInfo.name
    this.shelterDate = dogInfo.shelterDate
    this.description = dogInfo.description
    this.img = dogInfo.img
    this.size = dogInfo.size
    this.age = dogInfo.age
    this.gender = dogInfo.gender
    this.traits = dogInfo.traits
  }

  toHTML () {
    return `
    <div class="animal">
      <img src="img/${this.img}" alt="${this.name}, ${this.description}">
      <div class="animal__name">${this.name}</div>
      <div class="animal__date">At shelter since ${moment(this.shelterDate).fromNow()}</div>
      <div class="animal__traits">
        <span class="animal__trait">${capitalize(this.age)}</span>
        <span class="animal__trait">${capitalize(this.gender)}</span>
        <span class="animal__trait">${capitalize(this.size)}</span>
        ${this.traits.map(trait => `<span class="animal__trait">${capitalize(trait)}</span>`).join('')}
      </div>
    </div>
    `
  }

  // filters - should be an object
  //   any active filter should have a non-empty key
  //   allowed filters
  //     - age - singular (string)
  //     - gender - singular (string)
  //     - size - multiple (array)
  //     - traits - multiple (array)
  matchesFilters (filters) {
    if (filters.age && filters.age !== this.age) {
      return false
    }

    if (filters.gender && filters.gender !== this.gender) {
      return false
    }

    if (filters.size && filters.size.length > 0 &&
      !filters.size.includes(this.size)) {
      return false
    }

    if (filters.traits && filters.traits.length > 0 &&
      !filters.traits.every(trait => this.traits.includes(trait))) {
      return false
    }

    return true
  }
}

class DogList {
  constructor (outputDiv, dogs) {
    this.outputDiv = outputDiv
    if (dogs === undefined) {
      this.dogs = []
    } else {
      this.dogs = dogs
    }
  }

  render (filters) {
    if (filters === undefined) {
      filters = {}
    }

    this.outputDiv.innerHTML = this.dogs
      .filter(dog => dog.matchesFilters(filters))
      .map(dog => dog.toHTML())
      .join('\n')
  }
}

class FilterForm {
  constructor (formNode, choices) {
    this.form = formNode
    this.choices = choices
  }

  addChangeListener (listener) {
    for (let input of this.form.querySelectorAll('input')) {
      input.addEventListener('change', listener)
    }
  }

  // returns a simple object of filters to use to filter dog list
  // example - { size: ['small', 'medium'], age: 'adult' }
  getFilters () {
    let filters = {}
    let formData = new FormData(this.form)
    for (let choice of Object.keys(this.choices)) {
      if (this.choices[choice] === 'singular') {
        let value = formData.get(`${choice}_choice`)
        if (value !== 'all') {
          filters[choice] = value
        }
      } else {
        filters[choice] = formData.getAll(`${choice}_choice`)
      }
    }

    return filters
  }
}

function main () {
  let dogs = dogsInfo.map(info => new Dog(info))
  let dogsDiv = document.querySelector('#dogs')
  let dogsList = new DogList(dogsDiv, dogs)
  let dogFilterForm = new FilterForm(
    document.querySelector('#search-form'),
    { age: 'singular', gender: 'singular', size: 'multiple', traits: 'multiple' }
  )
  dogFilterForm.addChangeListener(function (event) {
    dogsList.render(dogFilterForm.getFilters())
  })

  dogsList.render()
}

main()
