/* globals dogs, moment */

const capitalize = str => str[0].toUpperCase() + str.slice(1)

function dogToHtml (dog) {
  return `
  <div class="animal">
    <img src="img/${dog.img}" alt="${dog.name}, ${dog.description}">
    <div class="animal__name">${dog.name}</div>
    <div class="animal__date">At shelter since ${moment(dog.shelterDate).fromNow()}</div>
    <div class="animal__traits">
      <span class="animal__trait">${capitalize(dog.age)}</span>
      <span class="animal__trait">${capitalize(dog.gender)}</span>
      <span class="animal__trait">${capitalize(dog.size)}</span>
      ${dog.traits.map(trait => `<span class="animal__trait">${capitalize(trait)}</span>`).join('')}
    </div>
  </div>
  `
}

function renderDogs (dogs) {
  let html
  if (dogs.length === 0) {
    html = '<p>There are no dogs that meet that criteria.</p>'
  } else {
    html = dogs.map(dogToHtml).join('\n')
  }
  document.querySelector('#dogs').innerHTML = html
}

function dogHasAllTraits (dog, traits) {
  return traits.every(trait => dog.traits.includes(trait))

  // let hasAllTraits = true

  // for (let trait of traits) {
  //   if (!dog.traits.includes(trait)) {
  //     hasAllTraits = false
  //     break
  //   }
  // }

  // return hasAllTraits
}

function dogHasSomeTraits (dog, traits) {
  return traits.some(trait => dog.traits.includes(trait))
}

function filterDogs (dogs) {
  const form = document.querySelector('#search-form')
  const formData = new FormData(form)
  const ageChoice = formData.get('age_choice')
  const genderChoice = formData.get('gender_choice')
  const sizeChoices = formData.getAll('size_choice')
  const personalityChoices = formData.getAll('personality_choice')

  if (ageChoice !== 'all') {
    dogs = dogs.filter(dog => dog.age === ageChoice)
  }
  if (genderChoice !== 'all') {
    dogs = dogs.filter(dog => dog.gender === genderChoice)
  }
  if (sizeChoices.length > 0) {
    dogs = dogs.filter(dog => sizeChoices.includes(dog.size))
  }
  if (personalityChoices.length > 0) {
    dogs = dogs.filter(dog => dogHasAllTraits(dog, personalityChoices))
  }

  return dogs
}

renderDogs(filterDogs(dogs))

for (let input of document.querySelectorAll('#search-form input')) {
  input.addEventListener('change', function (event) {
    renderDogs(filterDogs(dogs))
  })
}
