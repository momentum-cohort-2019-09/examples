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

document.querySelector('#dogs').innerHTML = dogs.map(dogToHtml).join('\n')
